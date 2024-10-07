import React, { useEffect, useState } from 'react';
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
import { setProject } from '../../redux/slices/project';
import StepOneESCO from '../Project/economicViability/ESCOStepOne';
import Teams from '../Project/teams/Teams';
import FinancialSharedSavings from '../Project/economicViability/FinancialSharedSavings';
import { Result } from 'antd';
import Button from '../shared/Button';
import { progress } from 'framer-motion';
function ProjectESCO() {
  const { id } = useParams();
  const dispatch = useDispatch();
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
  const { reset } = methods;

  useEffect(() => {
    if (projectData) {
      reset(projectData);
      dispatch(setProject(projectData));
    }
  }, [projectData, reset, dispatch, id]);

  const { projectObject } = useSelector((state) => state.project);

  const [canEdit, setCanEdit] = useState(true);
  useEffect(() => {
    if (error?.status === 403) {
      setCanEdit(false);
    } else {
      setCanEdit(true);
    }
  }, [error]);

 const steps = [
   {
     parentStep: 'generalInfo',
     label: 'General Info',
     icon: <Icon name={'escoGeneral'} />,
     progress: 80,
     children: [
       {
         content: (
           <ProjectSummary
             canEdit
             fields={['GeneralInfo.ProjectName', 'GeneralInfo.Description']}
           />
         ),
       },
       {
         stepLabel: (
           <p className="mb-4 text-[#1E4A28] text-[22px] font-bold mt-4">
             Project Overview
           </p>
         ),
         content: (
           <GeneralInfoStepOne
             fields={['GeneralInfo.StartDate', 'GeneralInfo.EndDate']}
           />
         ),
       },
       {
         stepLabel: (
           <p className="mb-4 text-[#1E4A28] text-[22px] font-bold">
             Project Overview
           </p>
         ),
         content: <GeneralInfoStepTwo fields={['GeneralInfo.Location']} />,
       },
     ],
   },
   {
     parentStep: 'technicalInfo',
     label: 'Technical Info',
     icon: <Icon name={'escoTechnical'} />,
     progress: 10,
     children: [
       {
         content: <TechnicalStepOne fields={['TechnicalInfo.EquipmentType']} />,
       },
       {
         stepLabel: (
           <p className="py-2 border-b border-[#54A967] mb-4 text-[#1E4A28] text-[20px] font-bold">
             Resources consumption
           </p>
         ),
         content: (
           <TechnicalStepTwo
             fields={['TechnicalInfo.netmeteringgridelectricitycost']}
           />
         ),
       },
       {
         stepLabel: (
           <p className="py-2 border-b border-[#54A967] mb-4 text-[#1E4A28] text-[20px] font-bold">
             Document Uploads
           </p>
         ),
         content: <TechnicalStepThree fields={['TechnicalInfo.Documents']} />,
       },
       {
         stepLabel: (
           <p className="py-2 border-b border-[#54A967] mb-4 text-[#1E4A28] text-[20px] font-bold">
             Project Impact & Viability
           </p>
         ),
         content: <ViabilityStatus id={id} fields={['TechnicalInfo.Impact']} />,
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
         stepLabel: (
           <p className="py-2 capitalize border-b border-[#54A967] mb-4 text-[#1E4A28] text-[20px] font-bold">
             Energy performance contracts model
           </p>
         ),
         content: (
           <StepOneESCO fields={['EconomicViability.TargetInterestRate']} />
         ),
       },
       {
         content: (
           <StepOneECO fields={['EconomicViability.TargetEquityReturn']} />
         ),
       },
       {
         content: <StepTwoECO fields={['EconomicViability.TargetLoanTerm']} />,
       },
       {
         content: (
           <StepThreeECO fields={['EconomicViability.RepaymentSchedule']} />
         ),
       },
       {
         content: <StepFourECO fields={['EconomicViability.FinalProposal']} />,
       },
       {
         content: (
           <FinancialSharedSavings
             project={projectObject}
             fields={['EconomicViability.Savings']}
           />
         ),
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
         content: <Teams fields={['Teams.TeamMembers']} />,
         hideButtons: true,
       },
     ],
   },
 ];

  if (isLoadingProject) {
    return <Loader />;
  }

  if (error?.status === 403) {
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
  if (!projectData) {
    return <EmptyList message={'Error loading project data'} />;
  }
  return (
    <FormProvider {...methods}>
      <StepProvider steps={steps} canEdit={canEdit}>
        <ESCOProjectOverView steps={steps} />
      </StepProvider>
    </FormProvider>
  );
}

export default ProjectESCO;
