import React, { useState } from 'react';
import Papa from 'papaparse';
import { supabase } from './supabaseClient';

const CSVUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    Papa.parse(file, {
      complete: async (result) => {
        const rows = result.data as Array<any>; // Ensure this matches your CSV structure
        for (const row of rows) {
          const { data, error } = await supabase
            .from('your_table_name') // Replace with your actual table name
            .insert([row]);

          if (error) {
            console.error('Error inserting row: ', error.message);
          } else {
            console.log('Row inserted:', data);
          }
        }
      },
      header: true, // Set to true if the CSV has headers
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload CSV</button>
    </div>
  );
};

export default CSVUpload;
