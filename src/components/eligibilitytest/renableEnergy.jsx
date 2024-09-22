import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Title from '../shared/Title';
import RadioButton from '../shared/RadioButton';
import DynamicInputs from '../shared/DynamicInputs';
import NumericInput from '../shared/NumericInput';

function RenewableEnergy({ categories }) {
  const { control, watch, setValue } = useFormContext({
    defaultValues: {
      criteriaId: null,
      subCriteriaId: null,
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

  // Watch to get real-time updates on field values
  const selectedCriteriaId = watch('criteriaId');
  const selectedSubCriteriaId = watch('SubCriteriaId');
  const totalGenerationCapacity = watch('eligibility.totalGenerationCapacity');
  const alignedToTheIfcperformance = watch(
    'eligibility.alignedToTheIfcperformance'
  );
  const improvementActivitiesFossilFuel = watch(
    'eligibility.improvementActivitiesFossilFuel'
  );
  const products = watch('eligibility.products');

  return (
    <>
      <div>
        <div className="flex flex-wrap  p-5 bg-card mt-5 rounded-lg gap-10 sm:gap-5">
          {categories?.map((item) => {
            const isDimmed =
              selectedCriteriaId !== null && selectedCriteriaId !== item.id;

            return (
              <div
                key={item.id}
                className={`flex flex-col justify-start w-full sm:w-[48%] md:w-[30%] lg:w-[23%] ${
                  isDimmed ? 'opacity-50' : ''
                }`}>
                <Controller
                  name="criteriaId"
                  control={control}
                  render={({ field }) => (
                    <RadioButton
                      label={item.name}
                      value={`${item.id}`}
                      checked={field.value === item.id}
                      onChange={() => {
                        field.onChange(item.id);
                        setValue('SubCriteriaId', 0); // Reset SubCriteriaId
                      }}
                      name="parentCategory"
                    />
                  )}
                />

                <div className="bg-white p-5 rounded-tr-lg rounded-tl-lg mx-2 flex flex-col mt-3 justify-center">
                  {item.children.map((child, i) => (
                    <div
                      className={`border-b border-[#CDCDCD] ${
                        i === 0 ? 'pb-3' : 'py-3'
                      }`}
                      key={child.id}>
                      <Controller
                        name="SubCriteriaId"
                        control={control}
                        render={({ field }) => (
                          <RadioButton
                            label={child.name}
                            value={`${child.id}`}
                            checked={field.value === child.id}
                            onChange={() => field.onChange(child.id)}
                            name="childCategory"
                            disabled={selectedCriteriaId !== item.id}
                          />
                        )}
                      />
                    </div>
                  ))}
                </div>

                {item.id === 4 && (
                  <div className="p-3 mx-2 bg-white flex flex-col justify-between gap-5 rounded-bl-lg rounded-br-lg">
                    <Title text={'Total Generation Capacity (kWh)'} type="h1" />
                    <Controller
                      name="eligibility.totalGenerationCapacity"
                      control={control}
                      render={({ field }) => (
                        <NumericInput {...field} value={field.value} />
                      )}
                    />
                    <div className="border border-[#CDCDCD]" />
                    <Title
                      text={
                        'Is the project aligned to the IFC Performance Standards'
                      }
                      type="h1"
                    />
                    <Controller
                      name="eligibility.alignedToTheIfcperformance"
                      control={control}
                      render={({ field }) => (
                        <>
                          <RadioButton
                            label={'Yes'}
                            value={'Yes'}
                            checked={field.value === 'Yes'}
                            onChange={() => field.onChange('Yes')}
                            disabled={selectedCriteriaId !== item.id}
                          />
                          <RadioButton
                            label={'No'}
                            value={'No'}
                            checked={field.value === 'No'}
                            onChange={() => field.onChange('No')}
                            disabled={selectedCriteriaId !== item.id}
                          />
                        </>
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default RenewableEnergy;
