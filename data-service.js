(function () {
  function getClient() {
    if (!window.AuthService || !window.AuthService.getClient) return null;
    return window.AuthService.getClient();
  }

  function asArray(v) {
    return Array.isArray(v) ? v : [];
  }

  async function loadUserData(userId) {
    const c = getClient();
    if (!c) throw new Error("Supabase client unavailable.");

    const [exRes, logRes, wdRes, schRes] = await Promise.all([
      c.from("exercises").select("*").eq("user_id", userId).order("created_at", { ascending: true }),
      c.from("exercise_logs").select("*").eq("user_id", userId).order("date", { ascending: true }),
      c.from("workout_days").select("date, done").eq("user_id", userId),
      c.from("schedules").select("*").eq("user_id", userId).limit(1),
    ]);
    if (exRes.error) throw exRes.error;
    if (logRes.error) throw logRes.error;
    if (wdRes.error) throw wdRes.error;
    if (schRes.error) throw schRes.error;

    const exercises = asArray(exRes.data).map((e) => ({
      id: e.id,
      name: e.name,
      category: e.category,
      targetSets: Number(e.target_sets) || 4,
      targetReps: e.target_reps,
      createdAt: e.created_at,
    }));

    const logsByExercise = {};
    asArray(logRes.data).forEach((log) => {
      if (!logsByExercise[log.exercise_id]) logsByExercise[log.exercise_id] = [];
      logsByExercise[log.exercise_id].push({
        id: log.id,
        date: log.date,
        weight: Number(log.weight) || 0,
        reps: Number(log.reps) || 0,
        sets: Number(log.sets) || 0,
        notes: log.notes || "",
        createdAt: log.created_at,
      });
    });

    const workoutDays = {};
    asArray(wdRes.data).forEach((d) => {
      workoutDays[d.date] = !!d.done;
    });

    let schedule = null;
    const scheduleRow = asArray(schRes.data)[0];
    if (scheduleRow) {
      const dayRes = await c.from("schedule_days").select("*").eq("schedule_id", scheduleRow.id).order("day_index", { ascending: true });
      if (dayRes.error) throw dayRes.error;
      schedule = {
        anchorDate: scheduleRow.anchor_date,
        days: asArray(dayRes.data).map((d) => ({
          id: d.id,
          label: d.label,
          type: d.type,
          exerciseNames: asArray(d.exercise_names),
          exerciseIds: [],
        })),
      };
    }

    const empty = exercises.length === 0 && asArray(logRes.data).length === 0 && Object.keys(workoutDays).length === 0 && !schedule;
    return {
      empty: empty,
      data: {
        exercises: exercises,
        logsByExercise: logsByExercise,
        workoutDays: workoutDays,
        schedule: schedule,
        catalogSeeded: true,
      },
    };
  }

  async function saveUserData(userId, stateData) {
    const c = getClient();
    if (!c) throw new Error("Supabase client unavailable.");
    const data = stateData || {};
    const exercises = asArray(data.exercises);

    await c.from("profiles").upsert({ id: userId, updated_at: new Date().toISOString() });

    const scheduleObj = data.schedule && Array.isArray(data.schedule.days) ? data.schedule : null;
    let scheduleId = null;
    if (scheduleObj) {
      const up = await c.from("schedules")
        .upsert({ user_id: userId, anchor_date: scheduleObj.anchorDate, updated_at: new Date().toISOString() }, { onConflict: "user_id" })
        .select("id")
        .single();
      if (up.error) throw up.error;
      scheduleId = up.data.id;

      const delDays = await c.from("schedule_days").delete().eq("schedule_id", scheduleId);
      if (delDays.error) throw delDays.error;

      const scheduleRows = scheduleObj.days.map((d, idx) => ({
        id: d.id,
        schedule_id: scheduleId,
        day_index: idx,
        label: d.label,
        type: d.type,
        exercise_names: asArray(d.exerciseNames),
        updated_at: new Date().toISOString(),
      }));
      if (scheduleRows.length) {
        const insDays = await c.from("schedule_days").insert(scheduleRows);
        if (insDays.error) throw insDays.error;
      }
    } else {
      const oldSch = await c.from("schedules").select("id").eq("user_id", userId).limit(1);
      if (!oldSch.error && asArray(oldSch.data)[0]) {
        await c.from("schedule_days").delete().eq("schedule_id", oldSch.data[0].id);
        await c.from("schedules").delete().eq("id", oldSch.data[0].id);
      }
    }

    const delLogs = await c.from("exercise_logs").delete().eq("user_id", userId);
    if (delLogs.error) throw delLogs.error;
    const delEx = await c.from("exercises").delete().eq("user_id", userId);
    if (delEx.error) throw delEx.error;

    const exRows = exercises.map((e) => ({
      id: e.id,
      user_id: userId,
      name: e.name,
      category: e.category,
      target_sets: Number(e.targetSets) || 4,
      target_reps: String(e.targetReps),
      created_at: e.createdAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    if (exRows.length) {
      const insEx = await c.from("exercises").insert(exRows);
      if (insEx.error) throw insEx.error;
    }

    const logsByExercise = data.logsByExercise || {};
    const logRows = [];
    Object.keys(logsByExercise).forEach((exerciseId) => {
      asArray(logsByExercise[exerciseId]).forEach((l) => {
        logRows.push({
          id: l.id,
          user_id: userId,
          exercise_id: exerciseId,
          date: l.date,
          weight: Number(l.weight) || 0,
          reps: Number(l.reps) || 0,
          sets: Number(l.sets) || 0,
          notes: l.notes || "",
          created_at: l.createdAt || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      });
    });
    if (logRows.length) {
      const insLogs = await c.from("exercise_logs").insert(logRows);
      if (insLogs.error) throw insLogs.error;
    }

    const delDays = await c.from("workout_days").delete().eq("user_id", userId);
    if (delDays.error) throw delDays.error;
    const wdRows = Object.keys(data.workoutDays || {}).filter((k) => data.workoutDays[k]).map((date) => ({
      user_id: userId,
      date: date,
      done: true,
      updated_at: new Date().toISOString(),
    }));
    if (wdRows.length) {
      const insW = await c.from("workout_days").insert(wdRows);
      if (insW.error) throw insW.error;
    }
  }

  window.DataService = {
    loadUserData: loadUserData,
    saveUserData: saveUserData,
  };
})();
