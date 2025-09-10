import { supabase } from '../supabaseClient';

async function createAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'ahmed8636973@gmail.com',
    password: 'Mmna01275074528'
  });

  if (error) {
    console.log('Error creating admin:', error.message);
  } else {
    console.log('Admin created successfully:', data);
  }
}

createAdmin();