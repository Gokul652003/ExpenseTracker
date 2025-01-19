import { useEffect, useMemo, useState } from 'react';
import { useSession } from '../Routes/useSession';
import {
  TransactionTableData,
  UserCategoryProp,
} from '../transactions/components/type';
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
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }

  return data as TransactionTableData[];
};

const fetchUserCategory = async (
  userId: string,
): Promise<UserCategoryProp[] | null> => {
  const { data, error } = await supabase
    .from('usercategory')
    .select('id,category,colour')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user category:', error.message);
    return null;
  }

  return data as UserCategoryProp[];
};

export const useFetchUserData = () => {
  const { session } = useSession();
  const [userData, setUserData] = useState<TransactionTableData[] | null>(null);
  const [userCategory, setUserCategory] = useState<UserCategoryProp[] | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserDataFromSession = async () => {
      if (session?.user?.id) {
        setLoading(true); // Start loading
        const data = await fetchUserProfile(session.user.id);
        const userCategoryData = await fetchUserCategory(session.user.id);
        setUserCategory(userCategoryData);
        setUserData(data);
        setLoading(false); // End loading
      } else {
        setLoading(false); // End loading if no session
      }
    };

    if (session?.user?.id) {
      fetchUserDataFromSession();
    }
  }, [session]);

  const totalIncome = useMemo(() => {
    if (!userData) return 0;
    return userData
      .filter((transaction) => transaction.type === 'Income') //
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
  }, [userData]);

  const totalExpense = useMemo(() => {
    if (!userData) return 0;
    return userData
      .filter((transaction) => transaction.type === 'Expense') //
      .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
  }, [userData]);

  const totalBalance = totalIncome - totalExpense;
  return {
    userData,
    totalIncome,
    totalExpense,
    totalBalance,
    userCategory,
    loading,
  };
};
