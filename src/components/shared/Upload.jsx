import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { message, Upload } from 'antd';
import { authHeader } from '../../utilits/authHeader';
import Icon from './Icon';

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
      // Authorization: authHeader(),
    },
    onChange(info) {
      const { file, fileList } = info;
      if (file.status === 'done') {
        message.success(`${file.name} file uploaded successfully`);
        handleFileChange({ fileList });
      } else if (file.status === 'error') {
        message.error(`${file.name} file upload failed.`);
      } else {
        handleFileChange({ fileList });
      }
    },
    onRemove(file) {},
    disabled: disabled,
  };
  return (
    <div className="my-10">
      <Upload
        {...props}
        fileList={data?.map((item, index) => ({
          name: `${index + 1} - ${label}`,
          url: item.filePath,
        }))}>
        <label className="font-bold text-[#1E4A28] text-lg lg:text-xl">
          {label || null}
        </label>
        <div className="w-full bg-[#E2E2E2] border-dashed border border-[#99BAA0] flex md:flex-row justify-between items-center p-4 rounded my-4 relative">
          <div className="mb-4 md:mb-0">
            <button
              type="button"
              className="flex flex-col items-center justify-center bg-[#D8F992] w-16 h-16 lg:w-20 lg:h-20 shadow-lg rounded-full">
              <input id="file-input" type="file" className="hidden" />
              <AddSvg />
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
          {/* {fileList?.documentFiles?.length > 0 && (
            <button
              type="button"
              className="flex flex-col items-center justify-center bg-[#D8F992] w-16 h-16 lg:w-20 lg:h-20 shadow-lg rounded-full">
              <Icon name={'delete'} />
            </button>
          )} */}
        </div>
      </Upload>
    </div>
  );
};

const AddSvg = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 41 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.000366211 20.8191C0.000366211 9.55208 9.13351 0.418945 20.4005 0.418945C31.6675 0.418945 40.8006 9.55208 40.8006 20.8191C40.8006 32.0861 31.6675 41.2192 20.4005 41.2192C9.13351 41.2192 0.000366211 32.0861 0.000366211 20.8191ZM20.4005 4.49897C16.0721 4.49897 11.9211 6.21841 8.86044 9.27902C5.79983 12.3396 4.08039 16.4907 4.08039 20.8191C4.08039 25.1474 5.79983 29.2985 8.86044 32.3591C11.9211 35.4198 16.0721 37.1392 20.4005 37.1392C24.7289 37.1392 28.8799 35.4198 31.9406 32.3591C35.0012 29.2985 36.7206 25.1474 36.7206 20.8191C36.7206 16.4907 35.0012 12.3396 31.9406 9.27902C28.8799 6.21841 24.7289 4.49897 20.4005 4.49897Z"
      fill="#1E4A28"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.4401 10.6191C22.4401 10.0781 22.2252 9.55918 21.8426 9.17661C21.46 8.79403 20.9412 8.5791 20.4001 8.5791C19.8591 8.5791 19.3402 8.79403 18.9576 9.17661C18.575 9.55918 18.3601 10.0781 18.3601 10.6191V18.7792H10.2C9.659 18.7792 9.14012 18.9941 8.75754 19.3767C8.37496 19.7593 8.16003 20.2781 8.16003 20.8192C8.16003 21.3602 8.37496 21.8791 8.75754 22.2617C9.14012 22.6443 9.659 22.8592 10.2 22.8592H18.3601V31.0192C18.3601 31.5603 18.575 32.0792 18.9576 32.4618C19.3402 32.8443 19.8591 33.0593 20.4001 33.0593C20.9412 33.0593 21.46 32.8443 21.8426 32.4618C22.2252 32.0792 22.4401 31.5603 22.4401 31.0192V22.8592H30.6002C31.1412 22.8592 31.6601 22.6443 32.0427 22.2617C32.4253 21.8791 32.6402 21.3602 32.6402 20.8192C32.6402 20.2781 32.4253 19.7593 32.0427 19.3767C31.6601 18.9941 31.1412 18.7792 30.6002 18.7792H22.4401V10.6191Z"
      fill="#1E4A28"
    />
  </svg>
);
