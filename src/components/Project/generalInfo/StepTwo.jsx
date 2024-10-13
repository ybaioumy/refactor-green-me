import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Input from '../../shared/Input';
import Select from '../../shared/Select';
import { useGetProjectDropDownsQuery } from '../../../redux/features/project';
import Card from '../../shared/Card';
import RadioButton from '../../shared/RadioButton';
import NumericInput from '../../shared/NumericInput';

function GeneralInfoStepTwo() {
  const { watch, control, setValue, getValues } = useFormContext();
  const siteType = watch('siteTypeId');
  const {
    data: dropDowns,
    isLoading: isLoadingDropDowns,
    isError: isErrorLoadingDropDowns,
    error: errorDropDowns,
  } = useGetProjectDropDownsQuery('generalInfo');
  const handleChange = (field, value) => {
    setValue(field, value);
  };
  const labelStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1E4A28',
  };
  return (
    <div className="flex flex-col gap-10">
      {siteType === 5 && (
        <Controller
          name="description"
          defaultValue={''}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Project Description"
              type="textarea"
              placeHolder="Project description"
              labelStyle={labelStyle}
            />
          )}
        />
      )}
      <div className="flex w-full gap-10  md:gap-20 flex-wrap">
        <Controller
          name="siteTypeId"
          control={control}
          render={({ ...field }) => (
            <Select
              // {...field}
              labelStyle={labelStyle}
              label="Project Site Type"
              options={dropDowns?.siteType}
              onChange={(e) => {
                handleChange('siteTypeId', e.id);
              }}
            />
          )}
        />
        <Card title={'Multi-location Site'}>
          <Controller
            name="multiLocation"
            control={control}
            render={({ field }) => (
              <>
                <RadioButton
                  label="Yes"
                  name="multiLocation"
                  value={true}
                  checked={field.value === true}
                  onChange={() => field.onChange(true)}
                />
                <RadioButton
                  label="No"
                  name="multiLocation"
                  value={false}
                  checked={field.value === false}
                  onChange={() => {
                    field.onChange(false);
                    handleChange('quantityOfPluralism', ''); // Reset NumericInput when "No" is selected
                  }}
                />
              </>
            )}
          />
          <Controller
            name="quantityOfPluralism"
            control={control}
            render={({ field }) => (
              <NumericInput
                {...field}
                value={field.value}
                disabled={watch('multiLocation') === false}
                label={'Quantity of Pluralism'}
              />
            )}
          />
        </Card>
        <Card title={'Site Area'}>
          <Controller
            name="landArea"
            control={control}
            render={({ field }) => (
              <NumericInput
                {...field}
                value={field.value}
                label={'Land Area (sqm)'}
                unit="sqm"
              />
            )}
          />
          <Controller
            name="grossArea"
            control={control}
            render={({ field }) => (
              <NumericInput
                {...field}
                value={field.value}
                label={'Gross Built-Up Area (sqm)'}
                unit="sqm"
              />
            )}
          />
          <Controller
            name="noOfFloor"
            control={control}
            render={({ field }) => (
              <NumericInput
                {...field}
                value={field.value}
                label={' No. of Floors (including bsement)'}
                unit="floor"
              />
            )}
          />
        </Card>
      </div>
    </div>
  );
}

export default GeneralInfoStepTwo;
