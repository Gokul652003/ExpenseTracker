import { useEffect, useState } from 'react';
import { useFetchUserData } from '../supabase/supabaseApis';
import { UserCategoryProp } from '../transactions/components/type';
import { supabase } from '../supabase/supabaseClient';
import { useSession } from '../Routes/useSession';
import { LabelComponent } from './LabelComponent';

const Category = () => {
  const { userCategory, loading } = useFetchUserData();
  const { session } = useSession();
  const [categories, setCategories] = useState<UserCategoryProp[]>([]);
  useEffect(() => {
    if (userCategory) setCategories(userCategory);
  }, [userCategory]);

  const handleUpdateCategory = async (
    id: string,
    updatedCategory: Partial<UserCategoryProp>,
  ) => {
    console.log(updatedCategory);
    try {
      const { error } = await supabase
        .from('usercategory')
        .update(updatedCategory)
        .eq('id', id);

      if (error) {
        console.error('Error updating category:', error.message);
        return;
      }

      // Update the state locally
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id ? { ...cat, ...updatedCategory } : cat,
        ),
      );

      console.log('Category updated successfully');
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const deleteCategory = async (categoryId: string) => {
    const { error } = await supabase
      .from('usercategory')
      .delete()
      .eq('id', categoryId);

    if (error) {
      console.error('Error deleting category:', error.message);
      return;
    }

    console.log('Category deleted successfully.');

    // Update the categories state dynamically
    setCategories((prevData) =>
      prevData.filter((category) => category.id !== categoryId),
    );
  };

  const handleDelete = (id: string) => {
    deleteCategory(id);
  };

  const addCategory = async (category: {
    category: string;
    colour: string;
  }) => {
    const { data, error } = await supabase
      .from('usercategory')
      .insert({
        category: category.category,
        colour: category.colour,
        user_id: session?.user?.id,
      })
      .select();
    if (error) {
      console.error('Error adding transaction:', error.message);
      return;
    }

    if (data) {
      console.log('Transaction added successfully:', data);

      setCategories((prevData) => [
        ...prevData,

        {
          id: data[0].id,
          ...category,
        },
      ]);
    }
  };

  const handleAddCategory = () => {
    addCategory({ category: 'New Category', colour: '#ffffff' });
  };

  if (loading) return <div>Loading...</div>;
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
      </div>
    </div>
  );
};

export default Category;
