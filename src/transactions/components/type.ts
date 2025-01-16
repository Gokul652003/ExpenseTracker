import { Column, Row, Table } from '@tanstack/table-core';

export interface UserType {
  id: string;
  date: string;
  category: string;
  amount: number;
  type: string;
  notes: string;
}

export interface CellProp {
  getValue: () => string;
  row: Row<UserType>;
  column: Column<UserType>;
  table: Table<UserType>;
}

export interface CustomTableMeta {
  updateData: (rowIndex: number, columnId: string, value: string) => void;
}
