import { CellProp, CustomTableMeta } from './type';
import { SelectBox } from './SelectBox';

interface EditableSelectFieldProp extends CellProp {
  options: { value: string; label: string; colour?: string }[];
}

export const EditableSelectField = ({
  getValue,
  row,
  column,
  table,
  options,
}: EditableSelectFieldProp) => {
  const initailValues = getValue();

  const handleOnChange = (value: string) => {
    const newValue = value;
    (table.options.meta as CustomTableMeta)?.updateData(
      row.index,
      column.id,
      newValue,
    );
  };

  return (
    <SelectBox
      onChange={handleOnChange}
      value={initailValues}
      options={options}
    />
  );
};
