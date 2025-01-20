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
    .select('id,date,type,amount,notes,category')
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

  const getTopCategories = (
    userData: TransactionTableData[] | null,
    userCategory: UserCategoryProp[] | null,
  ) => {
    // Handle case where userData might be null or undefined
    if (!userData || userData.length === 0) {
      console.error('No transactions found for this user');
      return [];
    }

    // Handle case where userCategory might be null or undefined
    if (!userCategory || userCategory.length === 0) {
      console.error('No user categories found for this user');
      return [];
    }

    // const categorySpend: Record<string, number> = userData.reduce(
    //   (acc, transaction) => {
    //     const { category, amount } = transaction;
    //     const amountNumber = parseFloat(amount);

    //     // Accumulate spend by category
    //     if (!acc[category]) acc[category] = 0;
    //     acc[category] += amountNumber;
    //     return acc;
    //   },
    //   {} as Record<string, number>, // Initialize as empty record
    // );

    // // Handle the case where categorySpend is empty
    // if (Object.keys(categorySpend).length === 0) {
    //   console.error('No categories found for this user');
    //   return [];
    // }

    // // Get category names and sort by total spend, adding color
    // const sortedCategories = Object.entries(categorySpend)
    //   .map(([category_name, total_spent]) => {
    //     // Find the color for this category from userCategory data
    //     const categoryData = userCategory.find(
    //       (cat) => cat.category === category_name,
    //     );
    //     return {
    //       category_name,
    //       total_spent,
    //       color: categoryData ? categoryData.colour : '#000000', // Default to black if color is not found
    //     };
    //   })
    //   .sort((a, b) => b.total_spent - a.total_spent) // Sort by descending spend
    //   .slice(0, 3); // Get top 3 categories

    // return sortedCategories;
  };

  // Usage inside your component
  const sortedCategories = useMemo(
    () => getTopCategories(userData, userCategory),
    [userData, userCategory],
  );
  console.log(sortedCategories);
  return {
    userData,
    totalIncome,
    totalExpense,
    totalBalance,
    userCategory,
    sortedCategories,
    loading,
  };
};
