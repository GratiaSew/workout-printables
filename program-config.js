window.WorkoutConfig = {
  CATALOG_LINES: [
    "Barbell Back Squat|Lower|4|8","Back Squat (Barbell)|Lower|4|8","Goblet Squat|Lower|3|12","Front Squat|Lower|4|6","Leg Press|Lower|4|10","Hack Squat|Lower|4|10","Romanian Deadlift|Lower|3|10","Sumo Deadlift|Lower|3|6","Conventional Deadlift|Lower|3|5","Barbell Hip Thrust|Lower|4|10","Glute Bridge|Lower|3|15","Bulgarian Split Squat|Lower|3|10","Romanian Split Squat|Lower|3|10","Single-Leg RDL|Lower|3|10","Walking Lunge|Lower|3|12","Step-Up|Lower|3|10","Leg Extension|Lower|3|15","Leg Curl|Lower|3|12","Seated Calf Raise|Lower|4|15","Standing Calf Raise|Lower|3|12","Band Lateral Walk / Monster Walk|Lower|3|14","Hip Abduction Machine|Lower|3|15","Hip Adduction Machine|Lower|3|15","Cable Pull-Through|Lower|3|12",
    "Flat Barbell Bench|Upper|4|8","Barbell Bench Press|Upper|4|8","Incline Dumbbell Bench|Upper|3|10","Incline DB Press|Upper|3|10","Decline Bench Press|Upper|3|10","Dumbbell Fly|Upper|3|12","Cable Crossover|Upper|3|12","Overhead Press|Upper|3|8","Arnold Press|Upper|3|10","Lateral Raise|Upper|3|12","Rear Delt Fly|Upper|3|15","Face Pull|Upper|3|20","Face Pull / External Rotation Hybrid (Band)|Upper|3|15","Barbell Row|Upper|4|8","Pendlay Row|Upper|4|6","One-Arm Dumbbell Row|Upper|4|8","One-Arm DB Row|Upper|4|8","Lat Pulldown|Upper|3|10","Banded Lat Pulldown (Kneeling)|Upper|4|12","Assisted Pull-Up|Upper|3|8","Chin-Up|Upper|3|8","Straight-Arm Pulldown|Upper|3|12","Barbell Curl|Upper|3|10","Hammer Curl|Upper|3|10","Triceps Pushdown|Upper|3|12","Skullcrusher|Upper|3|10","Overhead Triceps Extension|Upper|3|10","Push-Up|Upper|4|10","Band Pull-Apart|Upper|3|15","Band Row (Anchored)|Upper|3|12",
    "Plank|Core|3|45","Side Plank|Core|3|30","Dead Bug|Core|3|8","Hanging Knee Raise|Core|3|12","Cable Crunch|Core|3|15","Pallof Press|Core|3|12","Farmer Carry|Full Body|4|30","Sled Push|Cardio|4|20","Bike Sprint|Cardio|6|20","Treadmill Incline Walk|Cardio|1|30"
  ],
  COACH_SPLIT_DAYS: [
    { label: "Day 1 - Lower A (squat + hinge bias)", type: "workout", names: ["Back Squat (Barbell)", "Romanian Deadlift", "Bulgarian Split Squat", "Standing Calf Raise", "Band Lateral Walk / Monster Walk"] },
    { label: "Day 2 - Upper A (horizontal push + pull bias)", type: "workout", names: ["Barbell Bench Press", "One-Arm DB Row", "Overhead Press", "Band Pull-Apart", "Hammer Curl", "Overhead Triceps Extension"] },
    { label: "Day 3 - Rest", type: "rest", names: [] },
    { label: "Day 4 - Lower B (hinge + single-leg bias)", type: "workout", names: ["Barbell Hip Thrust", "Front Squat", "Romanian Split Squat", "Single-Leg RDL", "Plank"] },
    { label: "Day 5 - Upper B (vertical pull + shoulder/arm bias)", type: "workout", names: ["Pendlay Row", "Incline DB Press", "Banded Lat Pulldown (Kneeling)", "Lateral Raise", "Face Pull / External Rotation Hybrid (Band)"] },
    { label: "Day 6 - Full Body C (metabolic strength)", type: "workout", names: ["Goblet Squat", "Push-Up", "Band Row (Anchored)", "Farmer Carry", "Dead Bug"] },
    { label: "Day 7 - Rest", type: "rest", names: [] }
  ],
  TECHNIQUE_GUIDES: {
    squat: {
      setup: ["Brace your midsection before each rep and keep feet rooted.", "Keep knees tracking over the middle toes while descending."],
      execution: ["Descend under control to your active range, then drive up through mid-foot.", "Keep torso tension and avoid collapsing the chest."],
      errors: ["Knee collapse inward", "Losing brace in the bottom position", "Heels lifting or bar drifting forward"],
      sources: [{ label: "NSCA High Bar Back Squat", url: "https://www.nsca.com/education/videos/exercise-technique-high-bar-back-squat/" }, { label: "ExRx Front Squat", url: "https://exrx.net/WeightExercises/Quadriceps/BBFrontSquat" }]
    },
    hinge: {
      setup: ["Start with ribs stacked over pelvis and a soft knee bend.", "Initiate by pushing hips back, not by bending through the spine."],
      execution: ["Keep load close to the body and maintain neutral spine.", "Drive hips through at the top without overextending low back."],
      errors: ["Rounding lower back", "Turning it into a squat", "Letting load drift away from shins"],
      sources: [{ label: "ExRx Romanian Deadlift", url: "https://exrx.net/WeightExercises/OlympicLifts/RomanianDeadlift" }, { label: "NASM Dumbbell RDL", url: "https://www.nasm.org/resource-center/exercise-library/dumbbell-romanian-deadlift" }]
    },
    splitSquat: {
      setup: ["Set a long enough stride so front foot is stable and flat.", "Keep torso upright with front knee and toes aligned."],
      execution: ["Lower with control until rear knee nears floor, then push through front foot.", "Stay balanced and avoid torso twisting."],
      errors: ["Front heel lifting", "Knee collapsing in", "Bouncing out of the bottom"],
      sources: [{ label: "ExRx Single Leg Split Squat", url: "https://exrx.net/WeightExercises/Quadriceps/BWSingleLegSplitSquat" }]
    },
    benchPress: {
      setup: ["Set shoulder blades down and back before unracking.", "Keep feet planted and wrists stacked over forearms."],
      execution: ["Lower bar under control to chest line, then press up and slightly back.", "Maintain full-body tension and consistent bar path."],
      errors: ["Elbows flaring too early", "Losing shoulder position", "Bouncing bar off chest"],
      sources: [{ label: "ACE Chest Press", url: "https://www.acefitness.org/resources/everyone/exercise-library/5/chest-press" }, { label: "ACE Close-Grip Bench", url: "https://www.acefitness.org/resources/everyone/exercise-library/311/close-grip-bench-press/" }]
    },
    row: {
      setup: ["Hinge and brace so spine stays long and neutral.", "Pull shoulder blade back before finishing with elbow."],
      execution: ["Row toward lower ribs/waist while avoiding torso rotation.", "Lower with control to full stretch each rep."],
      errors: ["Jerking with momentum", "Shrugging shoulders up", "Twisting torso on one-arm rows"],
      sources: [{ label: "ACE Single Arm Row", url: "https://www.acefitness.org/resources/everyone/exercise-library/126/single-arm-row/" }, { label: "ACE Bent-Over Row", url: "https://www.acefitness.org/resources/everyone/exercise-library/12/bent-over-row/" }]
    },
    overheadPress: {
      setup: ["Grip slightly wider than shoulders and brace glutes/core.", "Keep forearms vertical and bar close to face path."],
      execution: ["Press overhead while moving head slightly back then through.", "Lock out with stacked ribcage, not low-back arch."],
      errors: ["Overarching lumbar spine", "Pressing bar forward away from body", "Shrugging without shoulder control"],
      sources: [{ label: "ExRx Barbell Military Press", url: "https://exrx.net/WeightExercises/DeltoidAnterior/BBMilitaryPress" }]
    },
    upperIsolation: {
      setup: ["Use lighter load and prioritize clean control over load jumps.", "Set shoulder blades before each rep."],
      execution: ["Move through full range with 1-2 second eccentric control.", "Keep tension in target muscle, avoid swinging."],
      errors: ["Momentum cheating", "Incomplete range", "Shoulders rolling forward"],
      sources: [{ label: "ACE Lateral Raise", url: "https://www.acefitness.org/resources/everyone/exercise-library/26/lateral-raise/" }, { label: "ACE Triceps Extension", url: "https://www.acefitness.org/resources/everyone/exercise-library/74/triceps-extension/" }, { label: "NASM Face Pull", url: "https://www.nasm.org/resource-center/exercise-library/face-pull" }]
    },
    core: {
      setup: ["Set ribcage down and keep pelvis neutral.", "Breathe behind the brace instead of holding breath too long."],
      execution: ["Maintain spinal position while limbs move slowly.", "Stop each set when lumbar position starts to break."],
      errors: ["Low back arching", "Rushing reps", "Neck tension replacing core tension"],
      sources: [{ label: "ExRx Front Plank", url: "https://exrx.net/WeightExercises/RectusAbdominis/BWFrontPlank" }, { label: "NSCA Dead Bug", url: "https://journals.lww.com/nsca-scj/abstract/2019/10000/exercise_technique__the_dead_bug.15.aspx" }]
    },
    carry: {
      setup: ["Pick weights with a neutral spine and tall chest.", "Pack shoulders down and keep grip tight before walking."],
      execution: ["Walk with short controlled steps and minimal sway.", "Maintain upright posture and steady breathing."],
      errors: ["Shrugging shoulders", "Leaning side to side", "Letting weights drift in front"],
      sources: [{ label: "NSCA Farmer's Walk", url: "https://www.nsca.com/education/articles/ptq/incorporating-the-farmers-walk-exercise-into-your-clients-program/" }]
    },
    pushupBand: {
      setup: ["Create a straight line from head to heel (or incline setup).", "Hands under shoulders with active upper back."],
      execution: ["Lower under control, then press while keeping ribs down.", "Use incline/bench if quality reps break down."],
      errors: ["Sagging hips", "Elbows flaring hard", "Short range reps"],
      sources: [{ label: "ACE Push-Up", url: "https://www.acefitness.org/education-and-resources/professional/expert-articles/7265/perfecting-the-push-up-for-all-levels" }, { label: "ACE Band Equipment Library", url: "https://www.acefitness.org/resources/everyone/exercise-library/equipment/resistance-bands-cables/" }]
    }
  }
};
