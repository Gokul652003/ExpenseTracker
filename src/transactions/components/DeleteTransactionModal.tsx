import { Table } from '@tanstack/table-core';
import deleteImage from '@/assets/deleteTransactionImg.svg';
import { supabase } from '../../supabase/supabaseClient';
import { TransactionTableData } from './type';

interface DeleteTransactionModalProp {
  selectedIds: string[];
  setData: React.Dispatch<React.SetStateAction<TransactionTableData[]>>;
  table: Table<TransactionTableData>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const DeleteTransactionModal = ({
  selectedIds,
  setData,
  setIsDeleteModalOpen,
  table,
}: DeleteTransactionModalProp) => {
  const handleDeleteRows = async (selectedIds: string[]) => {
    // Delete selected rows from the backend
    const { error } = await supabase
      .from('transaction')
      .delete()
      .in('id', selectedIds);

    if (error) {
      console.error('Error deleting rows:', error.message);
    } else {
      // Update the table data after successful deletion
      setData((prevData) =>
        prevData.filter((row) => !selectedIds.includes(row.id)),
      );
      table.resetRowSelection();

      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-bg px-6 py-10 rounded-2xl shadow-lg flex flex-col gap-3.5 w-[444px] ">
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
            onClick={() => setIsDeleteModalOpen(false)}
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
