import React, { useState } from 'react';
import {
  useGetProjectByIdQuery,
  useGetProjectDropDownsQuery,
} from '../../../redux/features/project';
import { useParams, useSearchParams } from 'react-router-dom';
import { useFormContext, Controller } from 'react-hook-form';
import Input from '../../shared/Input';
import Select from '../../shared/Select';
import Button from '../../shared/Button';
import { useGetAllCategoriesWithCrietriaQuery } from '../../../redux/features/eligibility';
import Loader from '../../shared/Loader';
import { useSelector } from 'react-redux';
import Icon from '../../shared/Icon';
import MapComponent from '../../shared/Map';
function GeneralInfoStepOne() {
  const { projectObject } = useSelector((state) => state.project);
  const { control, watch, setValue } = useFormContext({
    defaultValues: projectObject,
  });

  const [editCategory, setEditCategory] = useState(true);
  const [editCriteria, setEditCritiria] = useState(true);
  const categoryId = watch('categoryId');
  const criteriaId = watch('criteriaId');
  //   console.log(projectObject);
  const {
    data: dropDowns,
    isLoading: isLoadingDropDowns,
    isError: isErrorLoadingDropDowns,
    error: errorDropDowns,
  } = useGetProjectDropDownsQuery('generalInfo');

  const {
    data: categories,
    isLoading: isLoadingCategory,
    error: errorCategory,
  } = useGetAllCategoriesWithCrietriaQuery();

  const crietrias = categories?.filter((cat) => cat?.id === categoryId)[0]
    ?.crietria;
  const subCrietrias = crietrias?.filter((cri) => cri?.id === criteriaId)[0]
    ?.children;
  const handleChange = (field, value) => {
    setValue(field, value);
  };

  const labelStyle = {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1E4A28',
  };

  if (isLoadingCategory || isLoadingDropDowns) return <Loader />;

  return (
    <div className="flex flex-col w-full gap-5 md:gap-10">
      <Controller
        name="projectName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="textarea"
            label="Project Name"
            labelStyle={labelStyle}
          />
        )}
      />
      <div className="flex flex-col  gap-5 md:gap-10 lg:flex-row w-full justify-between">
        <div className="md:w-3/4 w-full flex flex-col gap-5 md:gap-10 lg:border-r border-black md:pr-32">
          <DetailsRow onEdit={() => setEditCategory((prev) => !prev)} noBorder>
            <Controller
              name="categoryId"
              control={control}
              rules={{
                required: 'Category is required',

              }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Project Category"
                  options={categories}
                  onChange={(e) => {
                    handleChange('categoryId', e.id);
                  }}
                  labelStyle={labelStyle}
                  disabled={editCategory}
                />
              )}
            />
          </DetailsRow>
          <DetailsRow onEdit={() => setEditCritiria((prev) => !prev)} noBorder>
            <Controller
              name="criteriaId"
              rules={{
                required: 'Criteria is required',
              }}
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label={'Criteria'}
                  options={crietrias}
                  onChange={(e) => {
                    handleChange('criteriaId', e.id);
                  }}
                  disabled={editCriteria}
                  labelStyle={labelStyle}
                />
              )}
            />
            <Controller
              name="subCriteriaId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={subCrietrias}
                  onChange={(e) => {
                    handleChange('subCriteriaId', e.id);
                  }}
                  disabled={editCriteria}
                  labelStyle={labelStyle}
                />
              )}
            />
          </DetailsRow>
          <Controller
            name="economicSectorId"
            rules={{
              required: 'Economic Sector is required',
            }}
            control={control}
            render={({ field }) => (
              <div className="flex">
                <Select
                  {...field}
                  label={'Economic Sector'}
                  options={dropDowns?.economicSector}
                  onChange={(e) => {
                    handleChange('economicSectorId', e.id);
                  }}
                  labelStyle={labelStyle}
                  description={'According to economic sector structure of NACE'}
                />
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-center gap-4 md:w-2/4">
          <Controller
            name="servedCountryId"
            control={control}
            rules={{
              required: 'Select Building Location',
            }}
            render={({ field }) => (
              <Select
                {...field}
                label="Project Location"
                options={dropDowns?.servedCountry}
                onChange={(e) => {
                  handleChange('servedCountryId', e.id);
                }}
                labelStyle={labelStyle}
              />
            )}
          />{' '}
          <Controller
            name="cityId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={dropDowns?.city}
                onChange={(e) => {
                  handleChange('cityId', e.id);
                }}
              />
            )}
          />{' '}
          <Controller
            name="currencyId"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={dropDowns?.currency}
                onChange={(e) => {
                  handleChange('currencyId', e.id);
                }}
              />
            )}
          />
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <MapComponent
                positionValue={{
                  lat: projectObject.lat,
                  long: projectObject.long,
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default GeneralInfoStepOne;

const DetailsRow = ({ children, onEdit, noBorder = false }) => {
  return (
    <div
      className={`flex w-full items-center border-b border-[#CBCBCB] py-2 ${
        noBorder && 'border-b-0'
      }`}>
      <div className="flex  md:flex-row flex-1 gap-5 md:gap-10 items-center w-full">
        <div className="flex flex-col gap-2  w-full">{children}</div>
        <Button
          variant="secondary"
          className={'w-[40px] h-[40px] '}
          title={'Change'}
          onClick={onEdit}>
          <Icon name={'edit'} />
        </Button>
      </div>
    </div>
  );
};
