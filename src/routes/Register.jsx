import React from 'react';
import Steps from '../components/shared/Steps';
import { useState, useEffect } from 'react';
import Logo from '../assets/images/greenme.png';
import GreenMeTitle from '../assets/images/GreenMeTitle.png';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useRegisterMutation, useGetRolesQuery } from '../redux/features/auth';
import { message, Upload } from 'antd';
import useMediaQuery from '../hooks/useMediaQuery';
import UserType from '../components/Registeration/StepOne';
import { useJwt } from 'react-jwt';
import UserInformation from '../components/Registeration/StepTwo';
import StepThree from '../components/Registeration/StepThree';
import Loader from '../components/shared/Loader';
import EmptyList from '../components/shared/EmptyList';
import useGetItemIdByName from '../hooks/useGetItemIdByName';
import { useGetInvitationStatusQuery } from '../redux/features/inviteMembers';
import { useDispatch } from 'react-redux';
import { setInvitaion } from '../redux/slices/invitaion';

import AvatarUploader from '../components/shared/Avatar';
function Register() {
  const dispatch = useDispatch();
  const {
    data: roles,
    isLoading: isLoadingRoles,
    isError,
  } = useGetRolesQuery();
  const {
    data: invitationStatus,
    isLoading: isLoadingStatus,
    error: errorInvitaionStatus,
  } = useGetInvitationStatusQuery();
  const initialRoleId = useGetItemIdByName(roles, 'admin');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('encryptedData');
  const { decodedToken } = useJwt(token);
  const initialInvitaionStatusId = useGetItemIdByName(
    invitationStatus,
    'pending'
  );
  const [registerData, setRegisterData] = useState({
    gender: 1,
    statusId: 1,
    invitationStatusId: null,
    permissionId: [],
    clientId: null,
    invitationToken: '',
    ProjectRoleId: initialRoleId,
    escoId: null,
  });

  useEffect(() => {
    if (decodedToken) {
      setRegisterData((prevData) => ({
        ...prevData,
        invitationToken: decodedToken.InvitationToken || '',
        roleId: decodedToken.RoleId || initialRoleId,
        invitationStatusId: initialInvitaionStatusId,
        ...(decodedToken.EscoId ? { escoId: Number(decodedToken.EscoId) } : {}),
        ...(decodedToken.ClientId
          ? { clientId: Number(decodedToken.EscoId) }
          : {}),
        ...(decodedToken.ExpertId
          ? { expertId: Number(decodedToken.EscoId) }
          : {}),
      }));
      dispatch(
        setInvitaion({
          invitationToken: decodedToken.InvitationToken,
          email: decodedToken.Email || null,
          expiry: decodedToken.exp || null,
          typeId: decodedToken.TypeId || null,
          roleId: decodedToken.RoleId || null,
          permissionId: decodedToken.PermissionId || null,
          ...(decodedToken.EscoId
            ? { escoId: Number(decodedToken.EscoId) }
            : {}),
          ...(decodedToken.ClientId
            ? { clientId: Number(decodedToken.EscoId) }
            : {}),
          ...(decodedToken.ExpertId
            ? { expertId: Number(decodedToken.EscoId) }
            : {}),
        })
      );
    }
  }, [decodedToken, dispatch, initialInvitaionStatusId, initialRoleId]);

  const [registerMutation, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const bgColor = useMediaQuery('(max-width: 768px)')
    ? 'green-gradinat'
    : 'bg-[#1D4727]';
  const steps = [
    {
      children: [
        {
          content: <UserType tokenData={decodedToken} />,
        },
        {
          content: <UserInformation tokenData={decodedToken} />,
        },
        {
          content: <StepThree tokenData={decodedToken} />,
        },
      ],
    },
  ];
  const handleUploadSuccess = (filePath) => {
    setRegisterData((prevData) => ({
      ...prevData,
      photo: filePath,
    }));
  };
  const onSubmit = async (data) => {
    const dataToSend = { ...registerData, ...data };
    try {
      const response = await registerMutation(dataToSend).unwrap();
      message.success('Registration successful');
      setTimeout(() => {
        navigate('/');
      }, 200);
    } catch (error) {
      console.error(error);
      message.error(error.data.message || 'Registration failed');
    }
  };
  if (isLoadingRoles) return <Loader />;
  if (isError) return <EmptyList message={'Some Thing Went Wrong'} />;
  return (
    <div
      className={`flex flex-col md:flex-row min-h-screen ${bgColor} py-2 items-center  md:py-0`}>
      <div className="hidden md:flex flex-1 flex-col justify-center items-center gap-10 p-4 md:p-0">
        <img src={Logo} alt="logo" className="w-40 h-auto md:w-44 md:h-auto" />
        <p className="text-white text-2xl font-bold">Green Me</p>
      </div>
      <div className="flex md:hidden flex-col items-center justify-center flex-2 text-white font-abel py-5">
        Welcome To{' '}
        <img src={GreenMeTitle} alt="Logo" width={'50%'} height={'auto'} />
      </div>
      <div className="flex-1 p-4 md:px-10 py-2 flex flex-col bg-white rounded-2xl md:rounded-none w-[95%] md:h-[100vh] overflow-y-auto ">
        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-[#1d4628]">Create Account</p>
          <AvatarUploader onUploadSuccess={handleUploadSuccess} />
        </div>
        <Steps
          steps={steps}
          hasLink
          onSave={onSubmit}
          isLoading={isLoading || isLoadingStatus}
        />
      </div>
    </div>
  );
}

export default Register;
