const SUPABASE_URL = 'https://cizbrbgqiwddmkhrjqzm.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_MbUybFmdnHcJXfC5iQULOA_FtfTg-Fr';

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  loginMessage.textContent = 'Signing in...';

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    loginMessage.textContent = error.message;
    return;
  }

  if (!data.session) {
    loginMessage.textContent = 'Login failed.';
    return;
  }

  window.location.href = '/admin';
});