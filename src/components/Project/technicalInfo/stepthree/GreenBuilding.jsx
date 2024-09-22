import React from 'react';
import { FileUploader } from '../../../shared/Upload';
import { useFormContext } from 'react-hook-form';

function GreenBuilding() {
  const sections = [
    {
      title: 'Proof of Green Building Certifications',
      content: 'Click the button below to upload your files.',
    },
    {
      title: 'Energy Performance Report',
      content: 'Drag and drop your files into the designated area.',
    },
    {
      title: 'Other Documents',
      content: 'Select and upload multiple files at once.',
    },
  ];

  const { watch, setValue } = useFormContext();
  const docs = watch('documentSections') || [];

  const handleChange =
    (sectionTitle) =>
    ({ fileList }) => {
      const existingSection =
        docs.find((doc) => doc.name === sectionTitle.replace(/\s+/g, '-')) ||
        {};
      const updatedFiles = [
        ...(existingSection.documentFiles || []),
        ...fileList.map((file) => ({
          filePath: file?.response?.fullPath || file.url || null,
        })),
      ];

      const updatedSection = {
        name: sectionTitle.replace(/\s+/g, '-'),
        isapproved: true,
        documentFiles: updatedFiles, // Combine existing and new files
      };

      setValue(
        'documentSections',
        docs.some((doc) => doc.name === updatedSection.name)
          ? docs.map((doc) =>
              doc.name === updatedSection.name ? updatedSection : doc
            )
          : [...docs, updatedSection]
      );
    };

  return (
    <div>
      {sections.map((section, index) => {
        const sectionData =
          docs.find((doc) => doc.name === section.title.replace(/\s+/g, '-')) ||
          [];
        console.log(sectionData.documentFiles);
        return (
          <FileUploader
            key={index}
            label={section.title}
            disabled={false}
            handleFileChange={handleChange(section.title)} // Pass the section title to handleChange
            data={sectionData.documentFiles}
          />
        );
      })}
    </div>
  );
}

export default GreenBuilding;
