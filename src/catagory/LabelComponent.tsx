import { useState } from 'react';
import catagoryListIcon from '@/assets/catagoryListIcon.svg';
import catagoryDeleteIcon from '@/assets/catagoryDelete.svg';
import { UserCategoryProp } from '../transactions/components/type';

export const LabelComponent: React.FC<{
  category: UserCategoryProp;
  onUpdate: (id: string, updatedCategory: Partial<UserCategoryProp>) => void;
  onDelete: (id: string) => void;
}> = ({ category, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState(category.category);
  const [editedColor, setEditedColor] = useState(category.colour);

  const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedCategory(event.target.value); // Update local state
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setEditedColor(newColor); // Update local state
    onUpdate(category.id, { colour: newColor }); // Trigger immediate update
  };

  const handleLabelBlur = () => {
    setIsEditing(false);

    // Update the category only if changes are made
    if (editedCategory !== category.category) {
      onUpdate(category.id, {
        category: editedCategory,
      });
    }
  };

  return (
    <div className="flex gap-1.5 items-center">
      <div>
        <img src={catagoryListIcon} alt="" />
      </div>
      <div className="flex gap-1.5 items-center p-2 flex-1">
        <div
          className="size-3.5 rounded cursor-pointer"
          style={{ backgroundColor: editedColor }}
        >
          <input
            type="color"
            placeholder="Category name"
            value={editedColor}
            onChange={handleColorChange}
            className="opacity-0 w-full h-full cursor-pointer placeholder-secondary"
            title="Select Color"
          />
        </div>
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              value={editedCategory}
              onChange={handleLabelChange}
              onBlur={handleLabelBlur}
              autoFocus
              className={
                'rounded text-textColor  bg-transparent w-full outline-none'
              }
            />
          ) : (
            <label
              className={`cursor-pointer w-full  ${editedCategory === '' ? 'text-secondary' : 'text-textColor'}`}
              onClick={() => setIsEditing(true)}
            >
              {editedCategory === '' ? 'Category name' : editedCategory}
            </label>
          )}
        </div>

        <button onClick={() => onDelete(category.id)}>
          <img src={catagoryDeleteIcon} alt="" />
        </button>
      </div>
    </div>
  );
};
