import React, { useState, useEffect } from 'react';
import { useReponseToProjectInvitationMutation } from '../redux/features/inviteMembers';
import { useGetInvitationStatusQuery } from '../redux/features/inviteMembers';
import Button from '../components/shared/Button';
import useGetItemIdByName from '../hooks/useGetItemIdByName';
import { useSelector, useDispatch } from 'react-redux';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { clearInvitaion } from '../redux/slices/invitaion';
import Loader from '../components/shared/Loader';
import EmptyList from '../components/shared/EmptyList';

const ProjectInvitation = () => {
  const dispatch = useDispatch();
  const [isExpired, setIsExpired] = useState(false);
  const [reponseToProjectInvitation, { isLoading, isError, isSuccess, error }] =
    useReponseToProjectInvitationMutation();
  const {
    data: invitaionStatus,
    isLoading: isLoadingStatus,
    error: errorGettingStatus,
    isError: isErrorStatus,
  } = useGetInvitationStatusQuery();

  const acceptStatusId = useGetItemIdByName(invitaionStatus, 'Accept');
  const declineStatusId = useGetItemIdByName(invitaionStatus, 'Reject');
  const { invitationToken, expiry, typeId, roleId, permissionId } = useSelector(
    (state) => state.invitation
  );
  // console.table(invitationToken, expiry, roleId, permissionId);
  console.table(useSelector((state) => state.invitation));
  useEffect(() => {
    // Check if the invitation is expired
    const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
    if (expiry && currentTime > expiry) {
      setIsExpired(true);
    }
  }, [expiry]);

  const handleResponse = async (isAccept) => {
    const invitationStatusId = isAccept ? acceptStatusId : declineStatusId;

    try {
      // Trigger the mutation and pass in the required parameters
      await reponseToProjectInvitation({
        permissionId: permissionId || null,
        ProjectRoleId: roleId || null,
        typeId,
        isAccept,
        invitationStatusId, // set to acceptStatusId or declineStatusId based on the choice
        invitationToken,
      });
      dispatch(clearInvitaion());
    } catch (error) {
      console.error('Failed to respond to the invitation', error);
    }
  };
  if (isLoadingStatus) return <Loader />;
  if (isErrorStatus)
    return (
      <EmptyList
        message={errorGettingStatus.message || 'some thing went wrong'}
      />
    );

  if (isSuccess) {
    return (
      <Result
        status="success"
        title="Successfully assigned to project"
        extra={[
          <Button type="link" to={'/'} key="console">
            Go Home
          </Button>,
        ]}
      />
    );
  }
  if (isError) {
    return (
      <Result
        status="error"
        title="Submission Failed"
        subTitle={error.message || 'Something went wrong'}
      />
    );
  }
  if (!invitationToken) return null;
  return (
    <div className="flex items-center justify-center flex-col h-[60vh] mt-[5%] w-[70%] mx-auto">
      <h1 className="text-[#505050] text-2xl font-bold">Project Invitation</h1>
      <div className="bg-white rounded-md shadow-md h-full p-4 flex flex-col items-center justify-center">
        {isExpired ? (
          <Result
            status="error"
            title="Invitation Expired"
            subTitle="This invitation has expired and you can no longer respond."
          />
        ) : (
          <Result
            status="info"
            title={
              <p className="text-[#505050] font-bold">
                You have been invited by{' '}
                <span className="text-[#1d4628] text-[22px] font-abel underline">
                  ESCO Name
                </span>{' '}
                to participate in the project{' '}
                <span className="font-bold font-abel text-[22px] underline">
                  ProjectName
                </span>
                . Do you accept?
              </p>
            }
            extra={[
              <Button
                type="primary"
                key="accept"
                onClick={() => handleResponse(true)} // Accepting the invitation
                isLoading={isLoading}
                disabled={isExpired}>
                Accept
              </Button>,
              <Button
                variant="transparent"
                key="reject"
                onClick={() => handleResponse(false)} // Declining the invitation
                isLoading={isLoading}
                disabled={isExpired}>
                Decline
              </Button>,
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectInvitation;
