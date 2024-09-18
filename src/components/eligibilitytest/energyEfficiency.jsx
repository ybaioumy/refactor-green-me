import Icon from '../shared/Icon';
import classNames from 'classnames';
import Title from '../shared/Title';
import RadioButton from '../shared/RadioButton';
import { useFormContext, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCriteriaId } from '../../redux/slices/eligbility';
const AccordionItem = ({
  item,
  control,
  setValue,
  watch,
  selectedCriteriaId,
}) => {
  const isOpen = selectedCriteriaId === item.id;
  const { categoryId, criteriaId } = useSelector((state) => state.eligibility);
  console.log(criteriaId);
  const toggleAccordion = () => {
    setValue('criteriaId', isOpen ? criteriaId : item.id); // Toggle accordion open/close
  };

  return (
    <div className="accordion-item border-t-2 border-[#CDCDCD] w-full">
      <div
        className="py-5 cursor-pointer"
        role="button"
        onClick={toggleAccordion}>
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
            <Controller
              key={child.id}
              name="SubCriteriaId"
              control={control}
              render={({ field }) => (
                <RadioButton
                  label={child.name}
                  value={`${child.id}`}
                  checked={field.value === child.id}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                  }}
                />
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};

function EnergyEfficiency({ categories, contractingData, projectTypeId }) {
  const dispatch = useDispatch();
  const {
    control,
    reset,
    watch,
    formState: { errors },
  } = useFormContext({
    defaultValues: {
      categoryId: 1,
      criteriaId: 0,
      contractingModelId: 0,
      SubCriteriaId: 0,
      eligibility: {
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
    },
  });
  const selectedCategoryId = watch('categoryId');
  const selectedCriteriaId = watch('criteriaId');
  const isDisabled = (id) => selectedCategoryId !== id;
  return (
    <>
      {projectTypeId === 2 ? (
        <div className="mb-10 w-full">
          <Title
            type="h1"
            text="1. Select Contracting Model"
            style={{ fontSize: 24 }}
          />
          <div className="flex gap-5 mt-5">
            {contractingData?.map((item) => (
              <div
                className="py-4 pl-2 pr-5 border border-[#C7C7C7] w-[250px] rounded-[18px]"
                key={item.id}>
                <Controller
                  name="contractingModelId"
                  rules={{
                    required: 'Contracting Model is required',
                  }}
                  control={control}
                  render={({ field }) => (
                    <RadioButton
                      className={'text-[#1E4A28] font-bold flex items-center'}
                      variant="green"
                      label={item.name}
                      value={`${item.id}`}
                      checked={field.value === item.id}
                      onChange={(e) => {
                        field.onChange(Number(e.target.value));
                      }}
                    />
                  )}
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
            text="2. Submit Your Project"
            style={{ fontSize: 24 }}
          />
        </div>
      ) : null}

      <div className="flex flex-wrap justify-between gap-10 bg-card rounded-lg p-5 min-h-[400px] w-full">
        {categories.map((item) => (
          <div
            className={`flex flex-col gap-2 w-full sm:w-[48%] md:w-[32%] lg:w-[24%] my-2 ${
              isDisabled(item.id) && 'opacity-50'
            }`}
            key={item.id}>
            <Controller
              name="categoryId"
              control={control}
              rules={{
                required: 'Select Project Category',
              }}
              render={({ field }) => (
                <RadioButton
                  label={item.name}
                  value={`${item.id}`}
                  checked={field.value === item.id}
                  onChange={(e) => {
                    field.onChange(Number(e.target.value));
                    dispatch(setCategoryId(Number(e.target.value))); // Dispatch categoryId change

                    // Reset criteria and eligibility when category changes
                    reset({
                      categoryId: Number(e.target.value),
                      criteriaId: 0,
                      SubCriteriaId: 0,
                      eligibility: {
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
                  }}
                />
              )}
            />

            <div className="bg-[#FFFFFF] flex flex-col ml-2 p-2 justify-between rounded-lg">
              {item.crietria.map((child) => (
                <div className="item-list" key={child.id}>
                  <Controller
                    disabled={isDisabled(child.id)}
                    name="criteriaId"
                    control={control}
                    render={({ field }) => (
                      <RadioButton
                        label={child.name}
                        value={`${child.id}`}
                        checked={field.value === child.id}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
                          dispatch(setCriteriaId(Number(e.target.value)));
                          // Reset SubCriteriaId and eligibility values when criteria changes
                          reset({
                            categoryId: selectedCategoryId,
                            criteriaId: Number(e.target.value),
                            SubCriteriaId: 0,
                            eligibility: {
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
                        }}
                        disabled={isDisabled(item.id)}
                      />
                    )}
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

export const Criteria = ({ categories }) => {
  const { watch, setValue, control, getValues } = useFormContext();
  const categoryId = watch('categoryId'); // Watch the categoryId from the form state
  const crietriaId = watch('criteriaId');
  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  );
  console.log(crietriaId);
  return (
    <>
      {selectedCategory?.crietria.map((subCategory) => (
        <AccordionItem
          control={control}
          key={subCategory.id}
          item={subCategory}
          watch={watch}
          setValue={setValue}
          selectedCriteriaId={crietriaId}
        />
      ))}
    </>
  );
};

export const ReductionRate = ({ options }) => {
  const { control } = useFormContext(); // Access form control

  return (
    <div className="p-4 bg-[#E8F5EB] border rounded-lg min-h-[400px]">
      <h2 className="text-lg font-bold">Reduction Rate</h2>
      <p>Energy Efficiency Technologies</p>
      <div className="mt-4 bg-white rounded-md p-2 min-h-[250px] flex flex-col justify-center">
        {options.map((option, index) => (
          <div key={index} className="m-4">
            <Controller
              name="eligibility.reductionRate"
              control={control}
              render={({ field }) => (
                <RadioButton
                  id={`reduction-rate-${index}`}
                  name="reduction-rate"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  label={option.label}
                />
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export const Exclusions = ({ options }) => {
  const { control } = useFormContext(); // Access form control

  return (
    <div className="p-4 bg-[#E8F5EB] border rounded-lg min-h-[400px] ">
      <h2 className="text-lg font-bold">Exclusions</h2>
      <p>Relation to fossil fuel production</p>
      <div className="mt-4 bg-white rounded-md p-10 min-h-[250px]">
        <p>
          Does your project improve the energy efficiency of fossil fuel
          production (i.e., cleaner coal technology)?
        </p>
        {options.map((option, index) => (
          <div key={index} className="my-4">
            <Controller
              name="eligibility.exclusions"
              control={control}
              render={({ field }) => (
                <RadioButton
                  id={`exclusions-${index}`}
                  name="exclusions"
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  label={option.label}
                />
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
