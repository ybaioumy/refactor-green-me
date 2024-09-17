import React from 'react';
import { useNavigate } from 'react-router-dom';
import successAnimation from '../../assets/animations/Animation-success.json';
import Lottie from 'react-lottie';
import Button from '../shared/Button';

const EligibilityStatus = ({ isEligible, id }) => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path, { replace: true });
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      {isEligible ? (
        <div className="bg-white p-8 text-center flex flex-col items-center">
          <Lottie options={defaultOptions} height={200} width={200} />

          <h2 className="text-2xl font-semibold  mb-2">
            Your Project is Eligible
          </h2>
          <p className="mb-4 text-[#929292]">
            Congratulations! Your project is eligible to the Selected Financial
            Institution Green Finance Framework.
          </p>
          <p className="mb-6 text-[#929292]">
            This does not mean that you have a loan approval, please start
            providing information and documents required to start your loan
            approval journey.
          </p>
          <div className="flex flex-col justify-center gap-5">
            <Button
              onClick={() => handleNavigation('/new-project/eligible/' + id)}
              variant="transparent"
              className="text-[#1E4A28] px-4 py-2 border-2 border-[#1E4A28] hover:bg-[#1E4A28] hover:text-white transition">
              Project Submission
            </Button>
            <Button
              onClick={() => handleNavigation('/')}
              variant="secondary"
              className=" bg-gray-200 text-[#1E4A28]px-4 py-2  border transition-all">
              Back to Home
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Not Eligible</h2>
          <p className="mb-4 text-[#929292]">
            Unfortunately, your project does not fall under the selected
            financial institution eligibility framework.
          </p>
          <p className="mb-6 text-[#929292]">Would you like to start over?</p>
          <Button
            onClick={() => handleNavigation('/new-project')}
            variant="secondary"
            className=" bg-gray-200 text-gray-700 px-4 py-2 transition border w-full ">
            Start Over
          </Button>
        </div>
      )}
    </div>
  );
};
export default EligibilityStatus;
