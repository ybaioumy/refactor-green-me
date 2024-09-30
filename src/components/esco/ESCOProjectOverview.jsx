import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../shared/Button';
import { useStep, StepProvider } from '../../context/formContext';
import ScrollToTop from '../shared/ScrollToTop';
import ProjectInfo from '../Project/ProjectMiniInfo';
import { motion, useAnimationControls } from 'framer-motion';
import { Tooltip } from 'antd';
import { useMediaQuery } from '@mui/material';

const ProjectOverView = ({ steps }) => {
  const [showProjectInfo, setShowProjectInfo] = React.useState(true);
  const showSideBar = useMediaQuery('(max-width: 768px)');
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
  const svgVariants = {
    close: {
      rotate: 360,
    },
    open: {
      rotate: 180,
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
  const cardRefs = useRef([]);

  useEffect(() => {
    if (cardRefs.current[currentParentIndex]) {
      cardRefs.current[currentParentIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentParentIndex]);
  return (
    <div className="w-full h-full flex flex-col md:flex-row md:p-4 p-2 overflow-hidden transition-all duration-200 ease-in-out relative">
      <motion.div className="relative flex transition-all duration-150 ease-in-out">
        {/* //over lay */}
        {showSideBar && showProjectInfo && (
          <motion.div
            className="fixed inset-0 bg-black z-30"
            variants={overlayVariants}
            initial="hidden"
            animate={showProjectInfo ? 'visible' : 'hidden'}
            onClick={() => setShowProjectInfo(false)} // Clicking overlay closes sidebar
          ></motion.div>
        )}
        {showSideBar && showProjectInfo && (
          <motion.div
            variants={containerVariants}
            animate={showProjectInfo ? 'open' : 'close'}
            className="fixed z-40 bg-white h-full top-0 bottom-0 left-0 w-[20rem] p-2 overflow-y-scroll no-scrollbar"
            style={{ pointerEvents: showProjectInfo ? 'auto' : 'none' }}>
            <div className="py-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">Project Info</h2>
              <button
                onClick={() => setShowProjectInfo(false)}
                className="text-gray-500 hover:text-gray-700 transition-all duration-150 ease-in-out"
                title="Close">
                ✖
              </button>
            </div>
            {showProjectInfo && <ProjectInfo />}
          </motion.div>
        )}
        {!showSideBar && showProjectInfo && (
          <motion.nav
            variants={containerVariants}
            animate={containerControls}
            initial="close"
            className="w-[270px]">
            <ProjectInfo />
          </motion.nav>
        )}

        <ul className="md:w-[230px] flex md:flex-col md:gap-5 gap-2 md:border-r border-black pr-4 overflow-x-scroll no-scrollbar relative">
          <Tooltip
            title={`${
              showProjectInfo ? 'Hide Project Info' : 'Show Project Info'
            }`}>
            <button
              className="p-1 rounded-r-md flex transition-colors duration-150 ease-in-out hover:bg-gray-200 w-fit "
              onClick={() => setShowProjectInfo((prev) => !prev)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 stroke-[#1E4A28]">
                <motion.path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={svgVariants}
                  animate={svgControls}
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  transition={{
                    duration: 0.5,
                    ease: 'easeInOut',
                  }}
                />
              </svg>
            </button>
          </Tooltip>
          {steps.map((parentStep, index) => (
            <li
              key={index}
              className="h-fit w-full"
              ref={(el) => (cardRefs.current[index] = el)}>
              <button
                title={parentStep.label}
                type="button"
                onClick={() => {
                  setCurrentParentIndex(index);
                  setCurrentChildIndex(0);
                }}
                className={`text-white lg:h-[150px] sm:h-[100px] transition-all md:w-[200px] relative flex md:flex-col items-center lg:items-start md:gap-2 justify-center md:justify-center min-w-[220px] md:min-w-[120px] gap-1 text-left px-4 py-2 font-bold rounded-[12px] card-green-gradient duration-150 ${
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
        </ul>
      </motion.div>

      <motion.form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-between min-h-full flex-1 md:p-4 p-2">
        <div className="h-full min-h-[70vh] w-full my-auto pb-4 transition-all duration-200">
          <div className="flex flex-col gap-2 mb-4 capitalize">
            <div className="flex gap-2 w-full justify-between items-center mt-2">
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
