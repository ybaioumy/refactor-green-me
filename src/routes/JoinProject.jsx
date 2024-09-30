import React, { useState } from 'react';
import { useReponseToProjectInvitationMutation } from '../redux/features/inviteMembers';
import { useGetInvitationStatusQuery } from '../redux/features/inviteMembers';
import Button from '../components/shared/Button';
import useGetItemIdByName from '../hooks/useGetItemIdByName';
import { useSelector } from 'react-redux';
const ProjectInvitation = ({
  permissionId,
  roleId,
  typeId,
  invitationToken,
  invitationStatusId,
}) => {
  const [response, setResponse] = useState(null);
  const [reponseToProjectInvitation, { isLoading, isError, isSuccess }] =
    useReponseToProjectInvitationMutation();
  const { data: invitaionStatus, isLoading: isLoadingStatus } =
    useGetInvitationStatusQuery();
  const acceptId = useGetItemIdByName(invitaionStatus, 'Accept');
  const declineId = useGetItemIdByName(invitaionStatus, 'Reject');
    const { invtationToken } = useSelector((state) => state.auth);
    console.log(invitationToken);
  const handleResponse = async (isAccept) => {
    setResponse(isAccept);

    try {
      // Trigger the mutation and pass in the required parameters
      await reponseToProjectInvitation({
        permissionId, //
        roleId,
        typeId,
        isAccept,
        invitationStatusId,
        invitationToken,
      });
    } catch (error) {
      console.error('Failed to respond to the invitation', error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col h-[60vh] mt-[5%] w-[70%] mx-auto">
      <h1 className="text-[#505050] text-2xl font-bold">Project Invitation</h1>
      <div className="bg-white rounded-md shadow-md h-full p-4 flex flex-col items-center justify-center">
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
        <div className="flex flex-col w-full h-full justify-center gap-4">
          <Button
            disabled={isLoading}
            className={`${response === 'yes' ? 'selected' : ''}`}
            onClick={() => handleResponse(true)} // True for Yes
          >
            Yes
          </Button>
          <Button
            variant="transparent"
            disabled={isLoading}
            className={`${response === 'no' ? 'selected' : ''} bg-[#D90000]`}
            onClick={() => handleResponse(false)} // False for No
          >
            No
          </Button>
        </div>
      </div>

      {isSuccess && <p>Response submitted successfully!</p>}
      {isError && <p>There was an error submitting your response.</p>}
    </div>
  );
};

export default ProjectInvitation;
