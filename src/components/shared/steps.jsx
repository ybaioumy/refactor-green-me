import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Button from './Button';
import { Link } from 'react-router-dom';

const Steps = ({ steps, hasLink = false }) => {
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
  // const methods = useForm({
  //   mode: 'onSubmit', // Errors will only show on submit
  // });
  // const {
  //   trigger,
  //   formState: { errors },
  // } = methods;

  return (
    <FormProvider {...methods}>
      <div className="w-full h-full">
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

        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-between min-h-full">
          <div className="h-full w-full my-auto transition-all duration-200">
            {/* {
                  steps[currentParentIndex].children[currentChildIndex]
                    .stepLabel
                } */}
            {steps[currentParentIndex].children[currentChildIndex].content}
          </div>
          {/* {errors && (
            <div className="text-red-500">
              {Object.keys(errors).length > 0 && (
                <span>Please fix the errors before proceeding.</span>
              )}
            </div>
          )} */}
          {/* Navigation Buttons */}

          <div className="flex flex-col md:flex-row-reverse mt-4 gap-3 justify-between items-center pb-2">
            <div className="flex items-center gap-5">
              {currentChildIndex > 0 || currentParentIndex > 0 ? (
                <Button
                  className={'min-w-[150px]'}
                  variant="secondary"
                  type="button"
                  hasIcon
                  iconPosition="left"
                  iconName={'arrow-left'}
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
                  hasIcon
                  iconName={'arrow-right'}
                  iconPosition="right"
                  className={'min-w-[150px]'}>
                  Next
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
            {hasLink && (
              <p className="text-[#809F87]  gap-2 items-center font-abel inline-flex">
                Already have an account?
                <Link
                  className="underline font-semibold text-[#1E4A28] font-abel"
                  to="/">
                  Login
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default Steps;
