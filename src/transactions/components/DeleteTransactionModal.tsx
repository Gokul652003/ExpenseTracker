import { Table } from '@tanstack/table-core';
import { UserType } from './type';
import deleteImage from '@/assets/deleteTransactionImg.svg';

interface DeleteTransactionModalProp {
  selectedIds: string[];
  setData: React.Dispatch<React.SetStateAction<UserType[]>>;
  table: Table<UserType>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const DeleteTransactionModal = ({
  selectedIds,
  setData,
  table,
  setIsDeleteModalOpen,
}: DeleteTransactionModalProp) => {
  const deleteTransaction = () => {
    setData((prevData) =>
      prevData.filter((item) => !selectedIds.includes(item.id)),
    );
    table.resetRowSelection();
    setIsDeleteModalOpen(false);
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
            onClick={deleteTransaction}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
