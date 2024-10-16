import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '../shared/Icon';
import { FormProvider, useForm } from 'react-hook-form';
import { StepProvider } from '../../context/formContext';
import { useGetProjectByIdQuery } from '../../redux/features/project';

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
import { setProject } from '../../redux/slices/project';
import Button from '../shared/Button';
import StepOneESCO from '../Project/economicViability/ESCOStepOne';
import Teams from '../Project/teams/Teams';
import FinancialSharedSavings from '../Project/economicViability/FinancialSharedSavings';
import Loader from '../shared/Loader';
import { Result } from 'antd';
import EmptyList from '../shared/EmptyList';
import { progress } from 'framer-motion';

function OpportunitiyOverview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: projectData,
    isLoading: isLoadingProject,
    error,
    isError,
  } = useGetProjectByIdQuery(id);

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

  const [canEdit, setCanEdit] = useState(true);

  const ProposalButton = () => (
    <>
      <Button
        hasIcon
        iconPosition="left"
        iconName={'addProject'}
        className={'w-[180px] flex justify-between'}
        variant="blue"
        onClick={() =>
          navigate(`/submit-offer/${id}`, {
            state: { projectId: id },
          })
        }>
        <p>{`Submit Offer`}</p>
      </Button>
    </>
  );
  const steps = [
    {
      parentStep: 'generalInfo',
      label: 'General Info',
      icon: <Icon name={'escoGeneral'} />,
      progress: 10,
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
      progress: 20,
      children: [
        {
          // stepLabel: 'Step 1',
          content: <TechnicalStepOne />,
        },
        {
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
         
          content: <ViabilityStatus data={projectObject} />,
          hideButtons: true,
        },
      ],
    },

    {
      parentStep: 'economicViab',
      label: 'Economic Viability',
      icon: <Icon name={'escoEconomic'} />,
      info: '5 New',
      children: [
        {
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
      info: '3 Members',
      children: [
        {
          content: <Teams />,
          hideButtons: true,
        },
      ],
    },
  ];
  if (isLoadingProject) return <Loader />;
  if (error && error?.status === 403) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="link" to={'/'}>
            Back Home
          </Button>
        }
      />
    );
  } else if (error || isError) {
    return <EmptyList message={error?.message} />;
  }
  return (
    <FormProvider {...methods}>
      <StepProvider steps={steps} canEdit={false}>
        <ESCOProjectOverView steps={steps} />;
      </StepProvider>
    </FormProvider>
  );
}

export default OpportunitiyOverview;
