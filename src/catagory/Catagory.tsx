import { useEffect, useState } from 'react';
import { useFetchUserData } from '../supabase/supabaseApis';
import { UserCategoryProp } from '../transactions/components/type';
import { LabelComponent } from './LabelComponent';
import { supabase } from '../supabase/supabaseClient';
import { toast } from 'sonner';
import { Skeleton } from '../react-components/skeleton/Skeleton';
import { useSession } from '../Routes/useSession';

export const Category = () => {
  const { session } = useSession();
  const { userCategory, loading, deleteCategory, addCategory, updateCategory } =
    useFetchUserData();
  const [categories, setCategories] = useState<UserCategoryProp[]>([]);
  useEffect(() => {
    if (userCategory) setCategories(userCategory);
  }, [userCategory]);

  const handleUpdateCategory = async (
    id: string,
    updatedCategory: Partial<UserCategoryProp>,
  ) => {
    const categoryToUpdate = categories.find((cat) => cat.id === id);
    if (!categoryToUpdate) return;

    const oldCategory = categoryToUpdate.category;

    await updateCategory({
      id,
      updatedCategory,
      oldCategory,
    });
  };

  const handleDelete = async (id: string) => {
    const categoryToDelete = categories.find((cat) => cat.id === id);
    if (!categoryToDelete) return;

    const { data: transactions, error: fetchError } = await supabase
      .from('transaction')
      .select('id')
      .eq('user_id', session?.user.id)
      .eq('category', categoryToDelete.category); // Check if there are transactions with this category

    if (fetchError) {
      console.error('Error checking transactions:', fetchError.message);
      toast.error('Failed to check transactions');
      return;
    }

    if (transactions && transactions.length > 0) {
      // If transactions exist with this category, show an error
      toast.error('Cannot delete category. It is referenced in transactions.');
      return;
    }
    deleteCategory(id);
  };

  const handleAddCategory = () => {
    const newCategory = {
      category: '',
      colour: '#00FF00',
    };
    addCategory(newCategory);
  };

  return (
    <div className="flex flex-col">
      <div className="p-8 flex flex-col gap-2 border border-border">
        <span className="text-textColor text-[44px] font-medium">
          Add Category
        </span>
        <span className="text-base text-secondary font-normal">
          Organize transactions by adding and managing categories easily.
        </span>
      </div>
      <div className="px-8 pt-8 pb-20 w-[498px] flex flex-col gap-6">
        {/* Category List */}
        {loading ? (
          <>
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
            <Skeleton className="h-5" />
          </>
        ) : (
          <>
            {categories?.map((category) => (
              <LabelComponent
                key={category.id}
                category={category}
                onUpdate={handleUpdateCategory}
                onDelete={handleDelete}
              />
            ))}
            <div className="flex justify-start">
              <button
                onClick={handleAddCategory}
                className="bg-primary text-white p-2 rounded"
              >
                Add Category
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
