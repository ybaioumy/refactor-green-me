import React, { useEffect } from 'react';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import Select from '../../shared/Select';
import NumericInput from '../../shared/NumericInput';
import Icon from '../../shared/Icon';
import { useGetProjectDropDownsQuery } from '../../../redux/features/project';
import Button from '../../shared/Button';
import Loader from '../../shared/Loader';
import EmptyList from '../../shared/EmptyList';
import Input from '../../shared/Input';
import RadioButton from '../../shared/RadioButton';
function StepTwoOpex() {
  const {
    data: dropDowns,
    isLoading: isLoadingDropDowns,
    isError: isErrorLoadingDropDowns,
  } = useGetProjectDropDownsQuery('economicviability');
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'economicViabilty.opexes',
  });

  const opexes = watch('economicViabilty.opexes');
  let currentLength = opexes?.length || 0;
  let totalOpexValue = opexes?.reduce((acc, obj) => acc + obj.itemTotalCost, 0);

  useEffect(() => {
    setValue('totalOpexitems', currentLength);
  }, [currentLength, setValue]);

  useEffect(() => {
    console.log('afasd');
    setValue('totalOpexvalue', totalOpexValue);
  }, [setValue, totalOpexValue]);

  const getNumberOfMonth = {
    1: 12,
    2: 4,
    3: 1,
  };
  let opexEmpty = {
    name: `OPEX Item ${currentLength + 1}`,
    description: '',
    frequencyId: 1,
    unitPrice: 0,
    itemTotalCost: 0,
    remarks: '',
  };

  if (isLoadingDropDowns) {
    return <Loader />;
  } else if (isErrorLoadingDropDowns) {
    return <EmptyList message="Failed to load drop-downs" />;
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex gap-12 items-center pb-2">
            <p className="text-[#1E4A28] text-[25px] font-[700] px-4">OPEX</p>
            <Button
              variant="secondary"
              onClick={() => append(opexEmpty)}
              className="flex flex-col items-center justify-center w-[60px] h-[60px] ">
              <Icon name={'addProjectGreen'} />
            </Button>
          </div>
          <hr className="border-l-[2px] border-[#B5B5B5] h-full" />
        </div>

        <div className="md:flex w-full">
          <div className="flex flex-col w-full gap-24">
            {opexes?.map((opex, index) => (
              <div className="px-[20px]" key={opex.name}>
                <p className="text-[#1E4A28] text-[18px] font-bold uppercase pl-4">
                  {opex?.name}
                </p>

                <div className="w-full flex flex-col gap-8 bg-[#DFDFDF] rounded-[17px] py-[25px] px-[15px] relative">
                  <div className="flex gap-4 absolute right-[40px] -top-[30px]">
                    <Button
                      variant="secondary"
                      onClick={() => remove(index)}
                      className="flex flex-col items-center justify-center w-[60px] h-[60px]">
                      <Icon name="delete" />
                    </Button>
                  </div>
                  <Controller
                    name={`opexes[${index}].description`}
                    control={control}
                    defaultValue={opex.description || ''}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        maxLength={120}
                        placeholder="Entered by User. Free text."
                        className="w-full h-16 rounded-[10px] p-[14px] bg-[#F7F7F7] [box-shadow:0px_4px_9px_3px_rgba(0,_0,_0,_0.20)_inset]"
                      />
                    )}
                  />

                  {/* Frequency Radio Buttons */}
                  <Controller
                    name={`opexes[${index}].frequencyId`}
                    control={control}
                    defaultValue={opex.frequencyId || 1}
                    render={({ field }) => (
                      <>
                        <p>Item Frequnect</p>
                        <div className="md:flex  gap-20 border-b border-[#000] pb-4">
                          {dropDowns?.opexItemFrequency?.map((x) => (
                            <RadioButton
                              key={x?.id}
                              label={x?.name}
                              checked={field.value === x?.id}
                              onChange={(e) => {
                                field.onChange(Number(e.target.value));
                                setValue(
                                  `economicViabilty.opexes[${index}].itemTotalCost`,
                                  getNumberOfMonth[e.target.value] *
                                    opex?.unitPrice
                                );
                              }}
                              id={x?.name}
                              value={x?.id}
                              name={opex?.name}
                              variant="green"
                            />
                          ))}
                        </div>
                      </>
                    )}
                  />
                  <div className="flex justify-between items-center">
                    {/* Unit Price Input */}
                    <Controller
                      name={`opexes[${index}].unitPrice`}
                      control={control}
                      // defaultValue={opex.unitPrice || 0}
                      render={({ field }) => (
                        <>
                          <p> Item Unit Price (AED)</p>
                          <NumericInput
                            value={field.value}
                            onChange={(newValue) => {
                              field.onChange(newValue);
                              setValue(
                                `opexes[${index}].itemTotalCost`,
                                getNumberOfMonth[opex?.frequencyId] * newValue
                              );
                            }}
                            disabled={false}
                          />
                        </>
                      )}
                    />

                    {/* Item Total Cost */}
                    <div className="md:w-[30%]  flex sm:flex-col flex-row items-center">
                      <p className="text-[#1e4a28] text-[14px] font-[700]">
                        Item Cost / year (AED)
                      </p>
                      <div className="w-full flex text-[#1e4a28] text-[17px] font-[600] justify-center items-center rounded-[15px] border border-dashed border-[#1e4a28] h-[50px] bg-[#e1f1dc]">
                        {opex?.itemTotalCost}
                      </div>
                    </div>
                  </div>

                  {/* Remarks Field */}
                  <Controller
                    name={`opexes[${index}].remarks`}
                    control={control}
                    defaultValue={opex.remarks || ''}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        maxLength={120}
                        placeholder="Entered by User. Free text."
                        className="w-full h-16 rounded-[10px] p-[14px] bg-[#F7F7F7] [box-shadow:0px_4px_9px_3px_rgba(0,_0,_0,_0.20)_inset]"
                      />
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="md:w-[20%] md:border-l border-[#AFAFAF] flex flex-col gap-16 px-[20px]">
            <div className="flex flex-col">
              <p className="text-[#1e4a28] text-[14px] font-[700]">
                Total OPEX Items
              </p>
              <div className="w-full flex justify-center items-center rounded-[15px] border border-dashed border-[#1e4a28] h-[50px] bg-[#e1f1dc] text-[#1E4A28] text-[20px] font-[700]">
                {currentLength}
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-[#1e4a28] text-[14px] font-[700]">
                Total OPEX Value (AED)
              </p>
              <div className="w-full flex justify-center items-center rounded-[15px] border border-dashed border-[#1e4a28] h-[50px] bg-[#e1f1dc] text-[#1E4A28] text-[20px] font-[700]">
                {totalOpexValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepTwoOpex;
