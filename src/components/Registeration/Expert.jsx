import React, { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Input from '../shared/Input';
import dayjs from 'dayjs';
import { Dropdown } from '../shared/Dropdown';
function ExpertContractor({
  tokenData,
  countries,
  certifications,
  areasOfExpertise,
}) {
  const {
    control,
    formState: { errors },

    register,
    watch,
  } = useFormContext({});

  const password = watch('password');

  return (
    <div className="flex flex-col w-full gap-8 my-auto mt-[10%]">
      <div className="flex flex-col">
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
                  variant="borderBottom"
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
                  variant="borderBottom"
                />
              )}
            />
            <div className="h-2">
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
      </div>
      <div>
        <Controller
          name="countryId"
          control={control}
          rules={{
            required: 'Base Country is required',
          }}
          render={({ field }) => (
            <Dropdown
              options={countries}
              search
              placeholder="Base Country"
              onSelectOption={field.onChange}
              value={field.value}
            />
          )}
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
      <Controller
        name="expertCountriesServeds"
        control={control}
        render={({ field }) => (
          <Dropdown
            options={countries}
            placeholder="Countries Served: SAU, ARE, EGY, BHR, MAR, QAT"
            multiSelect
            search
            onSelectOption={(selectedIds) => {
              const selectedCountries = countries
                .filter((country) => selectedIds.includes(country.id))
                .map((country) => ({
                  countryId: country.id,
                }));
              field.onChange(selectedCountries);
            }}
            value={field.value?.map((item) => item.countryId)}
          />
        )}
      />
      <Controller
        name="expertCertifications"
        control={control}
        render={({ field }) => (
          <Dropdown
            options={certifications}
            placeholder="Certifications"
            multiSelect
            search
            onSelectOption={(selectedIds) => {
              const selectedCertifications = certifications
                .filter((cert) => selectedIds.includes(cert.id))
                .map((cert) => ({
                  certificationId: cert.id,
                }));
              field.onChange(selectedCertifications);
            }}
            value={field.value?.map((item) => item.certificationId)}
          />
        )}
      />
      <Controller
        name="expertAreasofExpertises"
        control={control}
        render={({ field }) => (
          <Dropdown
            options={areasOfExpertise}
            placeholder="Filed of Expertise"
            multiSelect
            search
            onSelectOption={(selectedIds) => {
              const selectedExpertiese = areasOfExpertise
                .filter((exp) => selectedIds.includes(exp.id))
                .map((exp) => ({
                  areasofExpertiseId: exp.id,
                }));
              field.onChange(selectedExpertiese);
            }}
            value={field.value?.map((item) => item.areasofExpertiseId)}
          />
        )}
      />
      <label htmlFor="birthDate">
        <Controller
          name="birthDate"
          control={control}
          rules={{ required: 'Birth Date is required' }}
          render={({ field }) => (
            <Input
              {...field}
              type="date"
              placeHolder="YYYY-MM-DD"
              className="w-full py-2 border-0 pl-0  border-b-2 border-[#8c8c8c] outline-none hover:border-b-[#77AF00] focus:border-b-[#77AF00] focus:border-b-2 rounded-none bg-[##F1F1F1] focus:border-transparent focus:ring-0"
              onChange={(date) =>
                field.onChange(date ? dayjs(date).toISOString() : null)
              }
            />
          )}
        />
        <div className="h-2">
          {errors?.birthDate && (
            <p
              className={`text-red-500 transition-opacity duration-300 ${
                errors?.birthDate ? 'opacity-100' : 'opacity-0'
              }`}>
              {errors?.birthDate?.message && (
                <span>{errors?.birthDate?.message}</span>
              )}
            </p>
          )}
        </div>
      </label>
      <label htmlFor="email">
        <Controller
          name="email"
          control={control}
          defaultValue={tokenData?.Email || ''} // Set defaultValue to tokenData.Email if it exists, else empty string
          rules={{
            required: !tokenData?.Email && 'Email is required', // Only required if tokenData.Email is not present
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Invalid email format',
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              placeHolder="Email"
              readOnly={!!tokenData?.Email} // Make field read-only if tokenData.Email exists
              variant="borderBottom"
              value={tokenData?.Email || field.value} // Pre-fill the value if tokenData.Email exists, else use field value
              onChange={(e) => {
                if (!tokenData?.Email) {
                  field.onChange(e); // Only allow onChange if tokenData.Email doesn't exist
                }
              }}
            />
          )}
        />
        <div className="h-2">
          {errors?.email && (
            <p
              className={`text-red-500 transition-opacity duration-300 ${
                errors?.email ? 'opacity-100' : 'opacity-0'
              }`}>
              {errors?.email?.message && <span>{errors?.email?.message}</span>}
            </p>
          )}
          {tokenData && (
            <p
              className={`text-[#8c8c8c] transition-opacity duration-300 ${
                tokenData?.Email ? 'opacity-100' : 'opacity-0'
              }`}>
              <span>You can not edit this field</span>
            </p>
          )}
        </div>
      </label>

      <label htmlFor="phone">
        <Controller
          name="phoneNumber"
          control={control}
          rules={{ required: 'Phone is required' }} // Validation rule
          render={({ field }) => (
            <Input
              {...field}
              type="tel"
              placeHolder="Phone"
              variant="borderBottom"
              autoComplete="tel"
            />
          )}
        />
        <div className="h-2">
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
      </label>
      <div className="flex flex-col">
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id="password"
              type="password"
              name="password"
              placeHolder="Password"
              variant="borderBottom"
              autoComplete={'new-password'}
              {...register('password', {
                required: 'Please enter your password',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&_]{8,}$/,
                  message:
                    'Password must be at least 8 characters, include at least one letter and one number.',
                },
                minLength: {
                  value: 8,
                  message: 'Password must Minimum eight characters',
                },
              })}
            />
          )}
        />

        <div className="h-2">
          {errors?.password && (
            <p
              className={`text-red-500 transition-opacity duration-300 ${
                errors?.password ? 'opacity-100' : 'opacity-0'
              }`}>
              {errors?.password?.message && (
                <span>{errors?.password?.message}</span>
              )}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: 'Please confirm your password',
            validate: (val) => val === password || 'Passwords do not match',
          }}
          render={({ field }) => (
            <Input
              {...field}
              id="Cpassword"
              type="password"
              name="password"
              placeHolder="Confirm Password"
              variant="borderBottom"
              autoComplete={'new-password'}
            />
          )}
        />
        <div className="h-2">
          {errors?.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpertContractor;
