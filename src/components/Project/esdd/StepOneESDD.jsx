import React from 'react';
import QuestionBox from '../../shared/QuestionBox';
import { useFormContext, Controller } from 'react-hook-form';
import { IoMdAdd } from 'react-icons/io';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import { MdDelete } from 'react-icons/md';
import Icon from '../../shared/Icon';
import NumericInput from '../../shared/NumericInput';
import { ChangeInProjectDocumentSections } from '../../../redux/slices/project';
import { useDispatch } from 'react-redux';
function StepOneESDD({ title, project, updateProjectEsdd }) {
  const { control, watch, setValue } = useFormContext();
  const esdd = watch('esdd');
  const documentSections = watch('documentSections');
  const documents = project.documentSections;
  console.log(documents);
  console.log(documentSections);
  const dispatch = useDispatch();
  const handleFileChange = (info, name) => {
    if (info.file.status === 'done') {
      message.success('File Uploaded Successfully');
      console.log(`${info.file.name} file uploaded successfully`);

      // Find the relevant section by name and append the file to its documentFiles array
      const updatedDocumentSections = documentSections.map((section) => {
        if (section.name === name) {
          return {
            ...section,
            documentFiles: [
              ...section.documentFiles,
              info.file.response?.fullPath, // Append the new file path
            ],
          };
        }
        return section;
      });

      // Dispatch the action to update the Redux store
      dispatch(
        ChangeInProjectDocumentSections({
          indicator: 'plus',
          object: { name: name, filePath: info.file.response?.fullPath },
        })
      );

      // Update form state to reflect the changes
      setValue('documentSections', updatedDocumentSections);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <QuestionBox title={'Energy and Resource Efficiency'}>
      <div className="question-box">
        <h3>{title}</h3>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col gap-10 lg:w-[45%]">
            <div className="flex flex-col gap-4">
              <p className="text-[#1E4A28] font-[700] text-[16px]">
                Does your proposed project contribute to improving energy and
                resource efficiency?
              </p>
              <Controller
                name="esdd.doesEnergyResourceEfficiency"
                control={control}
                // defaultValue={project?.esdd?.doesEnergyResourceEfficiency || ''}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full lg:w-[50%] rounded py-2 px-1"
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[#1E4A28] font-[700] text-[16px]">
                Please quantify the energy/resource efficiency that your
                proposed project
              </p>
              <Controller
                control={control}
                name="esdd.quantifyEnergyResourceEfficiency"
                render={({ field }) => <NumericInput {...field} />}
              />
            </div>
          </div>
          <div className="flex flex-col gap-10 lg:w-[45%]">
            <div className="flex flex-col gap-4">
              <p className="text-[#1E4A28] font-bold text-[16px]">
                Explain how the project improves energy/resource efficiency
                <span className="font-normal">{` (${
                  project?.esdd?.explainEnergyResourceEfficiency?.length || 0
                }/120 characters)`}</span>
              </p>
              <Controller
                name="esdd.explainEnergyResourceEfficiency"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    maxLength={120}
                    className="w-full border border-[#000] rounded-md py-[25px] px-[24px]"
                    placeholder="(txt/input)"
                  />
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[#1E4A28] font-[700] text-[16px]">
                Documentation supporting the energy/resource efficiency claimed
              </p>
              <p className="text-[#1E4A28] font-[700] text-[10px]">
                Click the button below to upload your files.
              </p>
              <div className="w-full lg:w-[50%] bg-[#BFE0C6] p-6 flex flex-col gap-8 rounded-[11px] border border-dashed border-[#bfe0c6]">
                <div className="flex w-full items-center justify-center">
                  <Upload
                    showUploadList={false}
                    name="file"
                    action={`${process.env.REACT_APP_API_BASE}FileUpload/upload`}
                    onChange={(e) => {
                      handleFileChange(e, 'Energy-and-Resource-Efficiency');
                    }}>
                    <div className="bg-[#D8F992] p-5 rounded-full">
                      <IoMdAdd />
                    </div>
                  </Upload>
                </div>
                {project?.documentSections
                  ?.filter(
                    (x) => x.name === 'Energy-and-Resource-Efficiency'
                  )[0]
                  ?.documentFiles?.map((file, index) => (
                    <div className="flex items-center gap-8" key={index}>
                      <a
                        className="ant-upload-drag-icon"
                        href={file.filePath}
                        download
                        target="_blank"
                        rel="noreferrer">
                        <InboxOutlined />
                        Energy-and-Resource-Efficiency - file No. {index + 1}
                      </a>
                      <button
                        onClick={() => {
                          dispatch(
                            ChangeInProjectDocumentSections({
                              indicator: 'delete',
                              object: {
                                name: 'Energy-and-Resource-Efficiency',
                                filePath: file.filePath,
                              },
                            })
                          );
                        }}>
                        <MdDelete />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </QuestionBox>
  );
}

export default StepOneESDD;
