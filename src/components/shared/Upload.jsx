import React from 'react';
import { message, Upload } from 'antd';
import Icon from './Icon';
import { authHeader } from '../../utilits/authHeader';

export const FileUploader = ({
  label,
  handleFileChange,
  data,
  disabled,
  onRemove, // Triggered when individual files are removed
  value,
}) => {
  // Handler to remove a single file
  const handleFileRemove = (fileIndex) => {
    const updatedFiles = value.filter((_, index) => index !== fileIndex);
    handleFileChange({ fileList: updatedFiles });
    message.success(`File ${fileIndex + 1} removed successfully`);
  };

  const props = {
    name: 'file',
    multiple: true,
    action: `${process.env.REACT_APP_API_BASE}FileUpload/upload`,
    headers: {
      Authorization: authHeader(), // Enable the auth header if needed
    },
    onChange(info) {
      const { file, fileList } = info;
      if (file.status === 'done') {
        const apiResponse = file.response;
        const fileWithUrl = fileList.map((f) => ({
          ...f,
          url: apiResponse.filePath || f.url, // Assign `filePath` from response to the `url`
        }));

        message.success(`${file.name} file uploaded successfully`);
        handleFileChange({ fileList: fileWithUrl });
      } else if (file.status === 'error') {
        message.error(`${file.name} file upload failed.`);
      } else {
        handleFileChange({ fileList });
      }
    },
    onRemove,
    showUploadList: false,
    disabled: disabled,
  };

  return (
    <div className="mt-5">
      <Upload {...props}>
        <label className="font-bold text-[#1E4A28] text-lg lg:text-xl">
          {label || null}
        </label>
        <div className="w-full bg-[#E2E2E2] border-dashed border border-[#99BAA0] flex md:flex-row justify-between items-center p-4 rounded my-4 relative">
          <div className="mb-4 md:mb-0">
            <button
              type="button"
              className="flex flex-col items-center justify-center bg-[#D8F992] w-16 h-16 lg:w-20 lg:h-20 shadow-lg rounded-full">
              <input id="file-input" type="file" className="hidden" />
              <Icon name={'addProjectGreen'} />
            </button>
          </div>
          <div className="flex flex-col items-center justify-center mb-4 absolute right-[50%] top-[50%] -translate-y-[50%] translate-x-[50%]">
            <Icon name={'upload'} />
            <span className="text-[#ABABAB] text-sm lg:text-base">
              Upload files here
            </span>
          </div>
          {value && value.length > 0 && (
            <div className="mb-4 md:mb-0 z-[9999]">
              <button
                onClick={onRemove}
                type="button"
                className="flex flex-col items-center justify-center bg-[#D8F992] w-16 h-16 lg:w-20 lg:h-20 shadow-lg rounded-full">
                <Icon name={'delete'} />
              </button>
            </div>
          )}
        </div>
      </Upload>

      {/* Display files as download links with delete options */}
      <div className="">
        {value && value.length > 0 && (
          <div className="file-list">
            <ul>
              {value
                .filter((file) => file && file.filePath !== null) // Filter files with non-null filePath
                .map((file, fileIndex) => (
                  <li
                    key={fileIndex}
                    className="mb-2 flex items-center justify-between hover:bg-slate-50 transition-colors duration-300 ps-1">
                    <a
                      href={file.filePath}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-500 transition-all duration-150 flex items-center  gap-2">
                      <Icon name={'eye'} />
                      {`Download File ${fileIndex + 1} from ${label}`}
                    </a>

                    {/* Individual File Delete Icon */}
                    <button
                      type="button"
                      className="ml-4 text-red-500 hover:text-red-700"
                      onClick={() => handleFileRemove(fileIndex)}>
                      <Icon name={'delete'} />
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
