import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Button from './Button';

const ProjectSubmission = ({ steps }) => {
  //   {
  //   parentStep: 'generalInfo',
  //   label: 'General Info',
  //   icon: <RenderIcon name={'generalInfo'} />, // Add icons from react-icons or any other source
  //   children: [
  //     {
  //       stepLabel: 'Step 1',
  //       content: (
  //         <div className="font-abel font-bold">
  //           General Info - Step 1 content here
  //         </div>
  //       ),
  //     },
  //     {
  //       stepLabel: 'Step 2',
  //       content: <div>General Info - Step 2 content here</div>,
  //     },
  //   ],
  // },
  const methods = useForm();
  const { trigger } = methods;

  const [currentParentIndex, setCurrentParentIndex] = useState(0);
  const [currentChildIndex, setCurrentChildIndex] = useState(0);

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid) {
      if (currentChildIndex < steps[currentParentIndex].children.length - 1) {
        setCurrentChildIndex(currentChildIndex + 1);
      } else if (currentParentIndex < steps.length - 1) {
        setCurrentParentIndex(currentParentIndex + 1);
        setCurrentChildIndex(0);
      }
    }
  };

  const handlePrevious = () => {
    if (currentChildIndex > 0) {
      setCurrentChildIndex(currentChildIndex - 1);
    } else if (currentParentIndex > 0) {
      setCurrentParentIndex(currentParentIndex - 1);
      setCurrentChildIndex(steps[currentParentIndex - 1].children.length - 1);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full">
        <div className="flex h-full">
          {/* Parent Steps Sidebar */}
          {/* <div className="flex w-1/4 h-full p-4">
            <ul className="w-full flex flex-col gap-5 border-r border-black pr-4 h-[95vh]">
              {steps.map((parentStep, index) => (
                <React.Fragment key={index}>
                  <li key={index}>
                    <button
                      onClick={() => {
                        setCurrentParentIndex(index);
                        setCurrentChildIndex(0);
                      }}
                      className={`text-white h-[100px] w-[90%] relative flex card-green-gradient transition-opacity duration-150 items-center gap-4 text-left px-4 py-2 font-bold bg-black rounded-[12px] ${
                        index === currentParentIndex
                          ? '  border-[5px] border-[#cbff5e]'
                          : 'opacity-50  border-[5px]'
                      }`}>
                      {parentStep.icon}
                      {parentStep.label}
                      {currentParentIndex === index && (
                        <div className="hidden md:block absolute right-[-20px] top-1/2 transform -translate-y-1/2 w-[30px] h-[40px] bg-[#132f19] active-eligible-container" />
                      )}
                    </button>
                  </li>
                </React.Fragment>
              ))}
            </ul>
          </div> */}

          {/* Child Steps Section */}
          <div className="flex w-full p-4">
            <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
              <div className="h-full w-full transition-all duration-200">
                {/* {
                  steps[currentParentIndex].children[currentChildIndex]
                    .stepLabel
                } */}
                {steps[currentParentIndex].children[currentChildIndex].content}
              </div>

              {/* Navigation Buttons */}
              <div className="flex gap-4 w-full justify-end border-t mt-4 pt-2">
                {currentChildIndex > 0 || currentParentIndex > 0 ? (
                  <Button
                    className={'min-w-[150px]'}
                    variant="secondary"
                    type="button"
                    onClick={handlePrevious}>
                    Previous
                  </Button>
                ) : null}

                {currentChildIndex <
                  steps[currentParentIndex].children.length - 1 ||
                currentParentIndex < steps.length - 1 ? (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleNext}
                    className={'min-w-[150px]'}>
                    Save & Next
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    className={'min-w-[150px]'}
                    type="submit">
                    SAVE
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default ProjectSubmission;
