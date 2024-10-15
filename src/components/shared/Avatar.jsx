import React, { useState } from 'react';
import { Upload } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getBase64, beforeUpload } from '../../utilits/helpers';

const AvatarUploader = ({ onUploadSuccess }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      const filePath =
        info.file.response.filePath || info.file.response.fullPath || '';
      onUploadSuccess(filePath);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImagePreview(url);
      });
    }
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: 'none' }}
      className="w-[100px] h-[100px]"
      type="button">
      {loading ? (
        <LoadingOutlined />
      ) : (
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 198 198"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="198"
            height="198"
            viewBox="0 0 198 198"
            fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M99.6419 198C44.3235 198 0 153.677 0 99.0006C0 44.3244 44.3235 0 99.6419 0C153.677 0 198 44.3244 198 99.0006C198 153.677 153.677 198 99.6419 198ZM161.234 84.5812C161.234 75.8606 161.234 71.8103 159.533 68.1661C158.041 65.235 155.66 62.8516 152.73 61.3573C149.396 59.6628 145.862 59.6628 136.312 59.6628H131.638L127.95 53.3395C125.321 48.8291 124.006 46.5802 122.175 44.9421C120.554 43.4916 118.649 42.3964 116.579 41.727C114.243 40.9735 112.146 40.9735 106.417 40.9735H91.4331C86.2175 40.9735 83.6131 40.9735 81.2768 41.727C79.2074 42.3964 77.3024 43.4916 75.6816 44.9421C73.8503 46.5802 73.1152 48.8291 69.9058 53.3395L66.2178 59.6628H61.544C52.8222 59.6628 48.4601 59.6628 45.1264 61.3573C42.1942 62.8504 39.8107 65.2339 38.3165 68.1661C36.622 71.8103 36.622 75.8606 36.622 84.5812V121.96C36.622 130.682 36.622 135.043 38.3165 138.376C39.8119 141.305 42.1954 143.687 45.1264 146.006C48.4601 146.879 52.8222 146.879 61.544 146.879H136.312C145.862 146.879 149.396 146.879 152.73 146.006C155.659 143.686 158.04 141.305 159.533 138.376C161.234 135.043 161.234 130.682 161.234 121.96V84.5812ZM98.9275 128.502C82.5836 128.502 69.3329 115.937 69.3329 98.9097C69.3329 82.567 82.5836 69.3187 98.9275 69.3187C115.273 69.3187 128.523 82.567 128.523 98.9097C128.523 115.937 115.273 128.502 98.9275 128.502ZM115.751 98.9097C115.747 89.6266 109.029 82.1011 99.6189 82.0977C89.6443 82.0931 82.1097 89.6208 82.1051 98.9097C82.1051 108.2 89.6374 115.731 98.9275 115.731C109.006 115.731 115.751 108.2 115.751 98.9097Z"
              fill="#3E7D4C"
            />
          </svg>
        </svg>
      )}
    </button>
  );

  return (
    <Upload
      name="avatar"
      showUploadList={false}
      action={`${process.env.REACT_APP_API_BASE}FileUpload/upload`}
      beforeUpload={beforeUpload}
      onChange={handleChange}>
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="avatar"
          style={{ width: '100px', height: '100px' }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default AvatarUploader;
