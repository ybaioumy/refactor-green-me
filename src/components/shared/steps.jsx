import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Button from './Button';
import { Link } from 'react-router-dom';
import Title from './Title';
import { useLocation } from 'react-router-dom';
import alertValidationMessage from '../../utilits/alertMessage';
const Steps = ({ steps, hasLink = false, onSave, isLoading = false }) => {
  const methods = useForm();
  const location = useLocation();
  const {
    trigger,
    getValues,
    formState: { errors },
  } = methods;

  const [currentParentIndex, setCurrentParentIndex] = useState(0);
  const [currentChildIndex, setCurrentChildIndex] = useState(0);
  useEffect(() => {
    console.warn(
      'checking validations for step ' +
        currentParentIndex +
        ' at ' +
        location.pathname
    );
    if (Object.keys(errors).length > 0) {
      console.error(
        errors,
        'errors at ' + location.pathname + currentParentIndex
      );
      alertValidationMessage(errors); // Automatically calls alert function when there are errors
    }
  }, [currentParentIndex, errors, location.pathname]); // Listen for changes in the `errors` object

  const handleNext = async () => {
    const isValid = await trigger();
    if (!isValid) {
      alertValidationMessage(errors);
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

  const onSubmit = async (data) => {
    const isValid = await trigger(); // Validate form before saving
    if (!isValid) {
      alertValidationMessage(errors); // Alert if validation fails
    } else {
      onSave(data); // Call the onSave function if the form is valid
    }
  };
  const childrenLength = steps[currentParentIndex]?.children?.length || 0;

  return (
    <FormProvider {...methods}>
      <div className="w-full h-full ">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            {' '}
            <Title
              text={steps[currentParentIndex]?.label}
              type="h3"
              className={'font-bold text-[24px]'}
            />
            {steps[currentParentIndex]?.icon}
          </div>
          <div className="flex gap-2 w-fit">
            {Array.from({ length: childrenLength }).map((_, index) => (
              <span
                key={index}
                className={`h-1 w-10 rounded-lg ${
                  currentChildIndex === index ? 'stepsSpan' : 'bg-gray-300'
                }`}></span>
            ))}
          </div>
        </div>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full flex flex-col justify-between min-h-full mt-2">
          {steps[currentParentIndex]?.children[currentChildIndex]
            ?.childLabel && (
            <div className="bg-card rounded-lg py-2 px-5 mb-5 mt-5">
              <Title
                text={
                  steps[currentParentIndex]?.children[currentChildIndex]
                    ?.childLabel || ''
                }
                type="h3"
                className={'font-bold text-[20px]'}
              />
            </div>
          )}

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
