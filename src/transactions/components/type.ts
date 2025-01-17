import { Column, Row, Table } from '@tanstack/table-core';


export interface TransactionTableData {
  id: string;
  category: string;
  amount: string;
  type: string;
  notes: string;
  date: string;
}

export interface CellProp {
  getValue: () => string;
  row: Row<TransactionTableData>;
  column: Column<TransactionTableData>;
  table: Table<TransactionTableData>;
}

export interface CustomTableMeta {
  updateData: (rowIndex: number, columnId: string, value: string) => void;
}
