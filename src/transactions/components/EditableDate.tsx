import { useEffect, useState } from 'react';
import { CellProp, CustomTableMeta } from './type';

export const EditableDate = ({ getValue, row, column, table }: CellProp) => {
  const initialValues = getValue();

  const [value, setValue] = useState(initialValues);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setValue(initialValues);
  }, [initialValues]);

  const handleBlur = () => {
    (table.options.meta as CustomTableMeta)?.updateData(
      row.index,
      column.id,
      value,
    );
    setIsEditing(false);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // const formattedDate = new Date(value).toLocaleDateString('en-US', {
  //   month: 'long',
  //   day: 'numeric',
  //   year: 'numeric',
  // });

  return (
    <div onDoubleClick={handleDoubleClick} style={{ cursor: 'pointer' }}>
      {isEditing ? (
        <input
          type="date"
          className="bg-transparent"
          value={value}
          onChange={(e) => setValue(new Date(e.target.value).toISOString())}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span>{value}</span>
      )}
    </div>
  );
};
