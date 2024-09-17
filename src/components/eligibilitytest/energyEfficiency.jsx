import Icon from '../shared/Icon';
import classNames from 'classnames';
import Title from '../shared/Title';
import RadioButton from '../shared/RadioButton';
const AccordionItem = ({
  item,
  eligibilityTestData,
  setEligibilityTestData,
}) => {
  const isOpen = eligibilityTestData.criteriaId === item.id;

  const toggleAccordion = () => {
    setEligibilityTestData((prevState) => ({
      ...prevState,
      criteriaId: isOpen ? null : item.id, // Close if clicked again, otherwise open
    }));
  };

  return (
    <div className="accordion-item border-t-2 border-[#CDCDCD] w-full">
      <div className="py-5 cursor-pointer" onClick={toggleAccordion}>
        <div className="flex gap-3 items-center">
          <div
            className={classNames(
              'rounded-md p-2 transition-colors duration-500',
              {
                'green-gradinat': isOpen,
                'gray-gradiant': !isOpen,
              }
            )}>
            <div
              className={classNames(
                'transform transition-transform duration-500',
                {
                  'rotate-180': isOpen,
                }
              )}>
              <Icon name={'arrow-up'} />
            </div>
          </div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
        </div>
      </div>
      {item.children && (
        <div
          className={classNames(
            'accordion-body ml-5 mb-5 flex flex-col gap-2 transition-all duration-500',
            {
              'max-h-0 overflow-hidden': !isOpen,
              'max-h-[230px] md:max-h-[300px] lg:max-h-[400px]': isOpen,
            }
          )}>
          {item.children.map((child) => (
            <RadioButton
              key={child.id}
              label={child.name}
              value={`${child.id}`}
              checked={eligibilityTestData.SubCriteriaId === child.id}
              onChange={(e) => {
                setEligibilityTestData((prevState) => ({
                  ...prevState,
                  SubCriteriaId: Number(e.target.value),
                }));
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function EnergyEfficiency({
  categories,
  eligibilityTestData,
  setEligibilityTestData,
  contractingData,
  projectTypeId,
}) {
  const handleCategoryChange = (e) => {
    const newCategory = Number(e.target.value);

    // Reset eligibility values when criteriaId changes
    setEligibilityTestData((prevState) => ({
      ...prevState,
      categoryId: newCategory,
      SubCriteriaId: 0, // Reset SubCriteriaId
      criteriaId: 0, // Reset criteriaId
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
    }));
  };
  const handleCriteriaChange = (e) => {
    const newCriteria = Number(e.target.value);

    // Reset  eligibility values when criteriaId changes
    setEligibilityTestData((prevState) => ({
      ...prevState,
      criteriaId: newCriteria,
      SubCriteriaId: 0, // Reset SubCriteriaId
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
    }));
  };
  return (
    <>
      {projectTypeId && projectTypeId === 2 ? (
        <div className="mb-10 w-full">
          <Title
            type="h1"
            text="1. Select Contracting Model "
            style={{ fontSize: 24 }}
          />
          <div className="flex gap-5 mt-5">
            {contractingData?.map((item) => (
              <div
                className="py-4 pl-2 pr-5 border border-[#C7C7C7] w-[250px] rounded-[18px]"
                key={item.id}>
                <RadioButton
                  className={'text-[#1E4A28] font-bold flex items-center' }
                  variant="green"
                  label={item.name}
                  value={`${item.id}`}
                  checked={eligibilityTestData.contractingModelId === item.id}
                  onChange={(e) => {
                    setEligibilityTestData((prevState) => ({
                      ...prevState,
                      contractingModelId: Number(e.target.value),
                    }));
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {projectTypeId === 2 ? (
        <div className="mb-5 w-full">
          <Title
            type="h1"
            text="2.Submit Your Project "
            style={{ fontSize: 24 }}
          />
        </div>
      ) : null}
      <div className="flex flex-wrap justify-between gap-10 bg-card rounded-lg p-5 min-h-[400px] w-full">
        {categories.map((item, idx) => (
          <div
            className={`flex flex-col gap-2 w-full sm:w-[48%] md:w-[32%] lg:w-[24%] my-2${
              eligibilityTestData.categoryId !== item.id && 'opacity-50'
            }`}
            key={item.id}>
            <RadioButton
              label={item.name}
              value={`${item.id}`}
              checked={eligibilityTestData.categoryId === item.id}
              onChange={handleCategoryChange}
            />

            <div className="bg-[#FFFFFF] flex flex-col ml-2 p-2 justify-between rounded-lg">
              {item.crietria.map((child, idx) => (
                <div className="item-list" key={child.id}>
                  <RadioButton
                    label={child.name}
                    value={`${child.id}`}
                    checked={eligibilityTestData.criteriaId === child.id}
                    onChange={handleCriteriaChange}
                    key={child.id}
                    disabled={eligibilityTestData.categoryId !== item.id}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EnergyEfficiency;

export const Criteria = ({
  categories,
  setEligibilityTestData,
  eligibilityTestData,
}) => {
  const selectedCategory = categories.find(
    (category) => category.id === eligibilityTestData.categoryId
  );
  return (
    <>
      {selectedCategory?.crietria.map((subCategory) => (
        <AccordionItem
          key={subCategory.id}
          item={subCategory}
          eligibilityTestData={eligibilityTestData}
          setEligibilityTestData={setEligibilityTestData}
        />
      ))}
    </>
  );
};

export const ReductionRate = ({
  options,
  setEligibilityTestData,
  eligibilityTestData,
}) => {
  const {
    eligibilty: { reductionRate },
  } = eligibilityTestData || {};

  return (
    <div className="p-4 bg-[#E8F5EB] border rounded-lg min-h-[400px]">
      <h2 className="text-lg font-bold">Reduction Rate</h2>
      <p>Energy Efficiency Technologies</p>
      <div className="mt-4 bg-white rounded-md p-2 min-h-[250px] flex flex-col justify-center">
        {options.map((option, index) => (
          <div key={index} className="m-4">
            <RadioButton
              id={`reduction-rate-${index}`}
              name="reduction-rate"
              value={option.value}
              checked={reductionRate === option.value}
              onChange={(e) => {
                setEligibilityTestData((prevState) => ({
                  ...prevState,
                  eligibilty: {
                    ...prevState.eligibilty,
                    reductionRate: e.target.value,
                  },
                }));
              }}
              label={option.label}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const Exclusions = ({
  options,
  setEligibilityTestData,
  eligibilityTestData,
}) => {
  const {
    eligibilty: { exclusions },
  } = eligibilityTestData || {};

  return (
    <div className="p-4 bg-[#E8F5EB] border rounded-lg min-h-[400px] ">
      <h2 className="text-lg font-bold">Exclusions</h2>
      <p>Relation to fossil fuel production</p>
      <div className="mt-4">
        <div className="mt-4 bg-white rounded-md p-10 min-h-[250px]">
          <p>
            Does your project improve the energy efficiency of fossil fuel
            production (i.e., cleaner coal technology)?
          </p>
          {options.map((option, index) => (
            <div key={index} className="my-4">
              <RadioButton
                id={`exclusions-${index}`}
                name="exclusions"
                value={option.value}
                checked={exclusions === option.value}
                onChange={(e) => {
                  setEligibilityTestData((prevState) => ({
                    ...prevState,
                    eligibilty: {
                      ...prevState.eligibilty,
                      exclusions: e.target.value,
                    },
                  }));
                }}
                label={option.label}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
