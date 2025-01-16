import { useEffect, useState } from 'react';
import { CellProp, CustomTableMeta } from './type';

export const EditableNote = ({ getValue, row, column, table }: CellProp) => {
  const initialValues = getValue();
  const [value, setValues] = useState(initialValues);

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  const onBlur = () => {
    (table.options.meta as CustomTableMeta)?.updateData(
      row.index,
      column.id,
      value,
    );
  };

  return (
    <input
      type="text"
      className="bg-transparent text-wrap w-full"
      value={value}
      onChange={(e) => setValues(e.target.value)}
      onBlur={onBlur}
    />
  );
};
