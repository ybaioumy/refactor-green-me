import React from 'react';
import Select from '../components/shared/Select';
import Steps from '../components/shared/steps';
import Icon from '../components/shared/Icon';
import { useState } from 'react';
import Logo from '../assets/images/greenme.png';
import GreenMeTitle from '../assets/images/GreenMeTitle.png';
import { Link, useSearchParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import {
  useRegisterMutation,
  useGetRolesQuery,
  useGetAllCountriesQuery,
  useGetTypesQuery,
} from '../redux/features/auth';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Button from '../components/shared/Button';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { message, notification } from 'antd';
import useMediaQuery from '../hooks/useMediaQuery';
import { setCredentials } from '../redux/slices/user';
import UserType from '../components/Registeration/StepOne';
import { useJwt } from 'react-jwt';
import UserInformation from '../components/Registeration/StepTwo';
import { Dropdown } from '../components/shared/Dropdown';
import StepThree from '../components/Registeration/StepThree';
function Register() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const { decodedToken, isExpired } = useJwt(token);
  const [registerData, setRegisterData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileChange = (typesId, event) => {
    const file = event.target.files[0];
    if (file) {
      // Determine the key based on typesId
      let key;
      if (typesId === 1) {
        key = 'clientCompanyLogo';
      } else if (typesId === 2) {
        key = 'escoLogo';
      } else {
        // Handle cases where typesId does not match expected values
        console.error('Invalid typesId');
        return;
      }

      // Update the registerData state with the file name
      setRegisterData((prevState) => ({
        ...prevState,
        [key]: file.name,
      }));

      // Create a FileReader to preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const bgColor = useMediaQuery('(max-width: 768px)')
    ? 'green-gradinat'
    : 'bg-[#1D4727]';
  const steps = [
    {
      children: [
        {
          content: (
            <UserType
              registerData={registerData}
              setRegisterData={setRegisterData}
              tokenData={decodedToken}
            />
          ),
        },
        {
          content: (
            <UserInformation
              registerData={registerData}
              tokenData={decodedToken}
            />
          ),
        },
        {
          content: <StepThree registerData={registerData} />,
        },
      ],
    },
  ];
  const methods = useFormContext();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen ${bgColor} py-2 items-center  md:py-0`}>
      <div className="hidden md:flex flex-1 flex-col justify-center items-center gap-10 p-4 md:p-0">
        <img src={Logo} alt="logo" className="w-40 h-auto md:w-52 md:h-auto" />
        <p className="text-white text-2xl font-bold">Green Me</p>
      </div>
      <div className="flex md:hidden flex-col items-center justify-center flex-2 text-white font-abel py-5">
        Welcome To{' '}
        <img src={GreenMeTitle} alt="Logo" width={'50%'} height={'auto'} />
      </div>
      <div className="flex-1 p-4 md:px-10 py-2 flex flex-col bg-white rounded-2xl md:rounded-none w-[95%] md:h-[100vh] overflow-y-auto ">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-[#1d4628]">Create Account</p>
          <div className="relative flex items-center ">
            <input
              id="logoUpload"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(registerData.typesId, e)}
              className="hidden"
            />
            <label
              htmlFor="logoUpload"
              className="cursor-pointer flex items-center text-white px-4 py-2 rounded-md">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Selected Logo"
                  className="h-[70px] w-[70px] rounded-full"
                />
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="70"
                    height="70"
                    viewBox="0 0 198 198"
                    fill="none">
                    <path
                      id="Vector"
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M99.6419 198C44.3235 198 0 153.677 0 99.0006C0 44.3244 44.3235 0 99.6419 0C153.677 0 198 44.3244 198 99.0006C198 153.677 153.677 198 99.6419 198ZM161.234 84.5812C161.234 75.8606 161.234 71.8103 159.533 68.1661C158.041 65.235 155.66 62.8516 152.73 61.3573C149.396 59.6628 145.862 59.6628 136.312 59.6628H131.638L127.95 53.3395C125.321 48.8291 124.006 46.5802 122.175 44.9421C120.554 43.4916 118.649 42.3964 116.579 41.727C114.243 40.9735 112.146 40.9735 106.417 40.9735H91.4331C86.2175 40.9735 83.6131 40.9735 81.2768 41.727C79.2074 42.3964 77.3024 43.4916 75.6816 44.9421C73.8503 46.5802 73.1152 48.8291 69.9058 53.3395L66.2178 59.6628H61.544C52.8222 59.6628 48.4601 59.6628 45.1264 61.3573C42.1942 62.8504 39.8107 65.2339 38.3165 68.1661C36.622 71.8103 36.622 75.8606 36.622 84.5812V121.96C36.622 130.682 36.622 135.043 38.3165 138.376C39.8119 141.305 42.1954 143.687 45.1264 146.006C48.4601 146.879 52.8222 146.879 61.544 146.879H136.312C145.862 146.879 149.396 146.879 152.73 146.006C155.659 143.686 158.04 141.305 159.533 138.376C161.234 135.043 161.234 130.682 161.234 121.96V84.5812ZM98.9275 128.502C82.5836 128.502 69.3329 115.937 69.3329 98.9097C69.3329 82.567 82.5836 69.3187 98.9275 69.3187C115.273 69.3187 128.523 82.567 128.523 98.9097C128.523 115.937 115.273 128.502 98.9275 128.502ZM115.751 98.9097C115.747 89.6266 109.029 82.1011 99.6189 82.0977C89.6443 82.0931 82.1097 89.6208 82.1051 98.9097C82.1051 108.2 89.6374 115.731 98.9275 115.731C109.006 115.731 115.751 108.2 115.751 98.9097Z"
                      fill="#3E7D4C"
                    />
                  </svg>
                </>
              )}
            </label>
          </div>
        </div>
        <Steps steps={steps} hasLink onSave={onSubmit} />
      </div>
    </div>
  );
}

export default Register;
