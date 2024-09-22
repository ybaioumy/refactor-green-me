import React from 'react';
import { message, Upload } from 'antd';
import Icon from './Icon';
import { authHeader } from '../../utilits/authHeader';
export const FileUploader = ({
  label,
  handleFileChange,
  data,
  disabled,
  onRemove,
}) => {
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
        // Assuming your API returns `filePath` in the response
        const apiResponse = file.response;
        const fileWithUrl = fileList.map((f) => ({
          ...f,
          url: apiResponse.filePath || f.url, // Assign `filePath` from response to the `url`
        }));

        message.success(`${file.name} file uploaded successfully`);
        handleFileChange({ fileList: fileWithUrl }); // Pass updated fileList with `filePath`
      } else if (file.status === 'error') {
        message.error(`${file.name} file upload failed.`);
      } else {
        handleFileChange({ fileList });
      }
    },
    disabled: disabled,
  };

  return (
    <div className="my-10">
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
              <Icon name={'add'} />
              <span className="text-[#1E4A28] text-sm lg:text-base font-abel">
                Add
              </span>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center mb-4 absolute right-[50%] top-[50%] -translate-y-[50%] translate-x-[50%]">
            <Icon name={'upload'} />
            <span className="text-[#ABABAB] text-sm lg:text-base">
              Upload files here
            </span>
          </div>
        </div>
      </Upload>
    </div>
  );
};
