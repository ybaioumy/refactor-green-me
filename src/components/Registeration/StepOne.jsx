import React, { useEffect } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Loader from '../shared/Loader';
import { useGetTypesQuery } from '../../redux/features/auth';
import EmptyList from '../shared/EmptyList';

function UserType({ registerData, setRegisterData, tokenData }) {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext(); // useForm hook
  const { data, isLoading, isError } = useGetTypesQuery();

  // If tokenData is available, set the default TypeId in registerData
  useEffect(() => {
    if (tokenData?.TypeId) {
      setRegisterData((prevData) => ({
        ...prevData,
        typesId: Number(tokenData.TypeId),
      }));
      setValue('typesId', Number(tokenData.TypeId)); // Set the form value for validation
    }
  }, [tokenData, setRegisterData, setValue]);

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    setRegisterData((prevData) => ({
      ...prevData,
      typesId: id,
    }));
  };

  if (isLoading) return <Loader />;
  if (isError) return <EmptyList />;

  return (
    <div className="flex flex-col w-full my-auto">
      <div className="flex flex-col gap-4">
        {/* Error message for typesId */}
        <div className="h-2 mb-4">
          {errors.typesId && (
            <span className="transition-opacity duration-300 text-[14px] md:text-[18px] text-red-500">
              {errors.typesId.message}
            </span>
          )}
        </div>

        {/* If tokenData exists, show message that the field can't be edited */}
        {tokenData && (
          <div className="h-2 mb-4">
            <p
              className={`text-[#8c8c8c] transition-opacity duration-300 ${
                tokenData?.TypeId ? 'opacity-100' : 'opacity-0'
              }`}>
              <span className="text-[14px] md:text[18px]">
                You cannot edit this field
              </span>
            </p>
          </div>
        )}

        {/* Render the checkboxes */}
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <div className="flex items-center gap-8">
              <Controller
                name="typesId"
                control={control}
                rules={{ required: 'User type is required' }} // Validation rule
                render={({ field }) => (
                  <input
                    type="checkbox"
                    checked={
                      (tokenData?.TypeId && tokenData.TypeId === item.id) || // Pre-check if TypeId matches
                      field.value === item.id // Normal behavior for form value
                    }
                    onChange={() => {
                      field.onChange(item.id); // Set the value in the form for validation
                      handleCheckboxChange(item.id); // Update registerData state
                    }}
                    className="accent-[#1d4628]"
                    disabled={tokenData && tokenData.Email !== undefined} // Disable if tokenData.Email is present
                  />
                )}
              />
              <label className="ml-2 text-lg text-[#1d4628] font-bold">
                {item.name}
              </label>
            </div>
            <hr className="my-4 border-1 border-gray-300" />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default UserType;
