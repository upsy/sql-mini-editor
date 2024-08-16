// src/components/DownloadCSVButton.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileDown } from 'lucide-react';

interface DownloadCSVButtonProps {
  data: Record<string, string | number >[];
  filename?: string;
}

export const DownloadCSVButton: React.FC<DownloadCSVButtonProps> = ({ data, filename = 'download.csv' }) => {
  const generateCSV = (data: Record<string, string | number >[]): string => {
    if (data.length === 0) return '';

    const headers = Object.keys(data[0]);

    const csvRows = [
      headers.join(','), // CSV header row
      ...data.map(row => 
        headers.map(header => 
          JSON.stringify((row)[header] ?? '')
        ).join(',')
      )
    ];

    return csvRows.join('\n');
  };

  const downloadCSV = () => {
    const csvContent = generateCSV(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Button variant="secondary" onClick={downloadCSV}>
      <FileDown className="w-4 h-4 mr-2" />
      Download CSV
    </Button>
  );
};