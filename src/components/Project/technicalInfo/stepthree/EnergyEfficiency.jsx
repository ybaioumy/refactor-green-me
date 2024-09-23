import React, { useState } from 'react';
import { FileUploader } from '../../../shared/Upload';
import { useFormContext, Controller } from 'react-hook-form';

function EnergyEffciency() {
  const { setValue } = useFormContext(); // Use setValue from react-hook-form

  const sections = [
    {
      title: 'Energy Audit Report',
      content: 'Click the button below to upload your files.',
    },
    {
      title: 'Other Documents',
      content: 'Select and upload multiple files at once.',
    },
  ];
  return (
    <div>
      {sections.map((section, index) => (
        <Controller
          key={index}
          name={`documentSections.${index}.documentFiles`}
          render={({ field: { onChange, value } }) => {
            const handleFileChange = ({ fileList = [] }) => {
              // Ensure fileList is always an array
              const updatedFiles = Array.isArray(fileList)
                ? fileList.map((file) => ({
                    filePath: file?.response?.fullPath || file.url || null,
                  }))
                : [];

              // Update the section's document files
              onChange(updatedFiles);
            };

            const handleDeleteAllFiles = () => {
              // Set the entire documentFiles field to undefined, effectively removing it
              setValue(`documentSections.${index}.documentFiles`, undefined);
            };

            return (
              <div>
                <FileUploader
                  label={section.title}
                  disabled={false}
                  handleFileChange={handleFileChange}
                  data={value || []}
                  value={value}
                  onRemove={handleDeleteAllFiles}
                />
              </div>
            );
          }}
        />
      ))}
    </div>
  );
}

export default EnergyEffciency;
