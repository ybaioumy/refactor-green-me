import React from 'react';
import * as XLSX from 'xlsx';
import Button from './Button';
import Excel from '../../assets/images/icons/excel.png';
function ExportAsExcelButton({ data, fileName, variant }) {
  const exportFunction = (data, fileName) => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Create a worksheet from the data array
    const ws = XLSX.utils.json_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate the Excel file and trigger download
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <>
      {variant === 'withIcon' ? (
        <Button
          hasIcon
          iconPosition="right"
          iconName="excel"
          onClick={() => exportFunction(data, fileName)}>
          Export to Excel
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <img src={Excel} width={30} height={30} alt="download_icon" />
          <Button
            className={'font-bold text-[12px]'}
            onClick={() => exportFunction(data, fileName)}>
            Export Excel
          </Button>
        </div>
      )}
    </>
  );
}

export default ExportAsExcelButton;
