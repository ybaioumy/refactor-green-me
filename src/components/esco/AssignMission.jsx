import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Section, { ItemRow } from '../shared/EditableSection';
import Input from '../shared/Input';
import EmptyList from '../shared/EmptyList';
import Button from '../shared/Button';
import RadioButton from '../shared/RadioButton';
import {
  useCreateNewMissionMutation,
  useGetMissionStatusQuery,
} from '../../redux/features/expert';
import { FileUploader } from '../shared/Upload';
import { message } from 'antd';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import EXPhoto from '../../assets/images/m.png';
const AssignMission = () => {
  
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sections: [
        {
          id: 1,
          missionTitle: '',
          missionLocation: '',
          missionBrief: '',
          deliverableFormat: '',
          languages: '',
          startDate: '',
          endDate: '',
          readOnly: false,
        },
      ],
      fileList: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sections',
  });

  const [createNewMission, { isLoading: isLoadingCreate }] =
    useCreateNewMissionMutation();
  const {
    data: missionsStatus,
    isLoading: isLoadingStatus,
    isError: isErrorStatus,
  } = useGetMissionStatusQuery();
  const { state } = useLocation();
  const { expert, projectId } = state || {};
  const newSectionRef = useRef(null);
  const fileList = watch('fileList');
  const pendingStatusId = missionsStatus?.find(
    (item) => item.name === 'Task Assigned'
  )?.id;

  useEffect(() => {
    if (newSectionRef.current) {
      newSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [fields]);
  console.log(watch());
  const handleAdd = () => {
    append({
      id: fields.length ? fields[fields.length - 1].id + 1 : 1,
      missionTitle: '',
      missionLocation: '',
      missionBrief: '',
      deliverableFormat: '',
      languages: '',
      startDate: '',
      endDate: '',
      readOnly: false,
    });
    newSectionRef.current = { id: fields.length + 1 };
  };

  const handleDelete = (index) => {
    if (fields.length === 1) {
      message.warning('At least one section is required');
      return;
    }
    remove(index);
  };

  const handleFilesChange = (fileList) => setValue('fileList', fileList);

  const handleCreateMission = async (data) => {
    const sections = data.sections;
    const fileList = data.fileList || [];

    // if (fileList.length === 0) {
    //   message.error('Please select a file to upload.');
    //   return;
    // }

    const filesData = fileList
      ? fileList.map((file) => ({
          filePath: file?.response?.fullPath,
        }))
      : [];

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      if (!section.startDate || !section.endDate) {
        message.error(`Start date is required for mission ${i + 1}`);
        return;
      }
      if (new Date(section.endDate) < new Date(section.startDate)) {
        message.error(
          `End date cannot be before start date for mission ${i + 1}`
        );
        return;
      }
    }

    const missionsData = sections.map((section, index) => ({
      assignedToUserId: expert?.id || null,
      projectId: Number(projectId),
      statusId: pendingStatusId,
      name: section.missionTitle,
      location: section.missionLocation,
      brief: section.missionBrief,
      generatedReports: section.deliverableFormat,
      languages: section.languages,
      startDate: section.startDate,
      endDate: section.endDate,
      documentSection: {
        name: `Mission ${index} documents for Project ${projectId}`,
        isapproved: true,
        documentFiles: filesData,
      },
    }));

    try {
      const response = await createNewMission(missionsData).unwrap();
      if (response) {
        message.success('Missions added successfully');
        reset();
      } else {
        message.error('Some missions failed to upload');
      }
    } catch (error) {
      message.error('Assigning missions failed');
    }
  };
  // console.log(fileList);
  return (
    <div className="p-6 justify-center items-center w-full">
      <form onSubmit={handleSubmit(handleCreateMission)}>
        <div className="grid grid-cols-4 gap-10 md:w-1/3">
          <div className="flex flex-col items-center gap-4 col-span-1 ">
            <span className="text-[#1E4A28] text-[18px] font-medium">No.</span>
            <span className="px-4 py-2 bg-[#868686] rounded-md text-white w-[60px] h-[50px] text-center font-semibold flex items-center justify-center">
              {expert?.expertId}
            </span>
          </div>
          <div className="flex flex-col items-center gap-4 col-span-1">
            <span className="text-[#1E4A28] text-[18px] font-medium">
              Photo
            </span>
            <div className="w-[50px] h-[50px] bg-gray-300 rounded-full">
              <img
                src={expert?.profileImage || EXPhoto}
                alt="Expert_Image"
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 col-span-2">
            <p className="text-[#1E4A28] text-[18px] font-medium">Name</p>
            <input
              type="text"
              value={expert?.expertName || ''}
              readOnly
              className="font-semibold bg-[#E6E6E6] px-4 py-2 rounded-md text-[#3E3E3E] h-full"
            />
          </div>
        </div>

        {fields.map((section, index) => (
          <div className="md:w-[70%]" key={index}>
            <Section
              key={section.id}
              label={`Expert Mission ${index + 1}`}
              ref={index === fields.length - 1 ? newSectionRef : null}>
              <ItemRow label="Mission Title">
                <Controller
                  name={`sections.${index}.missionTitle`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      variant="secondery"
                      placeHolder={'Mission Title'}
                      readOnly={section.readOnly}
                      {...field}
                    />
                  )}
                />
              </ItemRow>

              <ItemRow label="Mission Location">
                <Controller
                  name={`sections.${index}.missionLocation`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      variant="secondery"
                      placeHolder={'Mission Location'}
                      readOnly={section.readOnly}
                      {...field}
                    />
                  )}
                />
              </ItemRow>

              <ItemRow label="Mission Brief">
                <Controller
                  name={`sections.${index}.missionBrief`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      variant="secondery"
                      type="textarea"
                      placeHolder={'Mission Brief'}
                      readOnly={section.readOnly}
                      {...field}
                    />
                  )}
                />
              </ItemRow>

              <ItemRow label="Deliverable format">
                <Controller
                  name={`sections.${index}.deliverableFormat`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      variant="secondery"
                      placeHolder={'Deliverable Format'}
                      readOnly={section.readOnly}
                      {...field}
                    />
                  )}
                />
              </ItemRow>

              <ItemRow label="Languages">
                <Controller
                  name={`sections.${index}.languages`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      variant="secondery"
                      placeHolder={'Languages'}
                      readOnly={section.readOnly}
                      {...field}
                    />
                  )}
                />
              </ItemRow>

              <ItemRow label="Start Date">
                <Controller
                  name={`sections.${index}.startDate`}
                  control={control}
                  rules={{
                    required: 'Start Date is required', // Required validation
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input
                        variant="secondery"
                        type="date"
                        placeHolder="Start Date"
                        readOnly={section.readOnly}
                        {...field}
                      />
                      {error && (
                        <span className="text-red-500">{error.message}</span>
                      )}{' '}
                      {/* Error message */}
                    </>
                  )}
                />
              </ItemRow>

              <ItemRow label="End Date">
                <Controller
                  name={`sections.${index}.endDate`}
                  control={control}
                  rules={{
                    required: 'End Date is required', // Required validation
                    validate: (value) => {
                      const startDate = getValues(
                        `sections.${index}.startDate`
                      ); // Get the startDate value
                      if (!startDate)
                        return 'Start Date is required before End Date';
                      return (
                        new Date(value) >= new Date(startDate) ||
                        'End Date cannot be before Start Date'
                      ); // Custom validation
                    },
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Input
                        variant="secondery"
                        type="date"
                        placeHolder="End Date"
                        readOnly={section.readOnly}
                        {...field}
                      />
                      {error && (
                        <span className="text-red-500">{error.message}</span>
                      )}{' '}
                      {/* Error message */}
                    </>
                  )}
                />
              </ItemRow>

              <div className="flex justify-end absolute -top-6 right-3 gap-2">
                <Button
                  variant="secondary"
                  className={'w-[60px] h-[60px]'}
                  onClick={() => handleDelete(index)}
                  hasIcon
                  iconName={'delete'}
                />

                <Button
                  variant="secondary"
                  className={'w-[60px] h-[60px]'}
                  onClick={handleAdd}
                  hasIcon
                  iconName={'addProjectGreen'}
                />
              </div>
            </Section>
          </div>
        ))}

        <div className="mt-6 md:w-[70%]">
          <h2 className="font-medium text-lg">Upload Files</h2>
          <FileUploader
            data={fileList}
            handleFileChange={handleFilesChange}
            disabled={isLoadingCreate}
            value={fileList}
          />
        </div>

        <div className="mt-6 w-full place-content-end grid ">
          <Button variant="secondary" type="submit" isLoading={isLoadingCreate}>
            Assign Missions
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssignMission;
export const PermissionComponent = ({ data, setSelectedPermissions }) => {
  // Initial state to hold selected permission IDs for each category
  const [permissions, setPermissions] = useState({
    GeneralInfo: null,
    TechnicalInfo: null,
    Essd: null,
    EconomicViability: null,
  });

  // Mapping the permission names to category fields for easier access
  const permissionMap = {
    // GeneralInfo: {
    //   View: data?.find((perm) => perm?.name === 'GeneralInfo.View')?.id,
    //   Edit: data?.find((perm) => perm?.name === 'GeneralInfo.Edit')?.id,
    // },
    TechnicalInfo: {
      View: data?.find((perm) => perm?.name === 'TechnicalInfo.View')?.id,
      Edit: data?.find((perm) => perm?.name === 'TechnicalInfo.Edit')?.id,
    },
    Essd: {
      View: data?.find((perm) => perm?.name === 'Essd.View')?.id,
      Edit: data?.find((perm) => perm?.name === 'Essd.Edit')?.id,
    },
    EconomicViability: {
      View: data?.find((perm) => perm?.name === 'EconomicViability.View')?.id,
      Edit: data?.find((perm) => perm?.name === 'EconomicViability.Edit')?.id,
    },
  };

  const handlePermissionChange = (category, value) => {
    setPermissions((prev) => ({
      ...prev,
      [category]: value,
    }));
  };

  // Update selected permissions when the permissions state changes
  useEffect(() => {
    const selected = Object.values(permissions).filter((id) => id !== null);
    setSelectedPermissions(selected); // Update parent component with selected permission IDs
  }, [permissions, setSelectedPermissions]);
  if (!data || data.length === 0) return <EmptyList />;
  // console.log(permissions);
  return (
    <>
      <p className="font-bold text-[#1E4A28] text-[20px] border-b border-[#54A967] pb-2">
        Project Permissions
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {/* //generl info to be added */}
        {['TechnicalInfo', 'Essd', 'EconomicViability'].map((category) => (
          <div key={category} className="md:p-4">
            <h3 className="mb-2 font-bold text-[20px] text-[#1E4A28]">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <div className="flex flex-col items-start justify-between bg-[#EFEFEF] p-4 rounded-[15px] md:h-[150px] md:w-[300px]">
              <label className="inline-flex items-center mb-2">
                <RadioButton
                  label={'No Access'}
                  name={category}
                  // value={null} // No ID for No Access
                  checked={permissions[category] === null}
                  onChange={() => handlePermissionChange(category, null)}
                  variant="green"
                />
              </label>
              <label className="inline-flex items-center mb-2">
                <RadioButton
                  label={'View'}
                  name={category}
                  value={permissionMap[category]?.View}
                  checked={
                    permissions[category] === permissionMap[category]?.View
                  }
                  onChange={() =>
                    handlePermissionChange(
                      category,
                      permissionMap[category]?.View
                    )
                  }
                  variant="green"
                />
              </label>
              <label className="inline-flex items-center">
                <RadioButton
                  label={'Edit'}
                  name={category}
                  value={permissionMap[category]?.Edit}
                  checked={
                    permissions[category] === permissionMap[category]?.Edit
                  }
                  onChange={() =>
                    handlePermissionChange(
                      category,
                      permissionMap[category]?.Edit
                    )
                  }
                  variant="green"
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
