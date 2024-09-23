import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RadioButton from '../components/shared/RadioButton';

import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import { FileUploader } from '../components/shared/Upload';
import { message } from 'antd';
import {
  useGetProjectProposalsQuery,
  useGetProposalStatusQuery,
  useClientResponseToProposalMutation,
} from '../redux/features/proposal';
import Loader from '../components/shared/Loader';
import EmptyList from '../components/shared/EmptyList';
import Icon from '../components/shared/Icon';
import { getTimeAgo } from '../utilits/helpers';
function ProposalsPage() {
  const {
    state: { projectId },
  } = useLocation();
  const { data, isLoading, isError } = useGetProjectProposalsQuery(projectId);
  const [
    clientResponseToProposal,
    { isLoading: isSubmitLoading, isSuccess, isError: isErrorSubmitting },
  ] = useClientResponseToProposalMutation();
  const [clientResponse, setClientResponse] = useState({
    id: 0,
    status: true,
    statusId: 1,
  });
  const {
    data: proposalStatus,
    isLoading: statusLoading,
    error: statusError,
  } = useGetProposalStatusQuery();
  if (isLoading || statusLoading) return <Loader />;
  if (isError || statusError) return <EmptyList />;
  const handleSubmit = async () => {
    try {
      const response = await clientResponseToProposal(clientResponse).unwrap();
      message.success(
        `Response for Proposal ${response.data.id} was successfully submitted`
      );
      console.log(response);
    } catch (error) {
      message.error(
        `Error happened during sending response for proposal ${
          error?.data?.exMessage || error?.data?.message
        }`
      );
      console.error('Error submitting client response:', error);
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4 text-[#1E4A28]">
        Estimated Submitted Proposal/s
      </h1>
      <p className="font-bold text-xl">
        This ESCO proposal/s is intended as an initial estimate based on the
        information provided. A more precise cost breakdown and financing
        options will be determined following a comprehensive on-site energy
        audit and further project discussions/studies.
      </p>
      <ul className="list-disc ml-5 mt-4">
        <li>
          Initial Estimate: This proposal serves as a starting point for project
          costs and financing based on current project details.
        </li>
        <li>
          Detailed Audit Required: A comprehensive on-site energy audit will
          provide more accurate data for finalizing project costs and potential
          savings.
        </li>
        <li>
          Further Discussions: Collaborative discussions between you and the
          ESCO may be necessary to refine the proposal based on your specific
          needs and priorities.
        </li>
      </ul>

      <Proposals
        data={data}
        proposalStatus={proposalStatus}
        setClientResponse={setClientResponse}
        clientResponse={clientResponse}
      />

      <div className="mt-6 flex items-center justify-center">
        <Button
          className="w-[200px]"
          variant="secondary"
          onClick={handleSubmit}
          isLoading={isSubmitLoading}>
          SUBMIT
        </Button>
      </div>
      {/* {isErrorSubmitting && <p>{isErrorSubmitting.data.message}</p>} */}
    </div>
  );
}

export default ProposalsPage;

const Proposals = ({
  data,
  proposalStatus,
  setClientResponse,
  clientResponse,
}) => {
  const [activeTab, setActiveTab] = useState(data[0]);

  const { esco } = data[0] || {};
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      const firstProposal = data[0];
      setActiveTab(firstProposal);
      setClientResponse({
        id: firstProposal?.id,
        status: true,
        statusId: 1,
      });
    }
  }, [data, setClientResponse]);

  const handleStatusChange = (e) => {
    const statusId = Number(e.target.value);
    const status = statusId === 1;
    setClientResponse((prevState) => ({
      ...prevState,
      statusId,
      status,
    }));
  };
  const handleTabChange = (item) => {
    setActiveTab(item);
    setClientResponse((prevState) => ({
      ...prevState,
      id: item.id,
    }));
  };
  return (
    <div className="w-[70%]">
      <div className="flex space-x-4 mt-6 border-y border-[#CBCBCB] py-4">
        {data &&
          data?.map((item, idx) => (
            <button
              className={`py-2 px-8 rounded-full bg-[#0050C8] text-white font-bold ${
                activeTab.id === item.id
                  ? 'opacity-100 active-tab'
                  : 'opacity-75'
              }`}
              key={item.id}
              onClick={() => handleTabChange(item)}>
              <p>{`Proposal ${idx + 1}`}</p>
              <p className="text-sm">{getTimeAgo(item.submittedOn)}</p>
            </button>
          ))}
      </div>

      <div className="flex mt-6 items-center gap-10">
        <label htmlFor="esco-name" className="w-[200px] font-bold mr-5">
          Proposal by
        </label>
        <Input
          variant="secondary"
          type="text"
          placeHolder={esco.name || 'ESCO name not available'}
          readOnly
          // value={esco?.name || 'ESCO name not available'}
        />
        <Button
          className="mt-2 py-2 px-4 bg-green-500 text-white"
          onClick={() => navigate(`/esco/${esco.id}`)}>
          More Info About ESCO
        </Button>
      </div>

      <div className="mt-6">
        <FileUploader
          label={'Check proposal and please provide what you would like to do.'}
          disabled={true}
        />
        <div className="mt-4">
          {activeTab.documentSection?.documentFiles?.map((file) => (
            <a
              key={file.id}
              href={file.filePath}
              download
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 underline flex items-center gap-4">
              <p>{file.filePath.split('/').pop()}</p>{' '}
              <Icon name="download" />
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="flex flex-col gap-2">
          {proposalStatus?.slice(0, -1).map((item) => (
            <RadioButton
              label={item.name}
              key={item.id}
              value={`${item.id}`}
              checked={clientResponse.statusId === item.id}
              onChange={handleStatusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
