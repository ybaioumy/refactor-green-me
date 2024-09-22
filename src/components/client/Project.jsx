import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Icon from '../shared/Icon';
import ProjectOverView from '../Project/ProjectOverView';
import GeneralInfoStepOne from '../Project/generalInfo/StepOne';
import GeneralInfoStepTwo from '../Project/generalInfo/StepTwo';
import ProjectSummary from '../Project/generalInfo/StepThree';
import { FormProvider, useForm } from 'react-hook-form';
import { StepProvider } from '../../context/formContext';
import { useGetProjectByIdQuery } from '../../redux/features/project';
import Loader from '../shared/Loader';
import EmptyList from '../shared/EmptyList';
import TechnicalStepOne from '../Project/technicalInfo/TechnicalInfoStepOne';
import TechnicalStepTwo from '../Project/technicalInfo/TechnicalInfoStepTwo';
import TechnicalStepThree from '../Project/technicalInfo/TechnicalStepThree';
import StepOneESDD from '../Project/esdd/StepOneESDD';
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

  const steps = [
    {
      parentStep: 'generalInfo',
      label: 'General Info',
      icon: <Icon name={'generalInfo'} />,
      children: [
        {
          stepLabel: 'Project Overview',
          content: <GeneralInfoStepOne />,
        },
        {
          stepLabel: 'Project Overview',
          content: <GeneralInfoStepTwo />,
        },
        {
          stepLabel: 'Project Overview',
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
          stepLabel: 'Questions on E&S aspects of the proposed project',
          content: <StepOneESDD />,
        },
        {
          stepLabel: 'Step 2',
          content: <div>General Info - Step 2 content here</div>,
        },
        {
          stepLabel: 'Step 2',
          content: <div>General Info - Step 2 content here</div>,
        },
        {
          stepLabel: 'Step 2',
          content: <div>General Info - Step 2 content here</div>,
        },
        {
          stepLabel: 'Step 2',
          content: <div>General Info - Step 2 content here</div>,
        },
      ],
    },
    {
      parentStep: 'economicViab',
      label: 'Economic Viability',
      icon: <Icon name={'economic'} />,
      children: [
        {
          stepLabel: 'Step 1',
          content: (
            <div className="font-abel font-bold">
              General Info - Step 1 content here
            </div>
          ),
        },
        {
          stepLabel: 'Step 2',
          content: <div>General Info - Step 2 content here</div>,
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
