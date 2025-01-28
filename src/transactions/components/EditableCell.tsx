import { useEffect, useState } from 'react';
import { CellProp, CustomTableMeta } from './type';

const EditableCell = ({ getValue, row, column, table }: CellProp) => {
  const initailValues = getValue();
  const [value, setValues] = useState(initailValues);

  useEffect(() => {
    setValues(initailValues);
  }, [initailValues]);
  const onBlur = () => {
    (table.options.meta as CustomTableMeta)?.updateData(
      row.index,
      column.id,
      value,
    );
  };
  return (
    <input
      type="number"
      className="bg-transparent w-24 outline-none"
      value={value}
      onChange={(e) => setValues(String(e.target.value))}
      onBlur={onBlur}
    />
  );
};

export default EditableCell;
