import { useForm } from 'react-hook-form';
import { useUpdateProjectByIdMutation } from '../../redux/features/project';
import Button from '../shared/Button';
import { useParams } from 'react-router-dom';

import Title from '../shared/Title';
import { useStep, StepProvider } from '../../context/formContext';
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
  } = useStep();

  const methods = useForm({
    defaultValues: {},
    mode: 'onChange',
  });
  const { trigger, getValues } = methods;

  // Function to handle form submission
  const onSubmit = async (data) => {
    const isValid = await trigger();
    const currentData = getValues();
    if (!isValid) return;

    try {
      await updateProjectById({ id, data: currentData }).unwrap();
      alert('Project updated successfully!');
    } catch (error) {
      console.error('Failed to update project: ', error);
      alert('Failed to update the project. Please try again.');
    }
  };

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
                className={`text-white md:h-[100px] h-[100px] w-fit  md:w-[90%] relative flex min-w-[220px] md:min-w-[120px] items-center gap-4 text-left px-4 py-2 font-bold  rounded-[12px] card-green-gradient transition-opacity duration-150  ${
                  index === currentParentIndex
                    ? 'border-[3px]  md:border-[5px] border-[#cbff5e] '
                    : 'opacity-50  border-[3px] md:border-[5px]'
                }`}>
                <span>{parentStep.icon}</span>
                <p className="font-bold capitalize sm:hidden md:hidden lg:block  text-[20px] w-1/2 text-wrap leading-tight">
                  {' '}
                  {parentStep.label}
                </p>
                {currentParentIndex === index && (
                  <div className="hidden  md:block absolute right-[-20px] top-1/2 transform -translate-y-1/2 w-[30px] h-[40px] bg-[#122c18] active-eligible-container" />
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
            {steps[currentParentIndex]?.children[currentChildIndex].stepLabel}
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
    </div>
  );
};
const ProjectOverViewWrapper = ({ steps }) => (
  <StepProvider steps={steps}>
    <ProjectOverView steps={steps} />
  </StepProvider>
);

export default ProjectOverViewWrapper;
