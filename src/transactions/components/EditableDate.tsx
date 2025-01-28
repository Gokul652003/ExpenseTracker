import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { CellProp, CustomTableMeta } from './type';
import 'react-datepicker/dist/react-datepicker.css'; // Import default styles
import { toast } from 'sonner';

export const EditableDate = ({ getValue, row, column, table }: CellProp) => {
  // Get initial value from the table
  const initialValues = getValue();

  // Ensure that initialValues is a valid date string or fall back to the current date
  const initialDate = initialValues ? new Date(initialValues) : new Date();

  const [value, setValue] = useState(initialDate);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Update value when initialValues changes
    const newValue = initialValues ? new Date(initialValues) : new Date();
    setValue(newValue);
  }, [initialValues]);

  const handleBlur = () => {
    // Save the updated value as an ISO string when the user finishes editing
    (table.options.meta as CustomTableMeta)?.updateData(
      row.index,
      column.id,
      value.toISOString(),
    );
    setIsEditing(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  return (
    <div onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
      {isEditing ? (
        <DatePicker
          selected={value}
          onChange={(date: Date | null) => {
            if (date) {
              setValue(date);
            } else {
              toast.error('Please enter a valid date', {
                style: {
                  backgroundColor: 'var(--text-color)',
                },
              });
            }
          }}
          onBlur={handleBlur}
          autoFocus
          dateFormat="MMMM dd, yyyy"
          className="bg-transparent"
        />
      ) : (
        // Display the date in a formatted string
        <span>
          {value.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
      )}
    </div>
  );
};
