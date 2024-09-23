import React, { Children, useState } from 'react';
import Steps from '../components/shared/Steps';
import { useParams } from 'react-router-dom';
import LookingForAudit from '../components/eligibilitytest/LookingForAudit';
import SeconedStep from '../components/eligibilitytest/lookingforaudit/SecondStep';

import EnergyEfficiency, {
  Criteria,
  ReductionRate,
  Exclusions,
} from '../components/eligibilitytest/energyEfficiency';
import RenewableEnergy from '../components/eligibilitytest/renableEnergy';
import GreenBuildings, {
  ProjectStandards,
} from '../components/eligibilitytest/greenBuildings';
import ChatButton from '../components/shared/ChatBot';
import EligibilityStatus from '../components/eligibilitytest/EligibiltyResult';
import { message } from 'antd';
import {
  useEligibilityTestMutation,
  useGetAllCategoriesWithCrietriaQuery,
  useGetAllContractingModelsQuery,
  useGetEligibilityStatusQuery,
} from '../redux/features/eligibility';
import Loader from '../components/shared/Loader';
import EmptyList from '../components/shared/EmptyList';
import {
  useGetAllProjectsQuery,
  useLazyGetProjectEligibilityQuery,
  useGetProjectStatusQuery,
  useGetProjectEnergyAuditQuery,
} from '../redux/features/project';
import Icon from '../components/shared/Icon';
import AuditResult from '../components/eligibilitytest/lookingforaudit/LookingforAuditResult';
import { useSelector } from 'react-redux';
const reductionRateOptions = [
  { value: '<30%', label: '< 30%' },
  { value: '30%-50%', label: '> 30% and < 50%' },
  { value: '50%-70%', label: '> 50% and < 70%' },
  { value: '>70%', label: '> 70%' },
];
const exclusionsOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
];

const EligibilityTest = () => {
  const { id } = useParams();
  const [createdProjectId, setCreactedProjectId] = useState(null);
  const [isEligible, setIsEligible] = useState(null);
  const { categoryId, criteriaId } = useSelector((state) => state.eligibility);

  //APIs
  const {
    data: eligibilityStatus,
    isLoading: isLoadingStatus,
    isError: isErrorStatus,
  } = useGetEligibilityStatusQuery();
  const {
    data: projectStatus,
    isLoading: isLoadingProjectStatus,
    isError: isErrorProjectStatus,
  } = useGetProjectStatusQuery();

  const { data, isLoading, error } = useGetAllCategoriesWithCrietriaQuery();
  const { data: contractingData } = useGetAllContractingModelsQuery();
  const [eligibilityTest, { isError, isLoading: isProjectELigibleLoading }] =
    useEligibilityTestMutation();

  const {
    data: auditResult,
    isLoading: auditResultLoading,
    isError: isErrorAuditResult,
  } = useGetProjectEnergyAuditQuery(createdProjectId, {
    skip: !createdProjectId,
  });
  const [
    triggerGetProjectEligibility,
    {
      data: eligibilityTestResult,
      isError: isErrorEligibilityResult,
      isLoading: isLoadingEligibiltyResult,
    },
  ] = useLazyGetProjectEligibilityQuery();

  //end of APIs
  const intialEligibilityStatusId = eligibilityStatus?.find(
    (item) => item.name === 'Eligible'
  ).id;
  const intialProjectStatusId = projectStatus?.find(
    (project) => project.name === 'Inquiry Received'
  )?.id;
  // const [eligibilityTestData, setEligibilityTestData] = useState({
  //   projectName: '',
  //   description: '',
  //   servedCountryId: null,
  //   cityId: null,
  //   economicSectorId: null,
  //   buildingOrientation: 0,
  //   buildingTypicalOccupancy: 0,
  //   buildingIsOccupied: 0,
  //   lightsAreOn: 0,
  //   fenestration: 0,
  //   landArea: 0,
  //   grossArea: 0,
  //   noOfFloor: 0,
  //   consumption: {
  //     electricityAnnualConsumptionExPost: 0,
  //     electricityAverageTariffCostExPost: 0,
  //     naturalGasAnnualConsumptionExPost: 0,
  //     naturalGasAverageTariffCostExPost: 0,
  //     dieselAnnualConsumptionExPost: 0,
  //     dieselAverageTariffCostExPost: 0,
  //     gasolineAnnualConsumptionExPost: 0,
  //     gasolineAverageTariffCostExPost: 0,
  //     waterAnnualConsumptionExPost: 0,
  //     waterAverageTariffCostExPost: 0,
  //     electricity: false,
  //     water: false,
  //     naturalGas: false,
  //     diesel: false,
  //     gasoline: false,
  //   },
  //   technicalInfo: {
  //     buildingFunctionId: null,
  //   },
  //   buildingFacadeTypesIds: [],
  //   lightingSystemTypesIds: [],
  //   lookingForId: Number(id),
  //   categoryId: 1,
  //   SubCriteriaId: null,
  //   criteriaId: 1,
  //   eligibiltyStatusId: 3, //intialEligibilityStatusId?.id,
  //   projectStatusId: 1,
  //   contractingModelId: null,
  //   lat: '',
  //   long: '',
  //   eligibilty: {
  //     reductionRate: '',
  //     exclusions: '',
  //     totalGenerationCapacity: 0,
  //     alignedToTheIfcperformance: '',
  //     projectStandardsCertification: '',
  //     energyDemand: '',
  //     carbonIntensity: '',
  //     improvementActivitiesFossilFuel: '',
  //     involvedInTheExplorationExtraction: '',
  //     products: [],
  //   },
  // });

  if (isLoading) return <Loader />;
  if (!data) return <EmptyList message={'Emty Options'} />;

  const renderSecondStep = {
    1: <Criteria categories={data} />,
    2: <RenewableEnergy categories={data[1]?.crietria} />,
    3: <GreenBuildings categories={data[2]?.crietria} />,
  };

  const renderThirdStep = {
    1: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReductionRate options={reductionRateOptions} />
        <Exclusions options={exclusionsOptions} />
      </div>
    ),

    3: <ProjectStandards />,
  };
  const lookingFor = Number(id);
  let steps = [
    {
      label: 'New Project Submission ',
      icon: <ChatButton />, // Example icon, replace with what you need
      children: [
        {
          parentStep: 'energyEfficiency',
          childLabel: 'Select Project Category',
          content: (
            <EnergyEfficiency
              categories={data}
              contractingData={contractingData}
              projectTypeId={Number(id)}
            />
          ),
        },
        {
          childLabel: 'Select Project Criteria',
          content: <>{renderSecondStep[categoryId]}</>,
        },
      ],
    },
  ];
  if (lookingFor === 1) {
    steps = [
      {
        children: [
          {
            stepLabel: 'Step 1',
            content: <LookingForAudit />,
          },
          {
            stepLabel: 'Step 2',
            content: <SeconedStep />,
          },
        ],
      },
    ];
  }
  if (categoryId !== 2 && lookingFor !== 1) {
    steps.push({
      children: [
        {
          // childLabel: 'Select Project Criteria',
          content: <>{renderThirdStep[categoryId] || null}</>,
        },
      ],
    });
  }
  const createProject = async (data) => {
    try {
      // Create the project and get the response with the project ID
      const response = await eligibilityTest(data).unwrap();
      const createdProjectId = response.id;
      setCreactedProjectId(createdProjectId);
      message.success(
        'Project created successfully with id ' + createdProjectId
      );

      // Explicitly return the createdProjectId
      return createdProjectId;
    } catch (error) {
      message.error('Failed to create a new project');
      console.error('Error posting project:', error);
      return null; // Return null on failure to ensure downstream logic handles it
    }
  };

  const handleAuditOrEligibility = async (createdProjectId) => {
    try {
      if (!createdProjectId) {
        throw new Error(
          'Invalid project ID: Cannot proceed with audit or eligibility check.'
        );
      }

      if (lookingFor === 1) {
        console.log(auditResult);
      } else {
        const eligibilityResult = await triggerGetProjectEligibility(
          createdProjectId
        ).unwrap();
        setIsEligible(eligibilityResult || false);
        console.log(isEligible);
      }
    } catch (error) {
      message.error('Failed to fetch audit/eligibility data');
      console.error('Error fetching audit/eligibility:', error);
    }
  };

  // Main handleSave function: Calls the two separate functions
  const handleSave = async (data) => {
    try {
      const createdProjectId = await createProject(data); // Create the project
      if (!createdProjectId) {
        message.error('Project creation failed, cannot proceed further.');
        return; // Stop the flow if the project ID is null
      }
      await handleAuditOrEligibility(createdProjectId); // Fetch audit/eligibility data
    } catch (error) {
      // Handle any errors that propagate from either function
      console.error('Error during save process:', error);
    }
  };

  // Render logic
  if (lookingFor === 1 && auditResult != null && auditResult !== undefined) {
    // If lookingFor is 1, show ThirdStep component
    return (
      <AuditResult
        data={auditResult}
        isLoading={auditResultLoading}
        isError={isErrorAuditResult}
      />
    );
  }

  if (isEligible !== null) {
    return <EligibilityStatus isEligible={isEligible} id={createdProjectId} />;
  }

  return (
    <div className="flex flex-col p-2 md:p-5 gap-4">
      <>
        <div className="grid place-content-end w-full">
          {/* <Title
            text={'New Project Submission'}
            type="h1"
            style={{ color: '#202020', fontSize: 24 }}
          /> */}
        </div>
        <Steps
          steps={steps}
          onSave={handleSave}
          isLoading={isProjectELigibleLoading || isLoadingEligibiltyResult}
        />
      </>
    </div>
  );
};
export default EligibilityTest;
