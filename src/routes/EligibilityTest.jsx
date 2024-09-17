import React, { Children, useState } from 'react';
import Steps from '../components/shared/Steps';
import { useParams } from 'react-router-dom';
import LookingForAudit, {
  SeconedStep,
  ThirdStep,
} from '../components/eligibilitytest/LookingForAudit';
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
import Title from '../components/shared/Title';
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

  const { data: auditResult, isLoading: auditResultLoading } =
    useGetProjectEnergyAuditQuery(createdProjectId, {
      skip: !createdProjectId,
    });
  const [
    triggerGetProjectEligibility,
    {
      data: eligibilityTestResult,
      error: errorEligibilityResult,
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
  const [eligibilityTestData, setEligibilityTestData] = useState({
    projectName: '',
    description: '',
    servedCountryId: null,
    cityId: null,
    economicSectorId: null,
    buildingOrientation: 0,
    buildingTypicalOccupancy: 0,
    buildingIsOccupied: 0,
    lightsAreOn: 0,
    fenestration: 0,
    landArea: 0,
    grossArea: 0,
    noOfFloor: 0,
    consumption: {
      electricityAnnualConsumptionExPost: 0,
      electricityAverageTariffCostExPost: 0,
      naturalGasAnnualConsumptionExPost: 0,
      naturalGasAverageTariffCostExPost: 0,
      dieselAnnualConsumptionExPost: 0,
      dieselAverageTariffCostExPost: 0,
      gasolineAnnualConsumptionExPost: 0,
      gasolineAverageTariffCostExPost: 0,
      waterAnnualConsumptionExPost: 0,
      waterAverageTariffCostExPost: 0,
      electricity: false,
      water: false,
      naturalGas: false,
      diesel: false,
      gasoline: false,
    },
    technicalInfo: {
      buildingFunctionId: null,
    },
    buildingFacadeTypesIds: [],
    lightingSystemTypesIds: [],
    lookingForId: Number(id),
    categoryId: 1,
    SubCriteriaId: null,
    criteriaId: 1,
    eligibiltyStatusId: 3, //intialEligibilityStatusId?.id,
    projectStatusId: 1,
    contractingModelId: null,
    lat: '',
    long: '',
    eligibilty: {
      reductionRate: '',
      exclusions: '',
      totalGenerationCapacity: 0,
      alignedToTheIfcperformance: '',
      projectStandardsCertification: '',
      energyDemand: '',
      carbonIntensity: '',
      improvementActivitiesFossilFuel: '',
      involvedInTheExplorationExtraction: '',
      products: [],
    },
  });
  // console.log('================================', eligibilityTestData);
  if (isLoading) return <Loader />;
  if (!data) return <EmptyList message={'Emty Options'} />;

  const renderSecondStep = {
    1: (
      <Criteria
        eligibilityTestData={eligibilityTestData}
        setEligibilityTestData={setEligibilityTestData}
        categories={data}
      />
    ),
    2: (
      <RenewableEnergy
        categories={data[1]?.crietria}
        setEligibilityTestData={setEligibilityTestData}
        eligibilityTestData={eligibilityTestData}
      />
    ),
    3: (
      <GreenBuildings
        categories={data[2]?.crietria}
        setEligibilityTestData={setEligibilityTestData}
        eligibilityTestData={eligibilityTestData}
      />
    ),
  };

  const renderThirdStep = {
    1: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReductionRate
          options={reductionRateOptions}
          eligibilityTestData={eligibilityTestData}
          setEligibilityTestData={setEligibilityTestData}
        />
        <Exclusions
          options={exclusionsOptions}
          eligibilityTestData={eligibilityTestData}
          setEligibilityTestData={setEligibilityTestData}
        />
      </div>
    ),

    3: (
      <ProjectStandards
        eligibilityTestData={eligibilityTestData}
        setEligibilityTestData={setEligibilityTestData}
      />
    ),
  };
  const lookingFor = eligibilityTestData.lookingForId;
  let steps = [
    {
      children: [
        {
          content: (
            <EnergyEfficiency
              categories={data}
              setEligibilityTestData={setEligibilityTestData}
              eligibilityTestData={eligibilityTestData}
              contractingData={contractingData}
              projectTypeId={Number(id)}
            />
          ),
        },
        {
          content: <>{renderSecondStep[eligibilityTestData.categoryId]}</>,
        },
      ],
    },
  ];
  if (lookingFor === 1) {
    steps = [
      {
        parentStep: 'lookingForAudit',
        label: 'Looking For Audit',
        // icon: <FaSearch />, // Example icon, replace with what you need
        children: [
          {
            stepLabel: 'Step 1',
            content: (
              <LookingForAudit
                setEligibilityTestData={setEligibilityTestData}
                eligibilityTestData={eligibilityTestData}
              />
            ),
          },
          {
            stepLabel: 'Step 2',
            content: (
              <SeconedStep
                setEligibilityTestData={setEligibilityTestData}
                eligibilityTestData={eligibilityTestData}
              />
            ),
          },
        ],
      },
    ];
  }
  if (eligibilityTestData.categoryId !== 2 && lookingFor !== 1) {
    steps.push({
      parentStep: 'additionalInfo',
      label: 'Additional Info',
      icon: <Icon name={'addProjectGreen'} />, // Example icon, replace with what you need
      children: [
        {
          stepLabel: 'Step 3',
          content: (
            <>{renderThirdStep[eligibilityTestData.categoryId] || null}</>
          ),
        },
      ],
    });
  }
  console.log('adsfsdaf');
  // Function 1: Create the project and return the ID
  const createProject = async () => {
    try {
      // Create the project and get the response with the project ID
      const response = await eligibilityTest(eligibilityTestData).unwrap();
      const createdProjectId = response.id;
      setCreactedProjectId(createdProjectId);
      message.success(
        'Project created successfully with id ' + createdProjectId
      );

      return createdProjectId;
    } catch (error) {
      message.error('Failed to create a new project');
      console.error('Error posting project:', error);
      throw error; // Propagate the error
    }
  };

  // Function 2: Handle Energy Audit or Eligibility based on `lookingFor`
  const handleAuditOrEligibility = async (createdProjectId) => {
    try {
      if (lookingFor === 1) {
        // Fetch the energy audit data
        console.log(auditResult);
        // Do something with the energy audit result if needed
      } else {
        // Check eligibility if lookingFor is not 1
        const eligibilityResult = await triggerGetProjectEligibility(
          createdProjectId
        ).unwrap();
        setIsEligible(eligibilityResult);
      }
    } catch (error) {
      message.error('Failed to fetch audit/eligibility data');
      console.error('Error fetching audit/eligibility:', error);
    }
  };

  // Main handleSave function: Calls the two separate functions
  const handleSave = async (data) => {
    try {
      console.log(data);
      // const createdProjectId = await createProject(); // Call the first function to create the project
      // await handleAuditOrEligibility(createdProjectId); // Call the second function to fetch audit/eligibility
    } catch (error) {
      // Handle any errors that propagate from either function
      console.error('Error during save process:', error);
    }
  };
  if (lookingFor === 1 && auditResult != null && auditResult !== undefined) {
    // If lookingFor is 1, show ThirdStep component
    return <ThirdStep data={auditResult} isLoading={auditResultLoading} />;
  }
  if (isEligible !== null) {
    return <EligibilityStatus isEligible={isEligible} id={createdProjectId} />;
  }
  return (
    <div className="flex flex-col p-2 md:p-5 gap-4">
      <>
        <div className="flex justify-between items-start">
          {/* <Title
            text={'New Project Submission'}
            type="h1"
            style={{ color: '#202020', fontSize: 24 }}
          /> */}
          <ChatButton />
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
