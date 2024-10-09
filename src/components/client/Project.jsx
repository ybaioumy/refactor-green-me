import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Icon from '../shared/Icon';
import { FormProvider, useForm } from 'react-hook-form';
import { StepProvider } from '../../context/formContext';
import { useGetProjectByIdQuery } from '../../redux/features/project';
import Loader from '../shared/Loader';
import EmptyList from '../shared/EmptyList';
import ProjectOverView from './ProjectOverView';
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
import StepThreeECO from '../Project/economicViability/StepThreeEco';
import StepFourECO from '../Project/economicViability/StepFourEco';
import ViabilityStatus from '../Project/technicalInfo/TechnicalResult';
import { useGetProjectProposalsQuery } from '../../redux/features/proposal';
import Button from '../shared/Button';
import { setProject } from '../../redux/slices/project';
import FinancialSharedSavings from '../Project/economicViability/FinancialSharedSavings';
function Project() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    mode: 'onChange',
  });
  const {
    reset,
    formState: { errors },
  } = methods;
  useEffect(() => {
    if (projectData) {
      reset(projectData);
      dispatch(setProject(projectData));
    }
  }, [projectData, reset, dispatch, id]);

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
          content: <ProjectSummary canEdit={true} />,
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
          content: (
            <TechnicalStepOne fields={['TechnicalInfo.EquipmentType']} />
          ),
        },
        {
          stepLabel: (
            <p className="py-2 border-b border-[#54A967] mb-4 text-[#1E4A28] text-[20px] font-bold">
              Resources consumption
            </p>
          ),
          content: (
            <TechnicalStepTwo
              fields={['TechnicalInfo.NetMeteringGridElectricityCost']}
            />
          ),
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
          content: <ViabilityStatus id={projectObject.id} />,
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
          content: <StepOneECO fields={['EconomicViability.capex']} />,
        },
        {
          content: <StepTwoECO fields={['EconomicViability.opex']} />,
        },
        {
          content: (
            <StepThreeECO
              fields={[
                'EconomicViabilty.TargetLoanTerm',
                'EconomicViabilty.TargetEquityReturn',
                'EconomicViabilty.TargetInterestRate',
                'EconomicViabilty.LoanToCostRatio',
              ]}
            />
          ),
        },
        {
          content: (
            <StepFourECO
              fields={[
                'EconomicViabilty.OpexAnnualEscalation',
                'EconomicViabilty.AnnualGeneralInflation',
                'EconomicViabilty.TaxRate',
              ]}
            />
          ),
        },
        {
          content: <FinancialSharedSavings project={projectObject} />,
          hideButtons: true,
        },
      ],
    },
  ];

  if (isLoadingProject) {
    return <Loader />;
  }

  if (isError || !projectData) {
    return <EmptyList message={'Error loading project data'} />;
  }
  return (
    <FormProvider {...methods}>
      <StepProvider steps={steps} canEdit={true}>
        <ProjectOverView steps={steps} />
      </StepProvider>
    </FormProvider>
  );
}

export default Project;
