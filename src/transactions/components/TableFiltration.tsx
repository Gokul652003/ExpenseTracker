import { Table } from '@tanstack/table-core';
import downIcon from '@/assets/CaretCircleDown.svg';
import { useState } from 'react';
import { DeleteTransactionModal } from './DeleteTransactionModal';
import { supabase } from '../../supabase/supabaseClient';
import { useSession } from '../../Routes/useSession';
import { TransactionTableData } from './type';
import { toast } from 'sonner';

type SesstionFilter = {
  id: string;
  value: string;
};

type TableFitrationProps = {
  setSessionFiters: React.Dispatch<React.SetStateAction<SesstionFilter[]>>;
  tableFilters: string;
  setTableFilters: React.Dispatch<React.SetStateAction<string>>;
  setData: React.Dispatch<React.SetStateAction<TransactionTableData[]>>;
  table: Table<TransactionTableData>;
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

  // const getFormattedDate = () => {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = String(today.getMonth() + 1).padStart(2, '0');
  //   const day = String(today.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // };
  const { session } = useSession();

  const addTransaction = async (transactionData: {
    category: string;
    amount: string;
    type: string;
    notes: string;
    date: string;
  }) => {
    const { data, error } = await supabase
      .from('transaction')
      .insert({
        category: transactionData.category,
        amount: transactionData.amount,
        type: transactionData.type,
        notes: transactionData.notes,
        date: transactionData.date,
        user_id: session?.user?.id,
      })
      .select();

    if (error) {
      toast.error(error.message, {
        style: {
          backgroundColor: 'var(--text-color)',
        },
      });
      return;
    }

    if (data) {
      toast.success('New transaction added successfully', {
        style: {
          backgroundColor: 'var(--text-color)',
        },
      });

      // Update the table state dynamically
      setData((prevData) => [
        {
          id: data[0].id, // Use the ID from the inserted transaction
          ...transactionData, // Spread the input data into the new state
        },
        ...prevData,
      ]);
    }
  };

  const handleAddTransaction = () => {
    const newTransaction = {
      category: '', // Replace with dynamic input values
      amount: '0',
      type: '',
      notes: '',
      date: new Date().toISOString(),
    };

    addTransaction(newTransaction);
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
          onClick={handleAddTransaction}
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
