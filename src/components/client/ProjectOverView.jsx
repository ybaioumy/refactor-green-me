import { useForm } from 'react-hook-form';
import { useUpdateProjectByIdMutation } from '../../redux/features/project';
import Button from '../shared/Button';
import { useParams } from 'react-router-dom';

import { useStep, StepProvider } from '../../context/formContext';
import ScrollToTop from '../shared/ScrollToTop';
const ProjectOverView = ({ steps }) => {
  const { id } = useParams();
  const [updateProjectById] = useUpdateProjectByIdMutation();

  const {
    currentParentIndex,
    currentChildIndex,
    handleNext,
    handlePrevious,
    setCurrentChildIndex,
    setCurrentParentIndex,
    isLoading,
    onSubmit,
  } = useStep();

  const methods = useForm({
    defaultValues: {},
    mode: 'onChange',
  });

  const childrenLength = steps[currentParentIndex]?.children?.length || 0;
  //TODO: Disable parent tabs if not category selected
  return (
    <div className="w-full h-full flex flex-col md:flex-row md:p-4 p-2 overflow-hidden">
      <div className="flex md:w-[22%] md:max-w-[22%] lg:max-w-[23%] h-fit md:h-full md:p-4 flex-1">
        <ul className="w-full flex md:flex-col md:gap-5 gap-2 md:border-r border-black pr-4 md:h-[95vh] overflow-x-scroll no-scrollbar">
          {steps.map((parentStep, index) => (
            <li key={index} className="h-fit">
              <button
                type="button"
                onClick={() => {
                  setCurrentParentIndex(index);
                  setCurrentChildIndex(0);
                }}
                className={`text-white md:h-[100px] h-[100px] w-fit transition-all  md:w-[90%] relative flex justify-center lg:justify-start min-w-[220px] md:min-w-[120px] items-center gap-4 text-left px-4 py-2 font-bold  rounded-[12px] card-green-gradient  duration-150  ${
                  index === currentParentIndex
                    ? 'border-[3px]  md:border-[5px] border-[#cbff5e] '
                    : 'opacity-50  border-[3px] md:border-[5px]'
                }`}>
                <span>{parentStep.icon}</span>
                <p className="font-bold capitalize hidden lg:block text-[20px]  text-wrap leading-tight truncate">
                  {' '}
                  {parentStep.label}
                </p>
                {currentParentIndex === index && (
                  <div className="hidden md:block absolute right-[-20px] top-1/2 transform -translate-y-1/2 w-[30px] h-[40px]  active-eligible-container" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-between min-h-full flex-1 md:p-4 p-2">
        <div className="h-full min-h-[70vh] w-full my-auto pb-4 transition-all duration-200">
          <div className="flex flex-col gap-2 mb-4">
            {' '}
            <div className="flex gap-2 w-full justify-between">
              <div className="flex gap-2 w-fit">
                {Array.from({ length: childrenLength }).map((_, index) => (
                  <span
                    role="button"
                    onClick={() => {
                      setCurrentChildIndex(index);
                    }}
                    key={index}
                    className={`h-1 w-10 rounded-lg ${
                      currentChildIndex === index ? 'stepsSpan' : 'bg-gray-300'
                    }`}></span>
                ))}
              </div>
              {steps[currentParentIndex]?.children[currentChildIndex]
                .stepIcon || null}
              {/* <button>Proposals</button> */}
            </div>
            {steps[currentParentIndex]?.children[currentChildIndex].stepLabel}
          </div>
          {steps[currentParentIndex]?.children[currentChildIndex]?.content ||
            null}
        </div>

        <div className="flex items-center place-content-end gap-5 border-t border-[#CBCBCB] pt-2">
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

          {currentChildIndex < steps[currentParentIndex].children.length - 1 ||
          currentParentIndex < steps.length - 1 ? (
            <Button
              type="button"
              variant="secondary"
              onClick={handleNext}
              hasIcon
              iconName={'arrow-right'}
              iconPosition="right"
              isLoading={isLoading}
              className={'min-w-[150px]'}>
              Save & Next
            </Button>
          ) : (
            <Button
              variant="secondary"
              className={'min-w-[150px]'}
              type="submit"
              isLoading={isLoading}
              disabled={isLoading}>
              SAVE
            </Button>
          )}
        </div>
      </form>
      <ScrollToTop />
    </div>
  );
};
const ProjectOverViewWrapper = ({ steps }) => (
  <StepProvider steps={steps}>
    <ProjectOverView steps={steps} />
  </StepProvider>
);

export default ProjectOverViewWrapper;
