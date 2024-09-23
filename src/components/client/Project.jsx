import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import StepOneECO from '../Project/economicViability/StepOneEco';
import StepTwoECO from '../Project/economicViability/StepTwoEco';
import StepThreeEconomic from '../Project/economicViability/StepThreeEco';
import StepFourEconomic from '../Project/economicViability/StepFourEco';
function Project() {
  const { id } = useParams();
  const {
    data: projectData,
    isLoading: isLoadingProject,
    isError,
    error,
  } = useGetProjectByIdQuery(id);
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
  const steps = [
    {
      parentStep: 'generalInfo',
      label: 'General Info',
      icon: <Icon name={'generalInfo'} />,
      children: [
        {
          stepLabel:<p className='mb-4 text-[#1E4A28] text-[22px] font-bold mt-4'>Project Overview</p>,
          content: <GeneralInfoStepOne />,
        },
        {
          stepLabel:<p className='mb-4 text-[#1E4A28] text-[22px] font-bold'>Project Overview</p>,
          content: <GeneralInfoStepTwo />,
        },
        {
          stepLabel:<p className='mb-4 text-[#1E4A28] text-[22px] font-bold'>Project Summary</p>,
          content: <ProjectSummary />,
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
          stepLabel: 'Resource Consumption',
          content: <TechnicalStepTwo />,
        },
        {
          stepLabel: 'Document Uploads',
          content: <TechnicalStepThree />,
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
          content: <StepThreeEconomic />,
        },
        {
          content: <StepFourEconomic />,
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
