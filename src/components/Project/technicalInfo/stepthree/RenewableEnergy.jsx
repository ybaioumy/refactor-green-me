import React, { useState } from 'react';
import { FileUploader } from '../../../shared/Upload';

function RenewableEnergy() {
  const [fileList, setFileList] = useState([]);
  const sections = [
    {
      title: 'Energy Yield Report',
      content: 'Click the button below to upload your files.',
    },
    {
      title: 'Other Documents',
      content: 'Select and upload multiple files at once.',
    },
  ];
  const handleChange = ({ fileList }) => setFileList(fileList);
  const filesData = fileList.map((file) => ({
    filePath: file?.response?.fullPath,
  }));
  console.log(filesData);
  return (
    <>
      {sections.map((section) => (
        <React.Fragment key={section.title}>
          <FileUploader label={section.title} handleFileChange={handleChange} data={fileList}/>
        </React.Fragment>
      ))}
    </>
  );
}

export default RenewableEnergy;
