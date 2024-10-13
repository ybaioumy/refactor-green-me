import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  useGetMissionByIdQuery,
  useUpdateMissionMutation,
} from '../../redux/features/expert';
import Section, { ItemRow } from '../shared/Section';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { Controller, useForm, FormProvider } from 'react-hook-form';
import { FileUploader } from '../shared/Upload';
import { message } from 'antd';
import EXPhoto from '../../assets/images/m.png';
import Loader from '../shared/Loader';
import EmptyList from '../shared/EmptyList';
import { AgGridReact } from 'ag-grid-react';
import { getTimeAgo } from '../../utilits/helpers';
import { useSelector } from 'react-redux';
function Mission() {
  const { state } = useLocation();
  const [gridApi, setGridApi] = useState();
  const { mission } = state || {};
  const { userId, expertId, fullName, photo } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const [columnDefs] = useState([
    {
      headerName: 'Mission Code',
      field: 'missionCode',
      headerClass: 'mission-code-header',
    },

    {
      headerName: 'Mission Name',
      field: 'missionName',
      sortable: true,
    },
    {
      headerName: 'Location',
      field: 'location',
      sortable: true,
    },
    {
      headerName: 'Generated Reports',
      field: 'generatedReport',
      // flex: 2,
      sortable: true,
    },
    {
      headerName: 'Assigned by',
      field: 'assignedBy',
      sortable: true,
    },
    {
      headerName: 'Last Update',
      field: 'updated',
      sortable: true,
      filter: true,
      cellRenderer: (params) => {
        return `${getTimeAgo(params.value)}`;
      },
    },
    {
      headerName: 'Status',
      field: 'statusName',
      sortable: true,
    },
    {
      headerName: 'Project Code',
      field: 'projectName',
      headerClass: 'project-code-header', //custom color
      sortable: true,
      // pinned:'right'
    },
  ]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };
  // Initialize useForm
  const methods = useForm({
    defaultValues: {
      missionTitle: '',
      missionLocation: '',
      missionBrief: '',
      generatedReports: '',
      languages: '',
      startDate: '',
      endDate: '',
    },
  });

  const { control, setValue, getValues, handleSubmit } = methods;

  const { data, isLoading, isError } = useGetMissionByIdQuery(mission.id);
  const [updateMission, { isLoading: loadingUpdate, error }] =
    useUpdateMissionMutation(); // Hook for updating mission
  const { documentSections } = data || [];
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('location', data.location);
      setValue('brief', data.brief);
      setValue('generatedReports', data.generatedReports);
      setValue('languages', data.languages);
      setValue('startDate', data.startDate);
      setValue('endDate', data.endDate);
      setValue('projectId', data.projectId);
      setValue('statusId', data.statusId);

      const initialFiles = documentSections.map((section) => ({
        sectionName: section.name,
        files: section.documentFiles,
      }));
      setFileList(initialFiles);
    }
  }, [data, documentSections, setValue]);

  const handleFilesChange = (sectionName, newFiles) => {
    setFileList((prevFileList) =>
      prevFileList.map((section) =>
        section.sectionName === sectionName
          ? { ...section, files: newFiles }
          : section
      )
    );
  };
  // console.log(expert);
  const onSubmit = async (formData) => {
    const updatedData = {
      ...formData,
      id: mission.id,
      assignedToUserId: userId,
      documentSections: fileList.map((section) => ({
        name: section.sectionName,
        documentFiles: section.files,
      })),
    };

    try {
      await updateMission({ id: mission.id, data: updatedData }).unwrap();
      message.success('Mission updated successfully');
      navigate(-1); // Navigate back to mission listing
    } catch (error) {
      console.error('Failed to update mission: ', error);
      message.error(error.message);
    }
  };
  const expertMissionDetails =
    useLocation().pathname.includes('assigned-missions');

  if (isLoading) return <Loader />;
  if (isError) return <EmptyList message={'Error loading mission Data'} />;
  return (
    <div className="p-4 md:w-[100%] md:pl-6">
      <FormProvider {...methods}>
        {expertMissionDetails && (
          <div className="ag-theme-alpine ag-theme-MembersListing h-full bg-[#EFFCFF] md:p-10 rounded-lg w-full m-auto md:my-10">
            <AgGridReact
              rowData={[mission]}
              columnDefs={columnDefs}
              pagination={true}
              domLayout="autoHeight" // Automatically adjust the height to fit the data
              suppressVerticalScroll
              suppressPaginationPanel
              rowHeight={80}
              onGridReady={onGridReady}
            />
          </div>
        )}
        <div className="grid grid-cols-4 gap-10 md:w-1/3">
          <div className="flex flex-col items-center gap-4 col-span-1 ">
            <span className="text-[#1E4A28] text-[18px] font-medium">No.</span>
            <span className="px-4 py-2 bg-[#868686] rounded-md text-white w-[60px] h-[50px] text-center font-semibold flex items-center justify-center">
              {expertId}
            </span>
          </div>
          <div className="flex flex-col items-center gap-4 col-span-1">
            <span className="text-[#1E4A28] text-[18px] font-medium">
              Photo
            </span>
            <div className="w-[50px] h-[50px] bg-gray-300 rounded-full">
              <img
                src={photo || EXPhoto}
                alt="Expert_Image"
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 col-span-2">
            <p className="text-[#1E4A28] text-[18px] font-medium">Name</p>
            <input
              type="text"
              value={fullName || ''}
              readOnly
              className="font-semibold bg-[#E6E6E6] px-4 py-2 rounded-md text-[#3E3E3E] h-full"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="md:w-[70%]">
          <Section label={`Expert Mission ${data?.name || ''}`} canEdit={false}>
            <ItemRow label="Mission Title">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    variant="secondary"
                    placeholder="Mission Title"
                    {...field}
                  />
                )}
              />
            </ItemRow>

            <ItemRow label="Mission Location">
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <Input
                    variant="secondary"
                    placeholder="Mission Location"
                    {...field}
                  />
                )}
              />
            </ItemRow>

            <ItemRow label="Mission Brief">
              <Controller
                name="brief"
                control={control}
                render={({ field }) => (
                  <Input
                    variant="secondary"
                    type="textarea"
                    placeholder="Mission Brief"
                    {...field}
                  />
                )}
              />
            </ItemRow>

            <ItemRow label="Deliverable format">
              <Controller
                name="generatedReports"
                control={control}
                render={({ field }) => (
                  <Input
                    variant="secondary"
                    placeholder="Deliverable Format"
                    {...field}
                  />
                )}
              />
            </ItemRow>

            <ItemRow label="Languages">
              <Controller
                name="languages"
                control={control}
                render={({ field }) => (
                  <Input
                    variant="secondary"
                    placeholder="Languages"
                    {...field}
                  />
                )}
              />
            </ItemRow>

            <ItemRow label="Start Date">
              <Controller
                name="startDate"
                control={control}
                rules={{ required: 'Start Date is required' }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      variant="secondary"
                      type="date"
                      placeholder="Start Date"
                      {...field}
                    />
                    {error && (
                      <span className="text-red-500">{error.message}</span>
                    )}
                  </>
                )}
              />
            </ItemRow>

            <ItemRow label="End Date">
              <Controller
                name="endDate"
                control={control}
                rules={{
                  required: 'End Date is required',
                  validate: (value) => {
                    const startDate = getValues('startDate');
                    if (!startDate)
                      return 'Start Date is required before End Date';
                    return (
                      new Date(value) >= new Date(startDate) ||
                      'End Date cannot be before Start Date'
                    );
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      variant="secondary"
                      type="date"
                      placeholder="End Date"
                      {...field}
                    />
                    {error && (
                      <span className="text-red-500">{error.message}</span>
                    )}
                  </>
                )}
              />
            </ItemRow>
          </Section>

          {fileList.map((section, index) => (
            <FileUploader
              key={index}
              label={section.sectionName}
              data={section.files}
              handleFileChange={(newFiles) =>
                handleFilesChange(section.sectionName, newFiles)
              }
              value={section.files}
            />
          ))}

          <div className="mt-6 w-full place-content-end grid ">
            <Button variant="secondary" type="submit" isLoading={loadingUpdate}>
              Update Mission
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default Mission;
