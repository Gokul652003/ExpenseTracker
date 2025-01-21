import { useState, useEffect } from 'react';
import { Table } from '@tanstack/table-core';
import deleteImage from '@/assets/deleteTransactionImg.svg';
import { TransactionTableData } from './type';
import { useFetchUserData } from '../../supabase/supabaseApis';

interface DeleteTransactionModalProp {
  selectedIds: string[];
  setData: React.Dispatch<React.SetStateAction<TransactionTableData[]>>;
  table: Table<TransactionTableData>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteTransactionModal = ({
  selectedIds,
  // setData,
  setIsDeleteModalOpen,
  table,
}: DeleteTransactionModalProp) => {
  const [isVisible, setIsVisible] = useState(false);
  const { deleteTransaction } = useFetchUserData();

  useEffect(() => {
    // Trigger the fade-in animation when modal opens
    setIsVisible(true);
  }, []);

  const handleDeleteRows = (selectedIds: string[]) => {
    deleteTransaction(selectedIds);
    table.resetRowSelection();

    setIsDeleteModalOpen(false);
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsDeleteModalOpen(false);
    }, 300);
  };

  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-all duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none blur-sm'
      }`}
    >
      <div
        className={`bg-bg px-6 py-10 rounded-2xl shadow-lg flex flex-col gap-3.5 w-[444px] transition-all duration-500 ease-in-out transform ${
          isVisible
            ? 'scale-100 opacity-100 translate-y-0'
            : 'scale-95 opacity-0 translate-y-4'
        }`}
      >
        <div className="flex justify-center">
          <img src={deleteImage} alt="Delete Icon" />
        </div>
        <h1 className="text-textColor text-center text-[32px] font-medium">
          Confirm Deletion ?
        </h1>
        <p className="text-secondary text-center text-base">
          Are you sure you want to delete this transaction? This action cannot
          be undone.
        </p>
        <div className="flex gap-4">
          <button
            className="px-10 py-3 bg-border rounded-full text-textColor flex-1"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-10 py-3 bg-primary rounded-full text-textColor flex-1"
            onClick={() => void handleDeleteRows(selectedIds)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
