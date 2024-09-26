// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useGetMissionByIdQuery } from '../../redux/features/expert';
// import Section, { ItemRow } from '../shared/EditableSection';
// import Input from '../shared/Input';
// import Button from '../shared/Button';
// import { Controller, useFormContext, FormProvider } from 'react-hook-form';

// function Mission() {
//   const { state } = useLocation();
//   const { control, setValue, getValues } = useFormContext();
//   const { mission: { id } = {} } = state || {};

//   const { data, isLoading, isError } = useGetMissionByIdQuery(id);

//   // Update the form values when the data is fetched
//   useEffect(() => {
//     if (data) {
//       setValue('missionTitle', data.missionTitle || '');
//       setValue('missionLocation', data.missionLocation || '');
//       setValue('missionBrief', data.missionBrief || '');
//       setValue('deliverableFormat', data.deliverableFormat || '');
//       setValue('languages', data.languages || '');
//       setValue('startDate', data.startDate || '');
//       setValue('endDate', data.endDate || '');
//     }
//   }, [data, setValue]);

//   if (isLoading) return <p>Loading...</p>;
//   if (isError) return <p>Error loading mission data</p>;
//   return <></>;
//   return (
//     <FormProvider>
//       <Section label={`Expert Mission ${data?.name || ''}`}>
//         <ItemRow label="Mission Title">
//           <Controller
//             name="missionTitle"
//             control={control}
//             render={({ field }) => (
//               <Input
//                 variant="secondery"
//                 placeHolder="Mission Title"
//                 {...field}
//               />
//             )}
//           />
//         </ItemRow>

//         <ItemRow label="Mission Location">
//           <Controller
//             name="missionLocation"
//             control={control}
//             render={({ field }) => (
//               <Input
//                 variant="secondery"
//                 placeHolder="Mission Location"
//                 {...field}
//               />
//             )}
//           />
//         </ItemRow>

//         <ItemRow label="Mission Brief">
//           <Controller
//             name="missionBrief"
//             control={control}
//             render={({ field }) => (
//               <Input
//                 variant="secondery"
//                 type="textarea"
//                 placeHolder="Mission Brief"
//                 {...field}
//               />
//             )}
//           />
//         </ItemRow>

//         <ItemRow label="Deliverable format">
//           <Controller
//             name="deliverableFormat"
//             control={control}
//             render={({ field }) => (
//               <Input
//                 variant="secondery"
//                 placeHolder="Deliverable Format"
//                 {...field}
//               />
//             )}
//           />
//         </ItemRow>

//         <ItemRow label="Languages">
//           <Controller
//             name="languages"
//             control={control}
//             render={({ field }) => (
//               <Input variant="secondery" placeHolder="Languages" {...field} />
//             )}
//           />
//         </ItemRow>

//         <ItemRow label="Start Date">
//           <Controller
//             name="startDate"
//             control={control}
//             rules={{
//               required: 'Start Date is required',
//             }}
//             render={({ field, fieldState: { error } }) => (
//               <>
//                 <Input
//                   variant="secondery"
//                   type="date"
//                   placeHolder="Start Date"
//                   {...field}
//                 />
//                 {error && <span className="text-red-500">{error.message}</span>}
//               </>
//             )}
//           />
//         </ItemRow>

//         <ItemRow label="End Date">
//           <Controller
//             name="endDate"
//             control={control}
//             rules={{
//               required: 'End Date is required',
//               validate: (value) => {
//                 const startDate = getValues('startDate');
//                 if (!startDate) return 'Start Date is required before End Date';
//                 return (
//                   new Date(value) >= new Date(startDate) ||
//                   'End Date cannot be before Start Date'
//                 );
//               },
//             }}
//             render={({ field, fieldState: { error } }) => (
//               <>
//                 <Input
//                   variant="secondery"
//                   type="date"
//                   placeHolder="End Date"
//                   {...field}
//                 />
//                 {error && <span className="text-red-500">{error.message}</span>}
//               </>
//             )}
//           />
//         </ItemRow>

//         <div className="flex justify-end absolute -top-6 right-3 gap-2">
//           <Button
//             variant="secondary"
//             className="w-[60px] h-[60px]"
//             //   onClick={() => handleDelete()}
//             hasIcon
//             iconName="delete"
//           />
//           <Button
//             variant="secondary"
//             className="w-[60px] h-[60px]"
//             //   onClick={handleAdd}
//             hasIcon
//             iconName="addProjectGreen"
//           />
//         </div>
//       </Section>
//     </FormProvider>
//   );
// }

// export default Mission;
import React from 'react'

function Mission() {
  return (
    <div>Mission</div>
  )
}

export default Mission