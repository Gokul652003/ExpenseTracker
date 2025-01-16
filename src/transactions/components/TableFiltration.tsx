import { Table } from '@tanstack/table-core';
import { UserType } from './type';
import downIcon from '@/assets/CaretCircleDown.svg';
import { useState } from 'react';
import { DeleteTransactionModal } from './DeleteTransactionModal';

type SesstionFilter = {
  id: string;
  value: string;
};

type TableFitrationProps = {
  setSessionFiters: React.Dispatch<React.SetStateAction<SesstionFilter[]>>;
  tableFilters: string;
  setTableFilters: React.Dispatch<React.SetStateAction<string>>;
  setData: React.Dispatch<React.SetStateAction<UserType[]>>;
  table: Table<UserType>;
};

export const TableFiltrations: React.FC<TableFitrationProps> = ({
  setSessionFiters,
  tableFilters,
  setTableFilters,
  setData,
  table,
}) => {
  const selectedIds = table
    .getSelectedRowModel()
    .rows.map((row) => row.original.id);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const handleSelectChange = (id: string, value: string) => {
    setSessionFiters((prevFilters) => {
      const existingFilterIndex = prevFilters.findIndex(
        (filter) => filter.id === id,
      );
      if (existingFilterIndex !== -1) {
        const updatedFilters = [...prevFilters];
        updatedFilters[existingFilterIndex] = { id, value };
        return updatedFilters;
      }
      return [...prevFilters, { id, value }];
    });
  };

  const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const addTransaction = () => {
    setData((prevData) => [
      {
        id: (prevData.length + 1).toString(),
        date: getFormattedDate(),
        category: '',
        amount: 0,
        type: '',
        notes: '',
      },
      ...prevData,
    ]);
  };

  const renderDropdown = (
    id: string,
    placeholder: string,
    options: string[],
  ) => (
    <div className="flex gap-1.5 items-center p-2 border border-border w-[150px] text-secondary rounded-lg">
      <div>
        <img src={downIcon} alt="dropdown icon" />
      </div>
      <select
        className="bg-transparent outline-none appearance-none w-full"
        onChange={(e) => handleSelectChange(id, e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            style={{
              backgroundColor: '#2F2F2F',
              color: 'white',
              fontSize: '1rem',
              fontFamily: 'Arial, sans-serif',
              position: 'absolute',
              paddingBlock: '10px',
            }}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex justify-between">
      <div className="flex gap-3">
        {renderDropdown('category', 'Category', [
          'Groceries',
          'Salary',
          'Transport',
          'Dining',
          'Freelance',
        ])}
        {renderDropdown('type', 'Type', ['Income', 'Expense'])}
      </div>
      <div className="flex gap-4">
        <div className="flex gap-1.5 items-center p-2 border border-border w-[250px] text-secondary rounded-lg">
          <div>
            <img src={downIcon} alt="amount icon" />
          </div>
          <input
            type="text"
            value={tableFilters}
            onChange={(e) => setTableFilters(e.target.value)}
            className="bg-transparent outline-none appearance-none w-full"
            placeholder="Search..."
          />
        </div>
        {selectedIds.length > 0 && (
          <button
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
            className="bg-[#CC1616;] text-white py-2 px-4 rounded"
            disabled={table.getSelectedRowModel().rows.length === 0}
          >
            Delete
          </button>
        )}
        <button
          className="px-6  bg-primary text-textColor rounded"
          onClick={addTransaction}
        >
          New
        </button>
      </div>
      {isDeleteModalOpen && (
        <DeleteTransactionModal
          setData={setData}
          selectedIds={selectedIds}
          table={table}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      )}
    </div>
  );
};
