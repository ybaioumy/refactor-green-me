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
  getValues,
  selectedCriteriaId,
}) => {
  const isOpen = selectedCriteriaId === item.id;

  const toggleAccordion = () => {
    setValue('criteriaId', isOpen ? item.children[0].id : item.id); // Toggle accordion open/close
  };

  const selectedCriteria = watch('criteriaId');
  const selectedCategory = watch('categoryId');

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
    setValue,
    watch,
    formState: { errors },
  } = useFormContext({
    defaultValues: {
      categoryId: 1,
      criteriaId: 0,
      SubCriteriaId: 0,
    },
  });
  const selectedCategoryId = watch('categoryId');
  const selectedCriteriaId = watch('criteriaId');
  const isDisabled = (id) => selectedCategoryId !== id;

  const handleCategoryChange = (e, categoryId) => {
    setValue('categoryId', categoryId); // Update category
    const selectedCategory = categories.find((cat) => cat.id === categoryId);

    const initialCriteriaId = selectedCategory?.crietria?.[0]?.id || 0;
    setValue('criteriaId', initialCriteriaId);
    setValue('SubCriteriaId', 0); // Reset SubCriteriaId
    dispatch(setCategoryId(categoryId)); // Dispatch categoryId change
  };

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
                      className={'text-[#1E4A28] font-bold flex items-center cursor-pointer'}
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

      <div className="flex flex-wrap  sm:gap-4 md:gap-10 bg-card rounded-lg p-5 min-h-[400px] w-full">
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
                  onChange={(e) =>
                    handleCategoryChange(e, Number(e.target.value))
                  }
                />
              )}
            />

            <div className="bg-[#FFFFFF] flex flex-col ml-2 p-2 justify-between rounded-lg">
              {item.crietria.map((child) => (
                <div className="item-list" key={child.id}>
                  <Controller
                    name="criteriaId"
                    control={control}
                    rules={{
                      required: 'Select Criteria',
                    }}
                    render={({ field }) => (
                      <RadioButton
                        label={child.name}
                        value={`${child.id}`}
                        checked={field.value === child.id}
                        onChange={(e) => {
                          field.onChange(Number(e.target.value));
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
  const { watch, setValue, control } = useFormContext();
  //TODO: Toggle accordion auto for the criteriaId
  // Watch 'categoryId' and 'criteriaId' from the form state
  const categoryId = watch('categoryId');
  const criteriaId = watch('criteriaId');

  // Find the selected category based on categoryId
  const selectedCategory = categories.find(
    (category) => category.id === categoryId
  );

  // If no category is selected or there are no criteria, show nothing
  if (!selectedCategory || !selectedCategory.crietria) return null;

  return (
    <>
      {selectedCategory.crietria.map((subCategory) => (
        <AccordionItem
          control={control}
          key={subCategory.id}
          item={subCategory}
          setValue={setValue}
          watch={watch}
          selectedCriteriaId={criteriaId} // Pass criteriaId to track the selected one
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
              name="eligibility.reductionRate" // Form field path
              control={control}
              rules={{
                required: 'Reduction Rate is required',
              }}
              render={({ field }) => (
                <RadioButton
                  id={`reduction-rate-${index}`}
                  name="reductionRate" // All radios in the group should share the same name
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={(e) => field.onChange(e.target.value)} // Update form state
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
    <div className="p-4 bg-[#E8F5EB] border rounded-lg min-h-[400px]">
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
              name="eligibility.exclusions" // Form field path
              control={control}
              rules={{
                required: 'Exclusions is required',
              }}
              render={({ field }) => (
                <RadioButton
                  id={`exclusions-${index}`}
                  name="exclusions" // All radios in the group should share the same name
                  value={option.value}
                  checked={field.value === option.value}
                  onChange={(e) => field.onChange(e.target.value)} // Update form state
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
