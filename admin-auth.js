const ADMIN_SUPABASE_URL = 'https://cizbrbgqiwddmkhrjqzm.supabase.co';
const ADMIN_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_MbUybFmdnHcJXfC5iQULOA_FtfTg-Fr';

const adminSupabaseClient = window.supabase.createClient(
  ADMIN_SUPABASE_URL,
  ADMIN_SUPABASE_PUBLISHABLE_KEY
);

async function protectAdminPage() {
  const { data, error } = await adminSupabaseClient.auth.getSession();

  if (error || !data.session) {
    window.location.replace('/login');
    return;
  }

  document.documentElement.style.visibility = 'visible';
}

protectAdminPage();