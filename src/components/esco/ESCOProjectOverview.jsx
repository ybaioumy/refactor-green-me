import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateProjectByIdMutation } from '../../redux/features/project';
import Button from '../shared/Button';
import { useParams } from 'react-router-dom';
import { useStep, StepProvider } from '../../context/formContext';
import ScrollToTop from '../shared/ScrollToTop';
import ProjectInfo from '../Project/ProjectMiniInfo';
import { FaAlignLeft } from 'react-icons/fa';
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { Tooltip } from 'antd';

const ProjectOverView = ({ steps }) => {
  const [showProjectInfo, setShowProjectInfo] = React.useState(true);

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
  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  const containerVariants = {
    close: {
      opacity: 0,
      transition: {
        type: 'spring',
        damping: 15,
        duration: 0.2,
      },
    },
    open: {
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15,
        duration: 0.2,
      },
    },
  };
  const overlayVariants = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
    visible: {
      opacity: 0.5,
      transition: { duration: 0.3 },
    },
  };

  useEffect(() => {
    if (showProjectInfo) {
      containerControls.start('open');
      svgControls.start('open');
    } else {
      containerControls.start('close');
      svgControls.start('close');
    }
  }, [showProjectInfo]);

  return (
    <div className="w-full h-full flex flex-col md:flex-row md:p-4 p-2 overflow-hidden transition-all duration-200 relative">
      <div className="relative">
        {showProjectInfo && (
          <motion.div
            className="fixed inset-0 bg-black z-30"
            variants={overlayVariants}
            initial="hidden"
            animate={showProjectInfo ? 'visible' : 'hidden'}
            onClick={() => setShowProjectInfo(false)} // Clicking overlay closes sidebar
          ></motion.div>
        )}

        <motion.div
          variants={containerVariants}
          animate={showProjectInfo ? 'open' : 'close'}
          className="fixed z-40 bg-white h-full top-0 bottom-0 left-0 w-[20rem] p-2"
          style={{ pointerEvents: showProjectInfo ? 'auto' : 'none' }} // Prevent interaction when closed
        >
          <div className="py-4 flex justify-between items-center">
            <h2 className="text-lg font-bold">Project Info</h2>
            <button
              onClick={() => setShowProjectInfo(false)}
              className="text-gray-500 hover:text-gray-700 transition-all duration-150"
              title="Close">
              ✖ {/* You can replace this with an icon if desired */}
            </button>
          </div>
          {showProjectInfo && <ProjectInfo />}
        </motion.div>

        <ul className="w-full flex md:flex-col md:gap-5 gap-2 md:border-r border-black pr-4 md:h-[95vh] overflow-x-scroll no-scrollbar">
          {steps.map((parentStep, index) => (
            <li key={index} className="h-fit w-full">
              <button
                title={parentStep.label}
                type="button"
                onClick={() => {
                  setCurrentParentIndex(index);
                  setCurrentChildIndex(0);
                }}
                className={`text-white lg:h-[150px] sm:h-[100px] transition-all w-full relative flex md:flex-col items-center lg:items-start md:gap-2 justify-center md:justify-center min-w-[220px] md:min-w-[120px] gap-1 text-left px-4 py-2 font-bold rounded-[12px] card-green-gradient duration-150 ${
                  index === currentParentIndex
                    ? 'border-[3px] md:border-[5px] border-[#cbff5e]'
                    : 'opacity-50 border-[3px] md:border-[5px]'
                }`}>
                <span>{parentStep.icon}</span>
                <p className="font-bold capitalize sm:block md:hidden lg:block text-[20px] text-wrap leading-tight truncate">
                  {parentStep.label}
                </p>
                {currentParentIndex === index && (
                  <div className="hidden md:block absolute right-[-20px] top-1/2 transform -translate-y-1/2 w-[30px] h-[40px] active-eligible-container" />
                )}
              </button>
            </li>
          ))}
          <Tooltip title={'show project information'}>
            <button
              className="text-[30px] md:text-[40px] w-fit md:mt-auto"
              onClick={() => setShowProjectInfo((prev) => !prev)}>
              <FaAlignLeft />
            </button>
          </Tooltip>
        </ul>
      </div>

      <motion.form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-between min-h-full flex-1 md:p-4 p-2">
        <div className="h-full min-h-[70vh] w-full my-auto pb-4 transition-all duration-200">
          <div className="flex flex-col gap-2 mb-4 capitalize">
            <div className="flex gap-2 w-full justify-between">
              <div className="flex gap-2 w-fit">
                {Array.from({ length: childrenLength }).map((_, index) => (
                  <span
                    key={index}
                    role="button"
                    onClick={() => setCurrentChildIndex(index)}
                    className={`h-1 w-10 rounded-lg ${
                      currentChildIndex === index ? 'stepsSpan' : 'bg-gray-300'
                    }`}></span>
                ))}
              </div>
              {steps[currentParentIndex]?.children[currentChildIndex]
                .stepIcon || null}
            </div>
            {steps[currentParentIndex]?.children[currentChildIndex].stepLabel}
          </div>
          {steps[currentParentIndex]?.children[currentChildIndex]?.content ||
            null}
        </div>

        <div className="flex items-center place-content-center md:place-content-end gap-5 border-t border-[#CBCBCB] pt-2">
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

          {/* Only render Next/Save buttons when hideButtons is false */}
          {!steps[currentParentIndex]?.children[currentChildIndex]
            .hideButtons && (
            <>
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
            </>
          )}
        </div>
      </motion.form>
      <ScrollToTop />
    </div>
  );
};

const ESCOProjectOverView = ({ steps }) => (
  <StepProvider steps={steps}>
    <ProjectOverView steps={steps} />
  </StepProvider>
);

export default ESCOProjectOverView;
