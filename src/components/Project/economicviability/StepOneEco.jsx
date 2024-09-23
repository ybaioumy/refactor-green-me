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

function StepOneECO() {
  const {
    data: dropDowns,
    isLoading: isLoadingDropDowns,
    isError: isErrorLoadingDropDowns,
  } = useGetProjectDropDownsQuery('economicviability');
  const { control, setValue, watch } = useFormContext({
    defaultValues: {
      economicViabilty: {
        capexes: [],
        opexes: [],
        totalCapexitems: 0,
        totalCapexvalue: 0,
        totalOpexitems: 0,
        totalOpexvalue: 0,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'economicViabilty.capexes',
  });

  const capexes = watch('economicViabilty.capexes');
  let currentLength = capexes?.length || 0;
  let totalCapexvalue = capexes?.reduce(
    (acc, obj) => acc + obj.itemTotalCost,
    0
  );

  let capexEmpty = {
    name: `CAPEX Item ${currentLength + 1}`,
    typeId: 1,
    description: '',
    qty: 0,
    unitPrice: 0,
    itemTotalCost: 0,
    remarks: '',
  };

  useEffect(() => {
    setValue('economicViabilty.totalCapexitems', currentLength);
  }, [currentLength, setValue]);

  useEffect(() => {
    setValue('economicViabilty.totalCapexvalue', totalCapexvalue);
  }, [totalCapexvalue, setValue]);

  if (isLoadingDropDowns) return <Loader />;
  if (isErrorLoadingDropDowns) return <EmptyList />;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex gap-12 items-center pb-2">
            <p className="text-[#1E4A28] text-[25px] font-[700] px-4">CAPEX</p>
            <Button
              variant="secondary"
              onClick={() => append(capexEmpty)}
              className="flex flex-col items-center justify-center w-[60px] h-[60px]">
              <Icon name="addProjectGreen" />
            </Button>
          </div>
          <hr className="border-l-[2px] border-[#B5B5B5] h-full" />
        </div>

        <div className="lg:flex w-full">
          <div className="flex flex-col md:w-[80%] gap-24">
            {fields.map((capex, index) => (
              <div key={capex.id} className="pr-[20px]">
                <div className="flex items-center justify-between">
                  <p className="text-[#1E4A28] text-[18px] font-bold uppercase pl-4">
                    {capex.name}
                  </p>
                </div>

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
                    control={control}
                    name={`economicViabilty.capexes[${index}].typeId`}
                    render={({ field }) => (
                      <Select
                        label="Item Type"
                        value={field.value}
                        onChange={(value) => field.onChange(value.id)}
                        options={dropDowns.capexItemType}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name={`economicViabilty.capexes[${index}].description`}
                    render={({ field }) => (
                      <Input
                        label={'Item Description'}
                        type="textarea"
                        {...field}
                        maxLength={120}
                        placeHolder="Item Description"
                      />
                    )}
                  />

                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <p className="text-[#1E4A28] text-[14px] font-[700] p-[5px]">
                        Item Cost Calculator
                      </p>
                    </div>
                    <div className="md:flex justify-between items-end bg-[#F0F0F0] p-6 rounded-[17px] border border-black">
                      <Controller
                        control={control}
                        name={`economicViabilty.capexes[${index}].qty`}
                        render={({ field }) => (
                          <NumericInput
                            label="Item Qty"
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                              setValue(
                                `economicViabilty.capexes[${index}].itemTotalCost`,
                                value *
                                  watch(
                                    `economicViabilty.capexes[${index}].unitPrice`
                                  )
                              );
                            }}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name={`economicViabilty.capexes[${index}].unitPrice`}
                        render={({ field }) => (
                          <NumericInput
                            label="Item Unit Price (AED)"
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                              setValue(
                                `economicViabilty.capexes[${index}].itemTotalCost`,
                                watch(
                                  `economicViabilty.capexes[${index}].qty`
                                ) * value
                              );
                            }}
                          />
                        )}
                      />

                      <div className="md:w-[30%] mt-10 md:mt-0 flex flex-col items-center">
                        <p className="text-[#1e4a28] text-[14px] font-[700]">
                          Item total Cost (AED)
                        </p>
                        <div className="w-full flex justify-center items-center rounded-[15px] border border-dashed border-[#1e4a28] h-[50px] bg-[#e1f1dc]">
                          {watch(
                            `economicViabilty.capexes[${index}].itemTotalCost`
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Controller
                    control={control}
                    name={`economicViabilty.capexes[${index}].remarks`}
                    render={({ field }) => (
                      <Input
                        label={'Item Remarks'}
                        type="textarea"
                        {...field}
                        maxLength={120}
                        placeholder="Remarks"
                      />
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="md:w-[20%] md:border-l ml-auto border-[#AFAFAF] flex flex-col gap-16 px-[20px]">
            <div className="flex flex-col">
              <p className="text-[#1e4a28] text-[14px] font-[700]">
                Total CAPEX Items
              </p>
              <div className="w-full flex justify-center items-center rounded-[15px] border border-dashed border-[#1e4a28] h-[50px] bg-[#e1f1dc]">
                {currentLength}
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-[#1e4a28] text-[14px] font-[700]">
                Total CAPEX Value (AED)
              </p>
              <div className="w-full flex justify-center items-center rounded-[15px] border border-dashed border-[#1e4a28] h-[50px] bg-[#e1f1dc]">
                {totalCapexvalue || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepOneECO;
