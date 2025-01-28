import { useState } from 'react';
import Papa from 'papaparse';
import { TransactionTableData } from '../transactions/components/type';
import { useFetchUserData } from './supabaseApis';

const EXPECTED_HEADERS = ['category', 'amount', 'type', 'notes', 'date'];

export const useCsvUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const { uploadCsv:CsvFileUpload} = useFetchUserData();

  const parseCsv = (file: File): Promise<TransactionTableData[]> => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data as TransactionTableData[]),
        error: (error) => reject(error),
      });
    });
  };

  const uploadCsv = async (file: File) => {
    setUploading(true);
    setMessage('');

    try {
      const csvData = await parseCsv(file);

      // Validate headers
      const fileHeaders = Object.keys(csvData[0] || {});
      const missingHeaders = EXPECTED_HEADERS.filter(
        (header) => !fileHeaders.includes(header),
      );

      if (missingHeaders.length > 0) {
        setMessage(
          `Invalid CSV. Missing headers: ${missingHeaders.join(', ')}`,
        );
        return;
      }

        CsvFileUpload(csvData)

      
    } catch (err) {
      console.error('Error parsing or uploading CSV:', err);
      setMessage('Error parsing the file.');
    } finally {
      setUploading(false);
    }
  };

  const downloadTemplate = () => {
    const templateData = [EXPECTED_HEADERS].join(',') + '\n';
    const blob = new Blob([templateData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'csv_template.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  return {
    uploading,
    message,
    uploadCsv,
    downloadTemplate,
  };
};
