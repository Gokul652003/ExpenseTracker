import { useMemo } from 'react';
import { useSession } from '../Routes/useSession';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from './supabaseClient';
import {
  TransactionTableData,
  UserCategoryProp,
} from '../transactions/components/type';
import { toast } from 'sonner';

interface TransactionProp {
  id: string;
  value: string;
  columnId: string;
}
interface UpdateCategoryProp {
  id: string;
  updatedCategory: Partial<UserCategoryProp>;
  userId?: string;
  oldCategory: string;
}

// OAuth sign-ins
export const signInWithGoogle = () => {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: '/dashboard' },
  });
};

export const signInWithNotion = () => {
  return supabase.auth.signInWithOAuth({ provider: 'notion' });
};

export const signUpWithEmailAndPassword = (email: string, password: string) => {
  return supabase.auth.signUp({ email, password });
};

export const signInWithEmailAndPassword = (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signOut = () => {
  return supabase.auth.signOut();
};

// Fetch user transactions
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

// Fetch user categories
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

// Add transaction
const addTransaction = async (
  transaction: Omit<TransactionTableData, 'id' | 'user_id'>,
  userId: string,
) => {
  const { data, error } = await supabase
    .from('transaction')
    .insert([{ ...transaction, user_id: userId }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Add category
const addCategory = async (
  category: Omit<UserCategoryProp, 'id' | 'user_id'>,
  userId: string,
) => {
  const { data, error } = await supabase
    .from('usercategory')
    .insert([{ ...category, user_id: userId }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Delete a transaction
const deleteTransaction = async (transactionId: string[], userId: string) => {
  const { data, error } = await supabase
    .from('transaction')
    .delete()
    .in('id', transactionId)
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Delete a category
const deleteCategory = async (categoryId: string, userId: string) => {
  const { data, error } = await supabase
    .from('usercategory')
    .delete()
    .eq('id', categoryId)
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updateCategory = async ({
  id,
  updatedCategory,
  userId,
}: UpdateCategoryProp) => {
  const { data, error } = await supabase
    .from('usercategory')
    .update(updatedCategory)
    .eq('user_id', userId)
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const updateTransaction = async ({ columnId, id, value }: TransactionProp) => {
  const { data, error } = await supabase
    .from('transaction')
    .update({ [columnId]: value })
    .eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

// Combined hook
export const useFetchUserData = () => {
  const { session } = useSession();
  const userId = session?.user?.id;
  const queryClient = useQueryClient();

  // Fetch user transactions
  const {
    data: userData,
    isLoading: isTransactionsLoading,
    isError: isTransactionsError,
  } = useQuery({
    queryKey: ['transactions', userId],
    queryFn: () => fetchUserProfile(userId!),
    enabled: !!userId, // Fetch only if userId is defined
  });

  // Fetch user categories
  const {
    data: userCategory,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useQuery({
    queryKey: ['userCategory', userId],
    queryFn: () => fetchUserCategory(userId!),
    enabled: !!userId, // Fetch only if userId is defined
  });

  // Mutation for adding a transaction
  const addTransactionMutation = useMutation({
    mutationFn: (transaction: Omit<TransactionTableData, 'id' | 'user_id'>) => {
      if (!userId) throw new Error('User not authenticated');
      return addTransaction(transaction, userId);
    },
    onSuccess: () => {
      if (userId) {
        // Correctly type the query key as an array of string literals
        queryClient.invalidateQueries({ queryKey: ['transactions', userId] });
      }
    },
  });

  // Mutation for adding a category
  const addCategoryMutation = useMutation({
    mutationFn: (category: Omit<UserCategoryProp, 'id' | 'user_id'>) => {
      if (!userId) throw new Error('User not authenticated');
      return addCategory(category, userId);
    },
    onSuccess: () => {
      if (userId) {
        // Correctly type the query key as an array of string literals
        queryClient.invalidateQueries({ queryKey: ['userCategory', userId] });
        toast.success('Category added sucsessfully', {
          style: {
            backgroundColor: 'var(--text-color)',
          },
        });
      }
    },
    onError: () =>
      toast.error('Failed to add category', {
        style: {
          backgroundColor: 'var(--text-color)',
        },
      }),
  });

  // Mutation for deleting a transaction
  const deleteTransactionMutation = useMutation({
    mutationFn: (transactionId: string[]) => {
      if (!userId) throw new Error('User not authenticated');
      return deleteTransaction(transactionId, userId);
    },
    onError: () =>
      toast.error('Failed to add category', {
        style: {
          backgroundColor: 'var(--text-color)',
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', userId] });
      toast.success('Category deleted successfully', {
        style: {
          backgroundColor: 'var(--text-color)',
        },
      });
    },
  });

  // Mutation for deleting a category
  const deleteCategoryMutation = useMutation({
    mutationFn: (categoryId: string) => {
      if (!userId) throw new Error('User not authenticated');
      return deleteCategory(categoryId, userId);
    },
    onSuccess: () => {
      if (userId) {
        // Invalidate the queries to refresh the data
        queryClient.invalidateQueries({ queryKey: ['userCategory', userId] });
      }
      toast.success('Category deleted successfully', {
        style: {
          backgroundColor: 'var(--text-color)',
        },
      });
    },
    onError: () =>
      toast.error('Failed to delete category', {
        style: {
          backgroundColor: 'var(--text-color)',
        },
      }),
  });

  // Mutation for updating a category
  const updateCategoryMutation = useMutation({
    mutationFn: async ({
      id,
      updatedCategory,
      oldCategory,
    }: UpdateCategoryProp) => {
      if (!userId) throw new Error('User not authenticated');
      await updateCategory({ id, updatedCategory, userId, oldCategory });

      const { error } = await supabase
        .from('transaction')
        .update({ category: updatedCategory.category }) // Update to the new category name
        .eq('category', oldCategory); // Match the old category name

      if (error) {
        console.error(
          'Error updating category in transaction table:',
          error.message,
        );
      }
    },
    onSuccess: () => {
      if (userId) {
        // Invalidate the queries to refresh the data
        queryClient.invalidateQueries({ queryKey: ['userCategory', userId] });
        queryClient.invalidateQueries({ queryKey: ['transaction', userId] });
        toast.success('Category updated successfully', {
          style: {
            backgroundColor: 'var(--text-color)',
          },
        });
      }
    },
    onError: () =>
      toast.error('Failed to update category', {
        style: {
          backgroundColor: 'var(--text-color)',
        },
      }),
  });

  // Mutation for updating a transaction

  const updateTransactionMutation = useMutation({
    mutationFn: ({ columnId, id, value }: TransactionProp) => {
      if (!userId) throw new Error('User not authenticated');
      return updateTransaction({ columnId, id, value });
    },
    onSuccess: () => {
      if (userId) {
        // Invalidate the queries to refresh the data
        queryClient.invalidateQueries({ queryKey: ['transactions', userId] });
      }
      toast.success('Transaction updated successfully', {
        style: {
          backgroundColor: 'var(--text-color)',
        },
      });
    },
    onError: () =>
      toast.error('Failed to update transaction', {
        style: {
          backgroundColor: 'var(--text-color)',
        },
      }),
  });

  // Derived calculations for total income, expense, and balance
  const totalIncome = useMemo(() => {
    return userData
      ? userData
          .filter((transaction) => transaction.type === 'Income')
          .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0)
      : 0;
  }, [userData]);

  const totalExpense = useMemo(() => {
    return userData
      ? userData
          .filter((transaction) => transaction.type === 'Expense')
          .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0)
      : 0;
  }, [userData]);

  const totalBalance = totalIncome - totalExpense;

  // Combine loading and error states
  const loading = isTransactionsLoading || isCategoryLoading;
  const error = isTransactionsError || isCategoryError;

  return {
    userData,
    userCategory,
    totalIncome,
    totalExpense,
    totalBalance,
    addTransaction: addTransactionMutation.mutate,
    addCategory: addCategoryMutation.mutate,
    deleteTransaction: deleteTransactionMutation.mutate,
    deleteCategory: deleteCategoryMutation.mutate,
    updateTransaction: updateTransactionMutation.mutate,
    updateCategory: updateCategoryMutation.mutate,

    loading,
    error,
  };
};
