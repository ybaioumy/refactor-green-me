import { useFormContext, Controller } from 'react-hook-form';
import NumericInput from '../../shared/NumericInput';
import RadioButton from '../../shared/RadioButton';
function StepOneESCO() {
  const { control, watch, setValue } = useFormContext();
  const project = watch(); // Watch the project data to dynamically update values

  const contractingModelId = watch('contractingModelId'); // Watch specific field

  // Function to handle resetting values when changing contracting models
  const handleRadioChange = (modelId) => {
    setValue('contractingModelId', modelId);

    // Reset dependent fields based on model change
    if (modelId === 1) {
      // If 'Shared Savings' is selected, reset 'Guaranteed Savings' fields
      setValue('economicViabilty.guaranteedSavingPremiumPercentage', 0);
      setValue('economicViabilty.guaranteedSavingPremiumValue', 0);
      setValue('economicViabilty.isGuaranteedSavingPercentage', false);
      setValue('economicViabilty.isGuaranteedSavingValue', false);
    } else if (modelId === 2) {
      // If 'Guaranteed Savings' is selected, reset 'Shared Saving Percentage'
      setValue('economicViabilty.sharedSavingPercentage', 0);
    }
  };
  return (
    <div className="flex flex-col h-full ">
      <div className="flex flex-col gap-6 h-full  w-full">
        <div className="flex flex-col w-full gap-6 ">
          {/* Shared Savings */}
          <div className="flex items-center">
            <div className="z-10 border border-[#c7c7c7] rounded-[28px] w-[355px] h-[70px] flex items-center px-[20px]">
              <Controller
                name="contractingModelId"
                control={control}
                render={({ field }) => (
                  <RadioButton
                    variant="green"
                    label={'Shared Savings'}
                    id="Shared-Savings"
                    type="radio"
                    value={1}
                    checked={field.value === 1}
                    onChange={() => handleRadioChange(1)}
                  />
                )}
              />
            </div>
            <div className="px-[70px] opacity-7S0 flex items-center justify-between rounded-[28px] bg-[#e7e7e7] w-full h-[115px] ml-[-40px]">
              <p>Shared Saving Percentage (%)</p>
              <div className="w-[40%] h-[2px] bg-[#B5B5B5]"></div>
              <Controller
                name="economicViabilty.sharedSavingPercentage"
                control={control}
                render={({ field }) => (
                  <NumericInput
                    value={field.value || 0}
                    onChange={field.onChange}
                    disabled={watch('contractingModelId') !== 1}
                  />
                )}
              />
            </div>
          </div>

          {/* Guaranteed Savings */}
          <div className="flex items-center">
            <div className="z-10 border border-[#c7c7c7] rounded-[28px] w-[355px] h-[70px] flex items-center px-[20px]">
              <Controller
                name="contractingModelId"
                control={control}
                render={({ field }) => (
                  <RadioButton
                    variant="green"
                    label={'Guaranteed Savings'}
                    id="Guaranteed-Savings"
                    type="radio"
                    value={2}
                    checked={field.value === 2}
                    onChange={() => handleRadioChange(2)}
                  />
                )}
              />
            </div>
            <div className="px-[70px] opacity-70 flex items-center justify-between rounded-[28px] bg-[#E8F1E5] w-full h-[115px] ml-[-40px]">
              <p>Guaranteed Saving Premium</p>
              <div className="flex w-[40%] items-center">
                <div className="w-full h-[2px] bg-[#B5B5B5]"></div>
                <div className="w-[30px] h-[45px] border-[2px] border-[#b5b5b5] border-r-0"></div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex">
                  <Controller
                    name="economicViabilty.isGuaranteedSavingPercentage"
                    control={control}
                    render={({ field }) => (
                      <>
                        <RadioButton
                          label={'(%)'}
                          checked={field.value}
                          onChange={() => {
                            setValue(
                              'economicViabilty.isGuaranteedSavingPercentage',
                              true
                            );
                            setValue(
                              'economicViabilty.isGuaranteedSavingValue',
                              false
                            );
                          }}
                          disabled={watch('contractingModelId') !== 2}
                        />
                        <Controller
                          name="economicViabilty.guaranteedSavingPremiumPercentage"
                          control={control}
                          render={({ field }) => (
                            <NumericInput
                              value={field.value || 0}
                              onChange={field.onChange}
                              disabled={watch('contractingModelId') !== 2}
                            />
                          )}
                        />
                      </>
                    )}
                  />
                </div>

                <div className="flex">
                  <Controller
                    name="economicViabilty.isGuaranteedSavingValue"
                    control={control}
                    render={({ field }) => (
                      <>
                        <RadioButton
                          label={'($)'}
                          checked={field.value}
                          onChange={() => {
                            setValue(
                              'economicViabilty.isGuaranteedSavingValue',
                              true
                            );
                            setValue(
                              'economicViabilty.isGuaranteedSavingPercentage',
                              false
                            );
                          }}
                          disabled={watch('contractingModelId') !== 2}
                        />
                        <Controller
                          name="economicViabilty.guaranteedSavingPremiumValue"
                          control={control}
                          render={({ field }) => (
                            <NumericInput
                              value={field.value || 0}
                              onChange={field.onChange}
                              disabled={watch('contractingModelId') !== 2}
                            />
                          )}
                        />
                      </>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepOneESCO;
