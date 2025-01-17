import { useEffect, useState } from 'react';
import { useSession } from '../Routes/useSession';
import { TransactionTableData } from '../transactions/components/type';
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

export const signUpWithEmailAndPassword = (email: string, password: string) => {
  return supabase.auth.signUp({
    email,
    password,
  });
};

export const signInWithEmailAndPassword = (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signOut = () => {
  return supabase.auth.signOut();
};

const fetchUserProfile = async (
  userId: string,
): Promise<TransactionTableData[] | null> => {
  const { data, error } = await supabase
    .from('transaction')
    .select('id,category,date,type,amount,notes')
    .eq('user_id', userId);

  console.log(data);

  if (error) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }

  return data as TransactionTableData[];
};

export const useFetchUserData = () => {
  const { session } = useSession();
  const [userData, setUserData] = useState<TransactionTableData[] | null>(null);

  useEffect(() => {
    const fetchUserDataFromSession = async () => {
      if (session?.user?.id) {
        const data = await fetchUserProfile(session.user.id);
        setUserData(data);
      }
    };

    if (session?.user?.id) {
      fetchUserDataFromSession();
    }
  }, [session]);

  return userData;
};
