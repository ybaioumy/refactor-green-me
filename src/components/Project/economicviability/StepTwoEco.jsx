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

function StepTwoECO() {
  const {
    data: dropDowns,
    isLoading: isLoadingDropDowns,
    isError: isErrorLoadingDropDowns,
  } = useGetProjectDropDownsQuery('economicviability');
  const { control, watch, setValue, getValues } = useFormContext({
    defaultValues: {
      economicViabilty: {
        totalCapexitems: 0,
        totalCapexvalue: 0,
        totalOpexitems: 0,
        totalOpexvalue: 0,
        capexes: [],
        opexes: [],
      },
    },
  });
  const opexes = watch('economicViabilty.opexes') || [];
  const currentLength = opexes.length;

  const totalOpexValue = opexes.reduce(
    (acc, obj) => acc + obj.itemTotalCost,
    0
  );

  const opexEmpty = {
    name: `OPEX Item ${currentLength + 1}`,
    description: '',
    frequencyId: 1,
    unitPrice: 0,
    itemTotalCost: 0,
    remarks: '',
  };

  const getNumberOfMonth = {
    1: 12,
    2: 4,
    3: 1,
  };

  // Update total OPEX items and value when they change
  useEffect(() => {
    setValue('economicViabilty.totalOpexitems', currentLength);
    setValue('economicViabilty.totalOpexvalue', totalOpexValue);
  }, [currentLength, totalOpexValue, setValue]);

  const addOpex = () => {
    setValue('economicViabilty.opexes', [...opexes, opexEmpty]);
  };

  const deleteOpex = (name) => {
    setValue(
      'economicViabilty.opexes',
      opexes.filter((opex) => opex.name !== name)
    );
  };

  const updateOpexField = (index, key, value) => {
    const updatedOpexes = [...opexes];
    updatedOpexes[index][key] = value;

    // Recalculate the itemTotalCost if unitPrice or frequencyId changes
    if (key === 'unitPrice' || key === 'frequencyId') {
      updatedOpexes[index].itemTotalCost =
        getNumberOfMonth[updatedOpexes[index].frequencyId] *
        updatedOpexes[index].unitPrice;
    }

    setValue('economicViabilty.opexes', updatedOpexes);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="flex flex-col">
            <div className="flex gap-12 items-center pb-4">
              <p className="text-[#1E4A28] text-[25px] font-[700] px-4">OPEX</p>
              <Button
                variant="secondary"
                onClick={addOpex}
                className="flex flex-col items-center justify-center w-[60px] h-[60px]">
                <Icon name={'addProjectGreen'} />
              </Button>
            </div>
            <hr className="border-l-[2px] border-[#B5B5B5] h-full" />
          </div>
        </div>

        <div className="md:flex w-full">
          <div className="flex flex-col md:w-[80%] gap-24 h-[80vh] overflow-y-scroll no-scrollbar mb-4">
            {opexes.map((opex, index) => (
              <div className="md:pr-[20px]" key={opex.name}>
                <p className="text-[#1E4A28] text-[18px] font-bold uppercase pl-4">
                  {opex?.name}
                </p>

                <div className="w-full flex flex-col gap-8 bg-[#DFDFDF] rounded-[17px] py-[25px] px-2 md:px-[15px] relative">
                  <div className="flex gap-4 absolute right-[40px] -top-[30px] mt-1">
                    <Button
                      variant="secondary"
                      onClick={() => deleteOpex(opex.name)}
                      className="flex flex-col items-center justify-center bg-[#D8F992] w-[60px] h-[60px] rounded-[50px]">
                      <Icon name={'delete'} />
                    </Button>
                  </div>

                  <Controller
                    name={`economicViabilty.opexes.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Item Description"
                        type="textarea"
                        {...field}
                        maxLength={120}
                        placeHolder="Entered by User. Free text."
                        className="w-full h-16 rounded-[10px] p-[14px] bg-[#F7F7F7] [box-shadow:0px_4px_9px_3px_rgba(0,_0,_0,_0.20)_inset]"
                      />
                    )}
                  />
                  <div>
                    <p className="text-[#1E4A28] text-[14px] font-[700] p-[5px]">
                      Item Cost Calculator
                    </p>
                    <div className="flex justify-between items-center border border-black p-4 py-8 rounded-lg bg-[#F0F0F0] ">
                      <div className="flex flex-col justify-between gap-4">
                        <p>Item Frequency</p>
                        <Controller
                          name={`economicViabilty.opexes.${index}.frequencyId`}
                          control={control}
                          render={({ field }) => (
                            <div className="md:flex gap-20 border-b border-[#000] pb-4">
                              {dropDowns?.opexItemFrequency?.map((x) => (
                                <RadioButton
                                  key={x.id}
                                  label={x.name}
                                  checked={field.value === x.id}
                                  onChange={() => {
                                    // Update the frequencyId value
                                    field.onChange(x.id);

                                    // Recalculate the itemTotalCost based on the new frequencyId
                                    const unitPrice = getValues(
                                      `economicViabilty.opexes.${index}.unitPrice`
                                    );
                                    setValue(
                                      `economicViabilty.opexes.${index}.itemTotalCost`,
                                      getNumberOfMonth[x.id] * unitPrice
                                    );
                                  }}
                                  id={x.name}
                                  value={x.id}
                                  name={opex.name}
                                  variant="green"
                                />
                              ))}
                            </div>
                          )}
                        />
                        <div className="flex pt-4 items-center justify-between">
                          <p className="text-[#1e4a28] text-[14px] font-[700]">
                            Item Unit Price (AED)
                          </p>
                          <Controller
                            name={`economicViabilty.opexes.${index}.unitPrice`}
                            control={control}
                            render={({ field }) => (
                              <NumericInput
                                value={field.value}
                                onChange={(newValue) => {
                                  // Update unit price in the form state
                                  field.onChange(newValue);

                                  // Recalculate itemTotalCost based on the new unitPrice
                                  const frequencyId = getValues(
                                    `economicViabilty.opexes.${index}.frequencyId`
                                  );
                                  setValue(
                                    `economicViabilty.opexes.${index}.itemTotalCost`,
                                    getNumberOfMonth[frequencyId] * newValue
                                  );
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="md:w-[30%] flex flex-col items-center">
                        <p className="text-[#1e4a28] text-[14px] font-[700]">
                          Item Cost / year (AED)
                        </p>
                        <div className="w-full flex justify-center items-center rounded-[15px] border border-dashed border-[#1e4a28] h-[60px] bg-[#e1f1dc] text-[#1E4A28] font-bold text-[22px]">
                          {opex.itemTotalCost}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Controller
                    name={`economicViabilty.opexes.${index}.remarks`}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Item Remarks"
                        type="textarea"
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
          <div className="md:w-[20%] md:border-l border-[#AFAFAF] flex flex-col gap-16 px-[20px]">
            <div className="flex flex-col">
              <p className="text-[#1e4a28] text-[14px] font-[700]">
                Total OPEX Items
              </p>
              <div className="w-full flex justify-center items-center rounded-[15px] border border-dashed border-[#1e4a28] h-[60px] bg-[#e1f1dc] text-[#1E4A28] font-bold text-[22px]">
                {currentLength}
              </div>
            </div>

            <div className="flex flex-col">
              <p className="text-[#1e4a28] text-[14px] font-[700]">
                Total OPEX Value (AED)
              </p>
              <div className="w-full flex justify-center items-center rounded-[15px] border border-dashed border-[#1e4a28] h-[60px] bg-[#e1f1dc] text-[#1E4A28] font-bold text-[22px]">
                {totalOpexValue}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StepTwoECO;
