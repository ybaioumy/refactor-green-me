import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Button from './Button';
import PDF from '../../assets/images/icons/pdf.png';
function ExportAsPdf({ data, fileName }) {
  const exportAsPDF = (data, fileName) => {
    const doc = new jsPDF();

    // Set the title of the document
    doc.text('User Data', 20, 10);

    // Define the columns and the rows
    const columns = ['Name', 'Age', 'Email'];
    const rows = data.map((item) => [item.name, item.age, item.email]);

    // Generate the table in PDF
    doc.autoTable({
      head: [columns],
      body: rows,
    });

    // Save the PDF file
    doc.save(`${fileName}.pdf`);
  };
  const dataToUse = [
    { name: 'John', age: 28, email: 'john@example.com' },
    { name: 'Jane', age: 22, email: 'jane@example.com' },
  ];

  return (
    <div className="flex items-center gap-2">
      <img src={PDF} width={30} height={30} alt="" />

      <Button
        onClick={() => exportAsPDF(dataToUse, fileName || 'PDF Document')}
        className={'font-bold text-[12px]'}>
        Export PDF
      </Button>
    </div>
  );
}

export default ExportAsPdf;
