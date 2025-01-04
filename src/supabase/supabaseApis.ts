import { supabase } from './supabaseClient';

export const signInWithGoogle = () => {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: '/dashboard',
    },
  });
};

export const signInWithNotion = () => {
  return supabase.auth.signInWithOAuth({
    provider: 'notion',
  });
};
