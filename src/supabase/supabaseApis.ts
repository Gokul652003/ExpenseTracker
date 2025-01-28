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

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
// Fetch user transactions
const fetchUserProfile = async (
  userId: string,
): Promise<TransactionTableData[] | null> => {
  const { data: transactions, error } = await supabase
    .from('transaction')
    .select('id,date,type,amount,notes,category')
    .eq('user_id', userId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching user profile:', error.message);
    return null;
  }

  return transactions as TransactionTableData[];
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
const fetchCategoryTotalAmounts = async (
  userId: string,
  type: 'expense' | 'income',
) => {
  const { data: transactionData, error: transactionError } = await supabase
    .from('transaction')
    .select('category, amount')
    .ilike('type', type)
    .eq('user_id', userId); // Filter by user_id

  if (transactionError) {
    console.error('Error fetching transaction data:', transactionError.message);
    return null;
  }

  // Step 2: Sum the amount for each category
  const categoryTotals = transactionData?.reduce(
    (acc, curr) => {
      const category = curr.category;
      const amount = parseFloat(curr.amount); // Convert amount to a number

      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category] += amount;
      return acc;
    },
    {} as { [category: string]: number },
  );

  // Convert the categoryTotals object to an array of categories with their totals
  const sortedCategories = Object.entries(categoryTotals || {})
    .map(([category, totalAmount]) => ({
      category,
      totalAmount,
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount); // Sort by totalAmount in descending order

  // Step 3: Get the top 3 categories
  const topThreeCategories = sortedCategories.slice(0, 3);

  // Step 4: Fetch colors for each category from the usercategory table
  const { data: categoryColors, error: categoryError } = await supabase
    .from('usercategory')
    .select('category, colour') // Fetch category and its associated colour
    .eq('user_id', userId);

  if (categoryError) {
    console.error('Error fetching category colors:', categoryError.message);
    return topThreeCategories;
  }

  // Step 5: Add color to each category in the top three categories
  const topThreeCategoriesWithColor = topThreeCategories.map((categoryData) => {
    const categoryColor = categoryColors?.find(
      (colorData) => colorData.category === categoryData.category,
    )?.colour;

    return {
      ...categoryData,
      colour: categoryColor || '#000000', // Default to black if color is not found
    };
  });

  return topThreeCategoriesWithColor;
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

  // Mutation for updating a transaction

  const uploadCsvMutaion = useMutation({
    mutationFn: async (csvData: TransactionTableData[]) => {
      if (!userId) throw new Error('User not authenticated');

      // Step 1: Extract categories from the CSV data
      const categoriesFromCsv = Array.from(
        new Set(csvData.map((transaction) => transaction.category)),
      );

      // Step 2: Fetch existing categories for the user
      const { data: existingCategories, error: categoryError } = await supabase
        .from('usercategory')
        .select('category, colour')
        .eq('user_id', userId);

      if (categoryError) {
        throw new Error('Error fetching categories: ' + categoryError.message);
      }

      const existingCategoriesSet = new Set(
        existingCategories?.map((cat) => cat.category),
      );
      const missingCategories = categoriesFromCsv.filter(
        (category) => !existingCategoriesSet.has(category),
      );

      // Step 3: Insert missing categories into the `usercategory` table
      if (missingCategories.length > 0) {
        const newCategories = missingCategories.map((category) => ({
          category,
          user_id: userId,
          colour: getRandomColor(), // Assign random color to new categories
        }));

        const { error: insertError } = await supabase
          .from('usercategory')
          .insert(newCategories);

        if (insertError) {
          throw new Error(
            'Error adding missing categories: ' + insertError.message,
          );
        }
      }

      // Step 4: Insert the CSV transaction data into the `transaction` table
      const { error: transactionError } = await supabase
        .from('transaction')
        .insert(csvData);

      if (transactionError) {
        throw new Error(
          'Error inserting transaction data: ' + transactionError.message,
        );
      }

      return 'CSV uploaded successfully';
    },
    onSuccess: () => {
      if (userId) {
        // Invalidate queries to refresh the data
        queryClient.invalidateQueries({ queryKey: ['transactions', userId] });
        queryClient.invalidateQueries({ queryKey: ['userCategory', userId] });
      }
      toast.success('CSV uploaded successfully', {
        style: {
          backgroundColor: 'var(--text-color)',
        },
      });
    },
    onError: (error: Error) => {
      toast.error('Error uploading CSV: ' + error.message, {
        style: {
          backgroundColor: 'var(--error-color)',
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

  const { data: topExpenseCategories, isLoading: topExpenseLoading } = useQuery(
    {
      queryKey: ['top3ExpenseCategories', userId],
      queryFn: () => fetchCategoryTotalAmounts(userId!, 'expense'),
      enabled: !!userId, // Fetch only if userId is defined
    },
  );

  const { data: topIncomeCategories, isLoading: topIncomeLoading } = useQuery({
    queryKey: ['top3IncomeCategories', userId],
    queryFn: () => fetchCategoryTotalAmounts(userId!, 'income'),
    enabled: !!userId, // Fetch only if userId is defined
  });
  // Derived calculations for total income, expense, and balance
  const totalIncome = useMemo(() => {
    return userData
      ? userData
          .filter((transaction) => transaction.type.toLowerCase() === 'income')
          .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0)
      : 0;
  }, [userData]);

  const totalExpense = useMemo(() => {
    return userData
      ? userData
          .filter((transaction) => transaction.type.toLowerCase() === 'expense')
          .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0)
      : 0;
  }, [userData]);

  const totalBalance = totalIncome - totalExpense;

  // Combine loading and error states
  const loading =
    isTransactionsLoading ||
    isCategoryLoading ||
    uploadCsvMutaion.isPending ||
    topIncomeLoading;
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
    uploadCsv: uploadCsvMutaion.mutate,
    topThreeExpenseCategories: topExpenseCategories,
    topThreeInomeCategories: topIncomeCategories,
    topExpenceLoading: topExpenseLoading,

    uploadCsvProgress: uploadCsvMutaion.isPending,

    loading,
    error,
  };
};
