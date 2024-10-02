import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from '../../shared/Select';
import Icon from '../../shared/Icon';
import { message } from 'antd';
import Button from '../../shared/Button';
import Input from '../../shared/Input';
import Section, { ItemRow } from '../../shared/Section';
import { FileUploader } from '../../shared/Upload';
function ExpertDetails({ countries, expertise, certifcations, tokenData }) {
  return (
    <div className="w-full ">
      <ExpertInfo countries={countries} />
      <Contacts tokenData={tokenData} />
      <ServedCountries countries={countries} />
      <AreasOfExpertise expertise={expertise} />
      <Certifications certifcations={certifcations} />
      <Section canEdit={false}>
        <div className="flex flex-col justify-between items-center font-abel md:flex-row gap-10">
          <div>
            <p className="text-[20px]">Certificate 001</p>
            <div className="flex items-center gap-4 mb-2">
              <p className="text-[20px]">Current Status</p>
              <p className="px-4 py-1 bg-[#DDDDDD] rounded-[15px] text-[#686868]">
                Approved
              </p>
              <Icon name={'check-complete'} />
            </div>
            <p className="text-[#A9A9A9] text-sm">
              <span className="mr-5">12/09/2023</span>
              <span>submitted 3 days ago</span>
            </p>
          </div>
          <div className="bg-[#BFE0C6] rounded-md flex flex-col md:flex-row items-center justify-between w-full h-full ">
            <Icon name={'document'} />

            <div className="flex px-4 gap-4">
              <Button
                hasIcon
                iconName={'eye'}
                className={'flex-col text-sm w-[50px] h-[50px]'}
                variant="secondary"></Button>
              <Button
                hasIcon
                iconName={'download'}
                className={'flex-col text-sm w-[50px] h-[50px]'}
                variant="secondary"></Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

const ExpertInfo = ({ countries }) => {
  const [canEdit, setCanEdit] = useState(true);
  const {
    control,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext({
    defaultValues: {
      firstName: '',
      lastName: '',
      countryId: null,
      brief: '',
      expertNationalityId: null,
      expertLanguages: '',
    },
  });
  console.log(watch(), 'register values');
  const handleChange = (field, value) => {
    setValue(field, value);
  };

  return (
    <Section
      label={'Expert Basic Info'}
      onEdit={() => setCanEdit((prev) => !prev)}>
      <ItemRow label={'Expert Name'}>
        <div className="flex flex-col w-full">
          <div className="flex w-full gap-8">
            <div className="w-full">
              <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First Name is required' }} // Validation rule
                render={({ field }) => (
                  <Input
                    {...field}
                    placeHolder="First Name"
                    variant="secondary"
                    readOnly={canEdit}
                    disabled={canEdit}
                  />
                )}
              />
              <div className="h-2">
                {errors?.firstName && (
                  <p
                    className={`text-red-500 transition-opacity duration-300 ${
                      errors?.firstName ? 'opacity-100' : 'opacity-0'
                    }`}>
                    {errors?.firstName?.message && (
                      <span>{errors?.firstName?.message}</span>
                    )}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full">
              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last Name is required' }} // Validation rule
                render={({ field }) => (
                  <Input
                    {...field}
                    placeHolder="Last Name"
                    variant="secondary"
                    readOnly={canEdit}
                    disabled={canEdit}
                  />
                )}
              />

              {errors?.lastName && (
                <p
                  className={`text-red-500 transition-opacity duration-300 ${
                    errors?.lastName ? 'opacity-100' : 'opacity-0'
                  }`}>
                  {errors?.lastName?.message && (
                    <span>{errors?.lastName?.message}</span>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </ItemRow>
      <ItemRow label={'Base Country'}>
        <Controller
          name="countryId"
          rules={{
            required: 'Base Country is required',
          }}
          control={control}
          render={({ field }) => (
            <div className="flex flex-col w-full">
              <Select
                {...field}
                // removeMaxWidth
                search
                variant="green"
                options={countries}
                onChange={(value) => handleChange('countryId', value.id)}
                disabled={canEdit}
              />
              {errors?.countryId && (
                <p
                  className={`text-red-500 transition-opacity duration-300 ${
                    errors?.countryId ? 'opacity-100' : 'opacity-0'
                  }`}>
                  {errors?.countryId?.message && (
                    <span>{errors?.countryId?.message}</span>
                  )}
                </p>
              )}
            </div>
          )}
        />
      </ItemRow>
      <ItemRow label={'Expert Biography'}>
        <Controller
          name="brief"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeHolder={'Expert Brief'}
              type="textarea"
              variant="secondary"
            />
          )}
        />
      </ItemRow>
      <ItemRow label={'Nationality'}>
        <Controller
          name="expertNationalityId"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              // removeMaxWidth
              search
              variant="green"
              options={countries}
              onChange={(value) =>
                handleChange('expertNationalityId', value.id)
              }
            />
          )}
        />
      </ItemRow>
      <ItemRow label={'Languages'}>
        <Controller
          name="expertLanguages"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeHolder={'AR ,EN , Etc..'}
              variant="secondary"
              onChange={(value) => handleChange('expertLanguages', value)}
            />
          )}
        />
      </ItemRow>
    </Section>
  );
};
const Contacts = ({ tokenData }) => {
  const {
    control,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext({
    defaultValues: {
      email: '',
      phoneNumber: '',
      expertMobile2: '',
      website: '',
    },
  });

  const [canEdit, setCanEdit] = useState(true);

  return (
    <Section
      label={'Contact Information'}
      onEdit={() => setCanEdit((prev) => !prev)}>
      <ItemRow label={'Email'} hasBorder>
        <div className="flex flex-col w-full">
          <div className="w-full">
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required' }} // Validation rule
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeHolder="Email"
                  readOnly={!!tokenData?.Email}
                  disabled={!!tokenData?.Email || canEdit} // Make field read-only if tokenData.Email exists
                  variant="secondary"
                  value={tokenData?.Email || field.value} // Pre-fill the value if tokenData.Email exists, else use field value
                  onChange={(e) => {
                    if (!tokenData?.Email) {
                      field.onChange(e); // Only allow onChange if tokenData.Email doesn't exist
                    }
                  }}
                />
              )}
            />
          </div>
          {errors?.email && (
            <p
              className={`text-red-500 transition-opacity duration-300 ${
                errors?.email ? 'opacity-100' : 'opacity-0'
              }`}>
              {errors?.email?.message && <span>{errors?.email?.message}</span>}
            </p>
          )}
        </div>
      </ItemRow>
      <ItemRow label={'Mobile 1'} hasBorder>
        <div className="flex flex-col w-full">
          <div className="w-full">
            <Controller
              name="phoneNumber"
              control={control}
              rules={{ required: 'Phone number is required' }} // Validation rule
              render={({ field }) => (
                <Input
                  {...field}
                  placeHolder="Primary phone number"
                  variant="secondary"
                  readOnly={canEdit}
                  disabled={canEdit}
                  type="tel"
                />
              )}
            />
          </div>
          {errors?.phoneNumber && (
            <p
              className={`text-red-500 transition-opacity duration-300 ${
                errors?.phoneNumber ? 'opacity-100' : 'opacity-0'
              }`}>
              {errors?.phoneNumber?.message && (
                <span>{errors?.phoneNumber?.message}</span>
              )}
            </p>
          )}
        </div>
      </ItemRow>
      <ItemRow label={'Mobile 2'} hasBorder>
        <div className="flex flex-col w-full">
          <div className="w-full">
            <Controller
              name="expertMobile2"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeHolder="Another Phone Number"
                  variant="secondary"
                  type="tel"
                />
              )}
            />
          </div>
        </div>
      </ItemRow>
      <ItemRow label={'Web site'} hasBorder>
        <div className="flex flex-col w-full">
          <div className="w-full">
            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeHolder="website"
                  variant="secondary"
                  type="url"
                />
              )}
            />
          </div>
        </div>
      </ItemRow>
    </Section>
  );
};
const ServedCountries = ({ countries }) => {
  const {
    control,
    setValue,
    formState: { errors },
    watch,
  } = useFormContext({
    defaultValues: {
      expertCountriesServeds: [],
    },
  });
  const [canEdit, setCanEdit] = useState(true);

  const expertServedCounties = watch('expertCountriesServeds');
  const [countriesServed, setCountriesServed] = useState(
    expertServedCounties || []
  );
  const cleanCountriesServed = (countries) =>
    countries.filter((country) => country.countryId !== null);
  const addCountry = () => {
    const newCountry = { countryId: null };
    const updatedCountries = [...countriesServed, newCountry];
    setCountriesServed(updatedCountries);

    // Update form value with cleaned data
    setValue('expertCountriesServeds', cleanCountriesServed(updatedCountries));
  };
  const removeCountry = (index) => {
    if (countriesServed.length <= 1) {
      message.error('At least one served country must be selected.');
      return;
    }
    const updatedCountries = countriesServed.filter((_, i) => i !== index);
    setCountriesServed(updatedCountries);
    setValue('expertCountriesServeds', updatedCountries);
  };

  const handleCountryChange = (index, countryId) => {
    const updatedCountries = countriesServed.map((country, i) =>
      i === index ? { ...country, countryId } : country
    );
    setCountriesServed(updatedCountries);
    setValue('expertCountriesServeds', updatedCountries);
  };

  return (
    <Section
      label={'Expert Served Countries'}
      onEdit={() => setCanEdit((prev) => !prev)}>
      {countriesServed.map((country, index) => (
        <ItemRow
          key={index}
          label={`Country ${index + 1}`}
          hasBorder
          canEdit={index === 0 ? false : !canEdit}
          onRemove={() => removeCountry(index)}>
          <Controller
            name={`expertCountriesServeds[${index}].countryId`}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                // removeMaxWidth
                search
                variant="green"
                options={countries}
                onChange={(value) => handleCountryChange(index, value.id)}
                disabled={canEdit}
              />
            )}
          />
        </ItemRow>
      ))}
      <div className="w-full grid">
        <Button
          disabled={canEdit}
          variant="blue"
          onClick={addCountry}
          className="justify-self-end flex justify-between w-[226px]">
          <Icon name={'addProject'} />
          <span className="w-full text-center">Add Country</span>
        </Button>
      </div>
    </Section>
  );
};

const AreasOfExpertise = ({ expertise }) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext({
    defaultValues: {
      expertAreasofExpertises: [],
    },
  });

  const [canEdit, setCanEdit] = useState(true);

  const expertAreasofExpertises = watch('expertAreasofExpertises');
  const [areas, setAreas] = useState(expertAreasofExpertises || []);
  const cleanState = (areas) =>
    areas.filter((area) => area.areasofExpertiseId !== null);
  const addArea = () => {
    const newArea = { areasofExpertiseId: null };
    const updatedAreas = [...areas, newArea];
    setAreas(updatedAreas);

    // Update form value with cleaned data
    setValue('expertAreasofExpertises', cleanState(updatedAreas));
  };
  const removeArea = (index) => {
    if (areas.length <= 1) {
      message.error('At least one Area of Expertise must be selected.');
      return;
    }
    const updatedAreas = areas.filter((_, i) => i !== index);
    setAreas(updatedAreas);
    setValue('expertAreasofExpertises', updatedAreas);
  };

  const handleAreaChange = (index, areasofExpertiseId) => {
    const updatedAreas = areas.map((area, i) =>
      i === index ? { ...area, areasofExpertiseId } : area
    );
    setAreas(updatedAreas);
    setValue('expertAreasofExpertises', updatedAreas);
  };

  return (
    <Section
      label={'Areas of Expertise'}
      onEdit={() => setCanEdit((prev) => !prev)}>
      {areas.map((area, index) => (
        <ItemRow
          key={index}
          label={`Expertise ${index + 1}`}
          hasBorder
          canEdit={index === 0 ? false : !canEdit}
          onRemove={() => removeArea(index)}>
          <Controller
            name={`expertAreasofExpertises[${index}].areasofExpertiseId`}
            control={control}
            defaultValue={area.name}
            render={({ field }) => (
              <div className="flex flex-col w-full">
                <Select
                  {...field}
                  disabled={canEdit}
                  search
                  variant="green"
                  options={expertise}
                  onChange={(value) => handleAreaChange(index, value.id)}
                />
                {errors.areasofExpertiseId && (
                  <span className="transition-opacity duration-300 text-[14px] md:text-[18px] text-red-500">
                    {errors.areasofExpertiseId.message}
                  </span>
                )}
              </div>
            )}
          />
        </ItemRow>
      ))}
      <div className="w-full grid">
        <Button
          disabled={canEdit}
          variant="blue"
          onClick={addArea}
          className="justify-self-end w-[226px]">
          <Icon name={'addProject'} />
          <span className="w-full text-center">Add Area</span>
        </Button>
      </div>
    </Section>
  );
};

const Certifications = ({ certifcations }) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext({
    defaultValues: {
      expertCertifications: [],
    },
  });
  const expertCertifications = watch('expertCertifications');
  const [canEdit, setCanEdit] = useState(true);
  const [certificationsState, setCertifications] = useState(
    expertCertifications || []
  );
  const cleanState = (certifications) =>
    certifications.filter((cert) => cert.certificationId !== null);
  const addCertification = () => {
    const newCert = { certificationId: null };
    const updatedCertifications = [...certificationsState, newCert];
    setCertifications(updatedCertifications);

    // Update form value with cleaned data
    setValue('expertCertifications', cleanState(updatedCertifications));
  };
  const removeCeriticaion = (index) => {
    if (certificationsState.length <= 1) {
      message.error('At least one Certification must be selected.');
      return;
    }
    const updatedCertifications = certificationsState.filter(
      (_, i) => i !== index
    );
    setCertifications(updatedCertifications);
    setValue('expertCertifications', updatedCertifications);
  };

  const handleCertificationChange = (index, certificationId) => {
    const updatedCountries = certificationsState.map((cert, i) =>
      i === index ? { ...cert, certificationId } : cert
    );
    setCertifications(updatedCountries);
    setValue('expertCertifications', updatedCountries);
  };

  return (
    <Section
      label={'Certifications'}
      onEdit={() => setCanEdit((prev) => !prev)}>
      {certificationsState.map((cert, index) => (
        <ItemRow
          key={index}
          label={`Certificate ${index + 1}`}
          hasBorder
          canEdit={index === 0 ? false : !canEdit}
          onRemove={() => removeCeriticaion(index)}>
          <Controller
            name={`expertCertifications[${index}].certificationId`}
            control={control}
            defaultValue={cert.name}
            render={({ field }) => (
              <div className="flex flex-col w-full">
                <Select
                  {...field}
                  // removeMaxWidth
                  search
                  variant="green"
                  options={certifcations}
                  onChange={(value) =>
                    handleCertificationChange(index, value.id)
                  }
                  disabled={canEdit}
                />
                {errors.areasofExpertiseId && (
                  <span className="transition-opacity duration-300 text-[14px] md:text-[18px] text-red-500">
                    {errors.areasofExpertiseId.message}
                  </span>
                )}
              </div>
            )}
          />
        </ItemRow>
      ))}
      <div className="w-full grid">
        <Button
          disabled={canEdit}
          variant="blue"
          onClick={addCertification}
          className="justify-self-end w-[226px]">
          <Icon name={'addProject'} />
          <span className="w-full text-center">Add Certification</span>
        </Button>
      </div>
    </Section>
  );
};

export default ExpertDetails;
