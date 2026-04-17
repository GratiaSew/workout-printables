window.SupabaseConfig = Object.assign(
  {
    url: "https://cuvvzjzzysadfykhzqei.supabase.co",
    anonKey: "sb_publishable_ntRMeYnmod6BkO2ORsVANA_vRhwjc5F",
    redirectTo: window.location.origin + window.location.pathname,
  },
  window.SupabaseConfig || {}
);

window.SupabaseConfig.isConfigured = function isConfigured() {
  return !!(window.SupabaseConfig.url && window.SupabaseConfig.anonKey);
};
