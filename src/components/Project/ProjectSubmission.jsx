import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Button from '../shared/Button';
import { Link } from 'react-router-dom';
import EmptyList from '../shared/EmptyList';

const NewProjectSubmission = ({
  steps,
  hasLink = false,
  onSave,
  isLoading = false,
}) => {
 
  const methods = useForm();
  const {
    trigger,
    formState: { errors },
  } = methods;

  const [currentParentIndex, setCurrentParentIndex] = useState(0);
  const [currentChildIndex, setCurrentChildIndex] = useState(0);

  const handleNext = async () => {
    const isValid = await trigger();
    if (!isValid) {
      alertValidationMessage(errors);
    }
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

  const alertValidationMessage = (errors) => {
    // Create an array to hold all the messages
    const messages = [];

    // Iterate over the error object
    for (const key in errors) {
      if (errors[key].message) {
        // Add each message to the messages array
        messages.push(errors[key].message);
      }
    }

    // Join all messages into a single string, separated by new lines
    const combinedMessage = messages.join('\n');

    // Show the combined message in a single alert
    if (combinedMessage) {
      alert(combinedMessage);
    }
  };
  if (!steps) return <EmptyList message={'No Project Details found'} />;
  return (
    <FormProvider {...methods}>
      <div className="w-full h-full flex flex-col md:flex-row md:p-4 p-2 overflow-hidden">
        {/* Parent Steps Sidebar */}
        <div className="flex flex-col md:flex-row w-full h-fit md:h-full md:p-4 flex-1">
          <ul className="w-full md:w-auto flex md:flex-col md:gap-5 gap-2 md:border-r border-black pr-4 md:h-[95vh] overflow-x-scroll md:overflow-y-scroll no-scrollbar">
            {steps.map((parentStep, index) => (
              <React.Fragment key={index}>
                <li className="h-fit">
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentParentIndex(index);
                      setCurrentChildIndex(0);
                    }}
                    className={`text-white w-full md:h-[100px] relative flex sm:min-w-[150px] items-center gap-4 text-left px-4 py-2 font-bold rounded-[12px] card-green-gradient transition-opacity duration-150 ${
                      index === currentParentIndex
                        ? 'border-[3px] md:border-[5px] border-[#cbff5e]'
                        : 'opacity-50 border-[3px] md:border-[5px]'
                    }`}>
                    {parentStep.icon}
                    {parentStep.label}
                    {currentParentIndex === index && (
                      <div className="hidden md:block absolute right-[-20px] top-1/2 transform -translate-y-1/2 w-[30px] h-[40px] bg-[#122c18] active-eligible-container" />
                    )}
                  </button>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>

        {/* Child Steps Section */}

        <form
          onSubmit={methods.handleSubmit(onSave)}
          className="w-full flex flex-col justify-between min-h-full flex-1 md:p-4 p-2">
          <div className="h-full min-h-[70vh] w-full my-auto transition-all duration-200">
            {/* {
                  steps[currentParentIndex].children[currentChildIndex]
                    .stepLabel
                } */}
            {steps[currentParentIndex]?.children[currentChildIndex]?.content ||
              null}
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
                  type="button"
                  isLoading={isLoading}
                  disabled={isLoading}
                  onClick={methods.handleSubmit(onSave)}>
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

export default NewProjectSubmission;
