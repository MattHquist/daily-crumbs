const ADMIN_SUPABASE_URL = 'https://cizbrbgqiwddmkhrjqzm.supabase.co';
const ADMIN_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_MbUybFmdnHcJXfC5iQULOA_FtfTg-Fr';

const adminSupabaseClient = window.supabase.createClient(
  ADMIN_SUPABASE_URL,
  ADMIN_SUPABASE_PUBLISHABLE_KEY
);
window.adminUserContext = {
  user: null,
  profile: null,
  editions: [],
  isOwner: false
};
async function protectAdminPage() {
  const { data, error } =
    await adminSupabaseClient.auth.getSession();

  if (error || !data.session) {
    window.location.replace('/login');
    return;
  }

  const user = data.session.user;

  const { data: profile, error: profileError } =
    await adminSupabaseClient
      .from('profiles')
      .select('id, full_name, role, active')
      .eq('id', user.id)
      .single();

  if (profileError || !profile || profile.active === false) {
    await adminSupabaseClient.auth.signOut();
    window.location.replace('/login');
    return;
  }

  const { data: userEditions, error: editionsError } =
    await adminSupabaseClient
      .from('user_editions')
      .select(`
        edition_id,
        editions (
          id,
          name,
          slug,
          active
        )
      `)
      .eq('user_id', user.id);

  if (editionsError) {
    console.error('Could not load user Editions:', editionsError);
  }

  window.adminUserContext = {
    user,
    profile,
    editions: userEditions || [],
    isOwner: profile.role === 'owner'
  };

  document.documentElement.style.visibility = 'visible';

  document.dispatchEvent(
    new CustomEvent('adminContextReady', {
      detail: window.adminUserContext
    })
  );
}
document
  .getElementById('logoutButton')
  ?.addEventListener('click', async () => {
    await adminSupabaseClient.auth.signOut();
    window.location.replace('/login');
  });
protectAdminPage();