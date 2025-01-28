import { useEffect, useState } from 'react';
import {
  useReactTable,
  flexRender,
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import EditableCell from './EditableCell';
import { EditableSelectField } from './EditableSelectField';
import { EditableNote } from './EditableNote';
import { EditableDate } from './EditableDate';
import { TableFiltrations } from './TableFiltration';
import { useFetchUserData } from '../../supabase/supabaseApis';
import { TransactionTableData } from './type';
import { Skeleton } from '../../react-components/skeleton/Skeleton';

const transactionType: { value: string; label: string }[] = [
  { value: 'Income', label: 'Income' },
  { value: 'Expense', label: 'Expense' },
];

type ColumnFilter = { id: string; value: string };

export const TransactionTable = () => {
  const { userData, loading, updateTransaction,userCategory } = useFetchUserData();

  const formattedOptions = userCategory?.map(
    (category: { id: string; category: string; colour: string }) => ({
      value: category.category,
      label: category.category,
      colour: category.colour,
    }),
  );

  const columns: ColumnDef<TransactionTableData, string>[] = [
    { accessorKey: 'date', header: 'Date', cell: EditableDate },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: (props) => (
        <EditableSelectField {...props} options={formattedOptions ?? []} />
      ),
    },
    { accessorKey: 'amount', header: 'Amount', cell: EditableCell },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: (props) => (
        <EditableSelectField {...props} options={transactionType} />
      ),
    },
    { accessorKey: 'notes', header: 'Notes', cell: EditableNote },
  ];

  const [data, setData] = useState<TransactionTableData[]>([]); // Initially empty
  const [sessionFilter, setSessionFiltes] = useState<ColumnFilter[]>([]);
  const [tableFilter, setTableFilter] = useState<string>('');

  useEffect(() => {
    if (userData) {
      const formattedData = userData.map((item) => ({
        ...item,
      date: new Date(item.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      }));
      setData(formattedData);
    }
  }, [userData]);

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter: tableFilter, columnFilters: sessionFilter },
    onGlobalFilterChange: setTableFilter,
    meta: {
      updateData: async (
        rowIndex: number,
        columnId: keyof TransactionTableData,
        value: string,
      ) => {
        const updatedRow = data[rowIndex];
        updateTransaction({ columnId, id: updatedRow.id, value });
      },
    },
  });
  if (loading) {
    return (
      <div className='flex flex-col gap-8'>
        <Skeleton className="h-20" />
        <div className='flex flex-col gap-4'>
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-[35px] grow" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <TableFiltrations
        setSessionFiters={setSessionFiltes}
        tableFilters={tableFilter}
        setTableFilters={setTableFilter}
        setData={setData}
        table={table}
      />

      <table className="w-full">
        <thead className="bg-tableBgDark text-secondary">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-left">
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    table.toggleAllRowsSelected(e.target.checked)
                  }
                  checked={table.getIsAllRowsSelected()}
                  className="checkbox"
                />
              </th>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-4">
                  {!header.isPlaceholder &&
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={table.getHeaderGroups()[0].headers.length + 1}
                className="text-center py-4 text-gray-500"
              >
                No results found.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-border px-8 py-10">
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={(e) => row.toggleSelected(e.target.checked)}
                    className="checkbox"
                  />
                </td>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 text-base text-textColor"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};



