import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icon from '../shared/Icon';
import { FormProvider, useForm } from 'react-hook-form';
import { StepProvider } from '../../context/formContext';
import { useGetProjectByIdQuery } from '../../redux/features/project';
import Loader from '../shared/Loader';
import EmptyList from '../shared/EmptyList';
import ProjectOverView from '../Project/ProjectOverView';
import GeneralInfoStepOne from '../Project/generalInfo/StepOne';
import GeneralInfoStepTwo from '../Project/generalInfo/StepTwo';
import ProjectSummary from '../Project/generalInfo/StepThree';
import TechnicalStepOne from '../Project/technicalInfo/TechnicalInfoStepOne';
import TechnicalStepTwo from '../Project/technicalInfo/TechnicalInfoStepTwo';
import TechnicalStepThree from '../Project/technicalInfo/TechnicalStepThree';
import StepOneESDD from '../Project/esdd/StepOneESDD';
import StepTwoESDD from '../Project/esdd/StepTwoESDD';
import StepThree from '../Project/esdd/StepThreeESDD';
import StepFour from '../Project/esdd/StepFourESDD';
import StepFive from '../Project/esdd/StepFiveESDD';
import StepOneECO from '../Project/economicviability/StepOneEco';
import StepTwoECO from '../Project/economicviability/StepTwoEco';
import StepThreeECO from '../Project/economicviability/StepThreeEco';
import StepFourECO from '../Project/economicviability/StepFourEco';
import ViabilityStatus from '../Project/technicalInfo/TechnicalResult';
import { useGetProjectProposalsQuery } from '../../redux/features/proposal';
import Button from '../shared/Button';
function Project() {
  const { id } = useParams();
  const navigate = useNavigate();

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
  const {
    reset,
    formState: { errors },
  } = methods;
  useEffect(() => {
    // Reset form with new data when projectData is fetched
    if (projectData) {
      reset(projectData);
    }
  }, [projectData, reset]);
  const { projectObject } = useSelector((state) => state.project);
  const ProposalButton = () => (
    <>
      {data?.length > 0 && (
        <Button
          variant="blue"
          onClick={() =>
            navigate(`/proposals/${projectData?.id}`, {
              state: { projectId: projectData?.id },
            })
          }>
          <div className="w-[20px] h-[20px] bg-[#bbea00] rounded-full mr-2" />
          <p className="">{`${data?.length} Submitted proposals`}</p>
        </Button>
      )}
    </>
  );
  const steps = [
    {
      parentStep: 'generalInfo',
      label: 'General Info',
      icon: <Icon name={'generalInfo'} />,
      children: [
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
        {
          stepLabel: (
            <p className="mb-4 text-[#1E4A28] text-[22px] font-bold">
              Project Summary
            </p>
          ),
          content: <ProjectSummary />,
          stepIcon: <ProposalButton />,
        },
      ],
    },
    {
      parentStep: 'technicalInfo',
      label: 'Technical Info',
      icon: <Icon name={'technicalInfo'} />,
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
          content: <ViabilityStatus data={projectObject} />,
        },
      ],
    },
    {
      parentStep: 'esdd',
      label: 'E&SDD',
      icon: <Icon name={'esdd'} />,
      children: [
        {
          stepLabel: (
            <p className="py-2 border-y border-[#54A967] mb-4 text-[#1E4A28] text-[20px] font-bold">
              Questions on E&S aspects of the proposed project
            </p>
          ),
          content: <StepOneESDD project={projectObject} />,
        },
        {
          stepLabel: (
            <p className="py-2 border-y border-[#54A967] mb-4 text-[#1E4A28] text-[20px] font-bold">
              General questions
            </p>
          ),
          content: <StepTwoESDD />,
        },
        {
          // stepLabel: 'Step 2',
          content: <StepThree />,
        },
        {
          content: <StepFour />,
        },
        {
          // stepLabel: 'Step 2',
          content: <StepFive />,
        },
      ],
    },
    {
      parentStep: 'economicViab',
      label: 'Economic Viability',
      icon: <Icon name={'economic'} />,
      children: [
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
      ],
    },
  ];

  if (isLoadingProject) {
    return <Loader />; // Loading state while data is fetched
  }

  if (isError || !projectData) {
    return <EmptyList message={'Error loading project data'} />; // Error handling
  }
  return (
    <FormProvider {...methods}>
      {/* Wrap StepProvider in FormProvider to access form context */}
      <StepProvider steps={steps}>
        <ProjectOverView steps={steps} />
      </StepProvider>
    </FormProvider>
  );
}

export default Project;
