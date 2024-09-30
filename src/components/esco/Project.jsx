import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '../shared/Icon';
import { FormProvider, useForm } from 'react-hook-form';
import { StepProvider } from '../../context/formContext';
import { useGetProjectByIdQuery } from '../../redux/features/project';
import Loader from '../shared/Loader';
import EmptyList from '../shared/EmptyList';
import ESCOProjectOverView from './ESCOProjectOverview';
import GeneralInfoStepOne from '../Project/generalInfo/StepOne';
import GeneralInfoStepTwo from '../Project/generalInfo/StepTwo';
import ProjectSummary from '../Project/generalInfo/StepThree';
import TechnicalStepOne from '../Project/technicalInfo/TechnicalInfoStepOne';
import TechnicalStepTwo from '../Project/technicalInfo/TechnicalInfoStepTwo';
import TechnicalStepThree from '../Project/technicalInfo/TechnicalStepThree';

import StepOneECO from '../Project/economicViability/StepOneEco';
import StepTwoECO from '../Project/economicViability/StepTwoEco';
import StepThreeECO from '../Project/economicViability/StepThreeEco';
import StepFourECO from '../Project/economicViability/StepFourEco';
import ViabilityStatus from '../Project/technicalInfo/TechnicalResult';
import { useGetProjectProposalsQuery } from '../../redux/features/proposal';
import { setProject } from '../../redux/slices/project';
import Button from '../shared/Button';
import StepOneESCO from '../Project/economicViability/ESCOStepOne';
import Teams from '../Project/teams/Teams';
import FinancialSharedSavings from '../Project/economicViability/FinancialSharedSavings';
function ProjectESCO() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  const {
    data: projectData,
    isLoading: isLoadingProject,
    isError,
    error,
  } = useGetProjectByIdQuery(id);
  const {
    data,
    isLoading: isLoadingProposals,
    isError: isErrorProposals,
  } = useGetProjectProposalsQuery(id);
  const methods = useForm({
    defaultValues: {},
    mode: 'onChange',
  });
  const { reset } = methods;

  useEffect(() => {
    if (projectData) {
      reset(projectData);
      dispatch(setProject(projectData));
    }
  }, [projectData, reset, dispatch, id]);

  const { projectObject } = useSelector((state) => state.project);
  // console.log(projectObject);
  const ProposalButton = () => (
    <>
      {data?.length > 0 ? (
        <Button
          className={'w-[100px]'}
          isLoading={isLoadingProposals}
          variant="blue"
          onClick={() =>
            navigate(`/proposals/${projectData?.id}`, {
              state: { projectId: projectData?.id },
            })
          }>
          <div className="w-[20px] h-[20px] bg-[#bbea00] rounded-full mr-2" />
          <p className={''}>{`${data?.length} Submitted proposals`}</p>
        </Button>
      ) : null}
    </>
  );
  const steps = [
    {
      parentStep: 'generalInfo',
      label: 'General Info',
      icon: <Icon name={'escoGeneral'} />,
      children: [
        {
          content: <ProjectSummary />,
          stepIcon: <ProposalButton />,
        },
        {
          stepLabel: (
            <p className="mb-4 text-[#1E4A28] text-[22px] font-bold mt-4">
              Project Overview
            </p>
          ),
          content: <GeneralInfoStepOne />,
          stepIcon: <ProposalButton />,
        },
        {
          stepLabel: (
            <p className="mb-4 text-[#1E4A28] text-[22px] font-bold">
              Project Overview
            </p>
          ),
          content: <GeneralInfoStepTwo />,
          stepIcon: <ProposalButton />,
        },
      ],
    },
    {
      parentStep: 'technicalInfo',
      label: 'Technical Info',
      icon: <Icon name={'escoTechnical'} />,
      children: [
        {
          // stepLabel: 'Step 1',
          content: <TechnicalStepOne />,
        },
        {
          stepLabel: (
            <p className="py-2 border-b border-[#54A967] mb-4 text-[#1E4A28] text-[20px] font-bold">
              Resources consumption
            </p>
          ),
          content: <TechnicalStepTwo />,
        },
        {
          stepLabel: (
            <p className="py-2 border-b border-[#54A967] mb-4 text-[#1E4A28] text-[20px] font-bold">
              Document Uploads{' '}
            </p>
          ),
          content: <TechnicalStepThree />,
        },
        {
          stepLabel: (
            <p className="py-2 border-b border-[#54A967] mb-4 text-[#1E4A28] text-[20px] font-bold">
              Project Impact & Viability
            </p>
          ),
          content: <ViabilityStatus id={id} />,
          hideButtons: true,
        },
      ],
    },

    {
      parentStep: 'economicViab',
      label: 'Economic Viability',
      icon: <Icon name={'escoEconomic'} />,
      children: [
        {
          stepLabel: (
            <p className="py-2 capitalize border-b border-[#54A967] mb-4 text-[#1E4A28] text-[20px] font-bold">
              energy performance contracts model
            </p>
          ),
          content: <StepOneESCO />,
        },
        {
          content: <StepOneECO />,
        },
        {
          content: <StepTwoECO />,
        },
        {
          content: <StepThreeECO />,
        },
        {
          content: <StepFourECO />,
        },
        {
          content: <FinancialSharedSavings project={projectObject} />,
          hideButtons: true,
        },
      ],
    },
    {
      parentStep: 'teams',
      label: 'Teams & Invitations',
      icon: <Icon name={'escoTeams'} />,
      children: [
        {
          content: <Teams />,
          hideButtons: true,
        },
      ],
    },
  ];

  if (isLoadingProject) {
    return <Loader />;
  }

  if (!projectData) {
    return <EmptyList message={'Error loading project data'} />;
  }
  if (isError || error || isErrorProposals)
    return <EmptyList message={error.message} />;
  return (
    <FormProvider {...methods}>
      <StepProvider steps={steps}>
        <ESCOProjectOverView steps={steps} />
      </StepProvider>
    </FormProvider>
  );
}

export default ProjectESCO;
