(function () {
  const cfg = window.SupabaseConfig || {};
  let client = null;

  function ensureClient() {
    if (client) return client;
    if (!cfg.isConfigured || !cfg.isConfigured()) return null;
    if (!window.supabase || !window.supabase.createClient) return null;
    client = window.supabase.createClient(cfg.url, cfg.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    return client;
  }

  async function getSession() {
    const c = ensureClient();
    if (!c) return null;
    const out = await c.auth.getSession();
    return out && out.data ? out.data.session : null;
  }

  async function signInWithGoogle() {
    const c = ensureClient();
    if (!c) throw new Error("Supabase is not configured.");
    const res = await c.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: cfg.redirectTo || window.location.href },
    });
    if (res.error) throw res.error;
  }

  async function signOut() {
    const c = ensureClient();
    if (!c) return;
    await c.auth.signOut();
  }

  function onAuthStateChange(cb) {
    const c = ensureClient();
    if (!c) return { data: { subscription: { unsubscribe: function () {} } } };
    return c.auth.onAuthStateChange(cb);
  }

  window.AuthService = {
    isConfigured: function () { return !!(cfg.isConfigured && cfg.isConfigured()); },
    getClient: ensureClient,
    getSession: getSession,
    signInWithGoogle: signInWithGoogle,
    signOut: signOut,
    onAuthStateChange: onAuthStateChange,
  };
})();
