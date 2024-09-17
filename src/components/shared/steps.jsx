import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Button from './Button';
import { Link } from 'react-router-dom';

const Steps = ({ steps, hasLink = false, onSave, isLoading = false }) => {
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
      alertValidationMessage(errors); // Display validation errors
    } else {
      // Move to the next child step or parent step
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

  const alertValidationMessage = (errors) => {
    const messages = [];

    // Iterate over the error object and extract messages
    for (const key in errors) {
      if (errors[key]?.message) {
        messages.push(errors[key].message);
      }
    }

    const combinedMessage = messages.join('\n');

    if (combinedMessage) {
      alert(combinedMessage); // Show alert for validation errors
    }
  };


  const onSubmit = async (data) => {
    const isValid = await trigger(); // Validate form before saving
    if (!isValid) {
      alertValidationMessage(errors); // Alert if validation fails
    } else {
      onSave(data); // Call the onSave function if the form is valid
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full h-full">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-between min-h-full">
          <div className="h-full min-h-[70vh] w-full my-auto transition-all duration-200">
            {steps[currentParentIndex]?.children[currentChildIndex]?.content ||
              null}
          </div>

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
                  onClick={methods.handleSubmit(onSubmit)}>
                  SAVE
                </Button>
              )}
            </div>

            {hasLink && (
              <p className="text-[#809F87] gap-2 items-center font-abel inline-flex">
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
