import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from '../../shared/Select';
import Icon from '../../shared/Icon';
import { FileUploader } from '../../shared/Upload';
import { message } from 'antd';
import Button from '../../shared/Button';
import Input from '../../shared/Input';
import Section, { ItemRow } from '../../shared/Section';
import DisbursedPie from '../../shared/PieChart';
import dayjs from 'dayjs';

function ESCODetails({ sectors, countries }) {
  const { control, setValue, watch, getValues } = useFormContext();
  const [countriesServed, setCountriesServed] = useState([{ countryId: 0 }]);

  const addCountry = () => {
    const newCountry = { countryId: null };
    setCountriesServed([...countriesServed, newCountry]);
    setValue('escoCountriesServeds', [
      ...getValues('escoCountriesServeds'),
      newCountry,
    ]);
  };

  const removeCountry = (index) => {
    if (countriesServed.length <= 1) {
      message.error('At least one ESCO country must be selected.');
      return;
    }
    const updatedCountries = countriesServed.filter((_, i) => i !== index);
    setCountriesServed(updatedCountries);
    setValue('escoCountriesServeds', updatedCountries);
  };

  const handleCountryChange = (index, countryId) => {
    const updatedCountries = countriesServed.map((country, i) =>
      i === index ? { ...country, countryId } : country
    );
    setCountriesServed(updatedCountries);
    setValue('escoCountriesServeds', updatedCountries);
  };

  const handleChange = (field, value) => {
    setValue(field, value);
  };

  return (
    <div className="w-full ">
      <Section label={'ESCO Basic Info'}>
        <ItemRow label={'ESCO Commercial Name'}>
          <Controller
            name="escoName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeHolder={'ESCO Name: eg. Siemens Industrial UAE LLC'}
              />
            )}
          />
        </ItemRow>
        <ItemRow label={'Base Country'}>
          <Controller
            name="countryId"
            control={control}
            render={({ field }) => (
              <Select
                removeMaxWidth
                search
                variant="innerShadow"
                options={countries}
                {...field}
                onChange={(value) => handleChange('countryId', value.id)}
              />
            )}
          />
        </ItemRow>
        <ItemRow label={'ESCO Brief'}>
          <Controller
            name="escoBrief"
            control={control}
            render={({ field }) => (
              <Input {...field} placeHolder={'ESCO Brief'} type="textarea" />
            )}
          />
        </ItemRow>
        <ItemRow label={'Legal Name'}>
          <Controller
            name="escoLegalName"
            control={control}
            render={({ field }) => (
              <Input {...field} placeHolder={'Siemens Industrial UAE LLC'} />
            )}
          />
        </ItemRow>
        <ItemRow label={'Date of Establishment'}>
          <Controller
            name="dateOfEstablishment"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeHolder={'May 2, 2012'}
                type="date"
                variant="innerShadow"
                onChange={(date) =>
                  handleChange(
                    'dateOfEstablishment',
                    date ? dayjs(date).toISOString() : null
                  )
                }
              />
            )}
          />
        </ItemRow>
      </Section>
      <Section label={'Countries Served'}>
        {countriesServed.map((country, index) => (
          <ItemRow
            key={index}
            label={`Country ${index + 1}`}
            hasBorder
            canEdit
            onRemove={() => removeCountry(index)}>
            <Controller
              name={`escoCountriesServeds[${index}].countryId`}
              control={control}
              render={({ field }) => (
                <Select
                  removeMaxWidth
                  search
                  variant="secondary"
                  options={countries}
                  {...field}
                  onChange={(value) => handleCountryChange(index, value.id)}
                />
              )}
            />
          </ItemRow>
        ))}
        <div className="w-full grid">
          <Button
            variant="blue"
            onClick={addCountry}
            className="justify-self-end flex justify-between  w-[226px]">
            <Icon name={'addProject'} />
            <span className="w-full text-center">Add</span>
          </Button>
        </div>
      </Section>
      {/* <FileUploader label={'ESCO Credit History / Score'} /> */}
      <Section label={'ESCO Legal Form / Establishment'}>
        <ItemRow label={'Jurisdiction of the Company'}>
          <Controller
            name="jurisdictionOfTheCompany"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeHolder={
                  'United Arab Emirates, Mainland Commercial license'
                }
                type="textarea"
              />
            )}
          />
        </ItemRow>
        <ItemRow label={'Legal Form'}>
          <Controller
            name="legalForm"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeHolder={'Limited Liability Company (LLC)'}
              />
            )}
          />
        </ItemRow>
        <ItemRow label={'Date of Establishment'}>
          <Controller
            name="dateOfEstablishment"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="date"
                variant="innerShadow"
                onChange={(date) =>
                  handleChange(
                    'dateOfEstablishment',
                    date ? dayjs(date).toISOString() : null
                  )
                }
              />
            )}
          />
        </ItemRow>
      </Section>
      <EscoOwnershipSection />
      <EscoActivitiesSection />
      <EscoManagementSection />
      {/* <FileUploader label={'ESCO Organizational Chart'} /> */}
    </div>
  );
}

const EscoOwnershipSection = () => {
  const { control, setValue, getValues } = useFormContext();
  const [shareholders, setShareholders] = useState([
    { name: '', share: 0, value: 0 },
  ]);

  const addShareholder = () => {
    const newShareholder = { name: '', share: 0, value: 0 };
    setShareholders([...shareholders, newShareholder]);
    setValue('escoOwnerships', [
      ...getValues('escoOwnerships'),
      newShareholder,
    ]);
  };

  const removeShareholder = (index) => {
    if (shareholders.length <= 1) {
      message.error('At least one shareholder must be specified');
      return;
    }
    const updatedShareholders = shareholders.filter((_, i) => i !== index);
    setShareholders(updatedShareholders);
    setValue('escoOwnerships', updatedShareholders);
  };

  const handleShareholderChange = (index, field, value) => {
    const updatedShareholders = shareholders.map((shareholder, i) =>
      i === index ? { ...shareholder, [field]: value } : shareholder
    );

    const totalShare = updatedShareholders.reduce(
      (acc, curr) => acc + Number(curr.share),
      0
    );

    if (totalShare > 100) {
      message.error('Total share cannot exceed 100%');
      return;
    }

    setShareholders(updatedShareholders);
    setValue('escoOwnerships', updatedShareholders);
  };

  const totalShare = shareholders.reduce(
    (acc, curr) => acc + Number(curr.share),
    0
  );
  const totalValue = shareholders.reduce(
    (acc, curr) => acc + Number(curr.value),
    0
  );

  const defaultBackgroundColor = ['#E0E0E0'];
  const defaultData = [0];

  const chartData = {
    labels:
      totalShare === 0 ? ['No Shares'] : shareholders.map((s) => `${s.share}%`),
    datasets: [
      {
        data:
          totalShare === 0
            ? defaultData
            : shareholders.map((s) => s.share || 0),
        backgroundColor:
          totalShare === 0
            ? defaultBackgroundColor
            : ['#4B68B3', '#203D87', '#7B94D5'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
    tabs: shareholders.map((s) => s.name || `Owner `),
  };

  return (
    <Section label={'ESCO Ownership'}>
      {shareholders.map((shareholder, index) => (
        <ItemRow
          key={index}
          label={`Shareholder ${index + 1}`}
          hasBorder
          canEdit
          onRemove={() => removeShareholder(index)}>
          <Controller
            name={`escoOwnerships[${index}].name`}
            control={control}
            defaultValue={shareholder.name}
            render={({ field: { value, onChange, ...field } }) => (
              <Input
                {...field}
                value={value}
                placeHolder={`Owner ${index + 1}`}
                onChange={(e) => {
                  const newValue = e.target.value;
                  onChange(newValue);
                  handleShareholderChange(index, 'name', newValue);
                }}
              />
            )}
          />
          <Controller
            name={`escoOwnerships[${index}].share`}
            control={control}
            defaultValue={shareholder.share}
            render={({ field: { value, onChange, ...field } }) => (
              <Input
                {...field}
                value={value}
                placeHolder={`Share %`}
                type="number"
                onChange={(e) => {
                  const newValue = e.target.value;
                  onChange(newValue);
                  handleShareholderChange(index, 'share', newValue);
                }}
              />
            )}
          />

          <Controller
            name={`escoOwnerships[${index}].value`}
            control={control}
            defaultValue={shareholder.value}
            render={({ field: { value, onChange, ...field } }) => (
              <Input
                {...field}
                value={value}
                placeHolder={`Value`}
                type="number"
                onChange={(e) => {
                  const newValue = e.target.value;
                  onChange(newValue);
                  handleShareholderChange(index, 'value', newValue);
                }}
              />
            )}
          />
        </ItemRow>
      ))}
      <div className="w-full grid">
        <Button
          variant="blue"
          onClick={addShareholder}
          className="justify-self-end w-[226px]">
          <Icon name={'addProject'} />
          <span className="w-full text-center">Add Shareholder</span>
        </Button>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between border-y-[1px] border-[#54A967] p-2 mt-10">
          <div className="flex-1">
            <p className="font-semibold text-[20px] text-[#1E4A28]">Total</p>
          </div>
          <div className="flex gap-4 flex-1 items-center">
            <p className="md:flex-1 font-semibold text-[16px] text-[#1E4A28] md:text-[20px]">
              {totalShare}%
            </p>
            <p className="flex-1 font-semibold text-[16px] text-[#1E4A28] md:text-[20px]">
              {totalValue.toLocaleString()} $
            </p>
          </div>
        </div>
        <div>
          <DisbursedPie data={chartData} />
        </div>
      </div>
    </Section>
  );
};

const EscoActivitiesSection = () => {
  const { control, setValue, getValues } = useFormContext();
  const [activities, setActivities] = useState([
    { activityName: '', description: '' },
  ]);

  const addActivity = () => {
    const newActivity = { activityName: '', description: '' };
    setActivities([...activities, newActivity]);
    setValue('escoActivities', [...getValues('escoActivities'), newActivity]);
  };

  const removeActivity = (index) => {
    if (activities.length <= 1) {
      message.error('At least one activity must be specified.');
      return;
    }
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
    setValue('escoActivities', updatedActivities);
  };

  const handleActivityChange = (index, field, value) => {
    const updatedActivities = activities.map((activity, i) =>
      i === index ? { ...activity, [field]: value } : activity
    );

    setActivities(updatedActivities);
    setValue('escoActivities', updatedActivities);
  };

  return (
    <Section label={'ESCO Activities'}>
      {activities.map((activity, index) => (
        <ItemRow
          key={index}
          label={`Activity ${index + 1}`}
          hasBorder
          canEdit
          onRemove={() => removeActivity(index)}>
          <Controller
            name={`escoActivities[${index}].activityName`}
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Input
                {...field}
                value={value}
                placeHolder={`Activity Name`}
                onChange={(e) => {
                  const newValue = e.target.value;
                  onChange(newValue);
                  handleActivityChange(index, 'activityName', newValue);
                }}
              />
            )}
          />
          <Controller
            name={`escoActivities[${index}].description`}
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Input
                {...field}
                value={value}
                placeHolder={`Description`}
                onChange={(e) => {
                  const newValue = e.target.value;
                  onChange(newValue);
                  handleActivityChange(index, 'description', value);
                }}
              />
            )}
          />
        </ItemRow>
      ))}
      <div className="w-full grid">
        <Button
          variant="blue"
          onClick={addActivity}
          className="justify-self-end w-[226px]">
          <Icon name={'addProject'} />
          <span className="w-full text-center">Add Activity</span>
        </Button>
      </div>
    </Section>
  );
};

const EscoManagementSection = () => {
  const { control, setValue, getValues } = useFormContext();
  const [management, setManagement] = useState([{ name: '', role: '' }]);

  const addManagement = () => {
    const newManagement = { name: '', role: '' };
    setManagement([...management, newManagement]);
    setValue('escoManagement', [...getValues('escoManagement'), newManagement]);
  };

  const removeManagement = (index) => {
    if (management.length <= 1) {
      message.error('At least one management member must be specified.');
      return;
    }
    const updatedManagement = management.filter((_, i) => i !== index);
    setManagement(updatedManagement);
    setValue('escoManagement', updatedManagement);
  };

  const handleManagementChange = (index, field, value) => {
    const updatedManagement = management.map((member, i) =>
      i === index ? { ...member, [field]: value } : member
    );

    setManagement(updatedManagement);
    setValue('escoManagement', updatedManagement);
  };

  return (
    <Section label={'ESCO Management'}>
      {management.map((member, index) => (
        <ItemRow
          key={index}
          label={` Member ${index + 1}`}
          hasBorder
          canEdit
          onRemove={() => removeManagement(index)}>
          <Controller
            name={`escoManagement[${index}].name`}
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Input
                {...field}
                value={value}
                placeHolder={`Name`}
                onChange={(e) => {
                  const newValue = e.target.value;
                  onChange(newValue);
                  handleManagementChange(index, 'name', newValue);
                }}
              />
            )}
          />
          <Controller
            name={`escoManagement[${index}].role`}
            control={control}
            render={({ field: { value, onChange, ...field } }) => (
              <Input
                {...field}
                value={value}
                placeHolder={`Role`}
                onChange={(e) => {
                  const newValue = e.target.value;
                  onChange(newValue);
                  handleManagementChange(index, 'role', newValue);
                }}
              />
            )}
          />
        </ItemRow>
      ))}
      <div className="w-full grid">
        <Button
          variant="blue"
          onClick={addManagement}
          className="justify-self-end w-[226px]">
          <Icon name={'addProject'} />
          <span className="w-full text-center">Add Management</span>
        </Button>
      </div>
    </Section>
  );
};

export default ESCODetails;
