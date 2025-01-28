import React from 'react';
import Modal from './Modal';
import { useCsvUploader } from './CsvUpload';

interface CsvUploaderProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CsvUploaderComponent = ({
  isModalOpen,
  setIsModalOpen,
}: CsvUploaderProps) => {
  const { uploading, message, uploadCsv, downloadTemplate } = useCsvUploader();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadCsv(file);
    }

    setIsModalOpen(false);
  };

  return (
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-xl opacity-95">
        <h2 className="text-xl font-semibold text-gray-800">Upload CSV</h2>
        <p className="text-gray-600">
          Please ensure your CSV has the following headers:
        </p>
        <ul className="text-gray-600">
          {['category', 'amount', 'type', 'notes', 'date'].map((header) => (
            <li key={header}>{header}</li>
          ))}
        </ul>
        <button
          onClick={downloadTemplate}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition duration-300"
        >
          Download CSV Template
        </button>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={uploading}
          className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {uploading && <p className="mt-2 text-gray-500">Uploading...</p>}
        {message && <p className="mt-2 text-red-500">{message}</p>}
      </div>
    </Modal>
  );
};

export default CsvUploaderComponent;
