import EmptyList from '../../shared/EmptyList';
import Loader from '../../shared/Loader';
import Title from '../../shared/Title';

const AuditResult = ({ data, isLoading, isError }) => {
  if (isLoading) return <Loader />;
  if (isError) return <EmptyList message={'Error while calculating Result'} />;
  return (
    <div className="w-full flex flex-col gap-10 px-10 py-4 md:w-[70%]">
      <Title
        type={'h1'}
        className="text-[28px]  font-bold my-4"
        text={'Initial Indicators'}
      />
      <div className="flex flex-col md:flex-row gap-10">
        <div>
          <p className="text-[24px] font-bold text-[#1E4A28] mb-2">
            Carbon Footprint Calculator
          </p>
          <div className="bg-[#BFE0C6] rounded-lg flex flex-col items-center justify-center py-[32px] px-[105px] h-[200px]">
            <span className="text-[#135D28] font-abel text-[20px]">
              Estimated Carbon Footprint
            </span>
            <Title
              type={'h1'}
              className="text-[50px]  text-[#1E4A28] font-bold my-4 "
              text={data.totalCo2Saved}
            />
            <span className="text-[#135D28]">tons of CO2 per year</span>
          </div>
        </div>
        <div>
          <p className="text-[24px] font-bold text-[#1E4A28] mb-2">
            Initial Potential Savings
          </p>
          <div className="bg-[#BFE0C6] rounded-lg flex flex-col items-center justify-center py-[32px] px-[105px] h-[200px]">
            <span className="text-[#135D28] text-[20px]">
              Estimated Projected Savings
            </span>
            <Title
              type={'h1'}
              className="text-[50px] font-bold my-4 text-[#1E4A28]"
              text={`${data.initialPotentialSavings}%`}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-5 border-t border-black pt-3">
        <svg
          width="75"
          height="70"
          viewBox="0 0 154 189"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M116.757 40.2845C116.85 39.7397 116.822 39.1812 116.677 38.6482C116.531 38.1151 116.27 37.6203 115.914 37.1983C115.557 36.7762 115.112 36.4372 114.611 36.2047C114.11 35.9723 113.564 35.852 113.011 35.8524H39.9877C39.4355 35.8529 38.8901 35.9736 38.3893 36.2061C37.8886 36.4387 37.4445 36.7776 37.0879 37.1992C36.7314 37.6208 36.471 38.1149 36.3248 38.6474C36.1786 39.1798 36.1501 39.7377 36.2413 40.2822C38.8785 55.8175 47.3514 63.8993 60.123 73.028C62.7142 74.9162 65.4574 76.5864 68.3244 78.0216C69.9537 79.8626 70.9547 81.669 70.9547 83.602V124.333C70.9547 135.399 51.7352 142.31 42.2152 151.961C38.2825 155.974 39.8634 162.445 45.4737 162.445H108.098C113.695 162.445 114.946 156.301 111.368 151.97C102.49 141.214 82.4698 135.3 82.4698 124.324V83.5928C82.4698 81.5079 83.6503 79.5726 85.5257 77.5936C88.0865 76.2465 90.5474 74.7177 92.8895 73.0189C105.652 63.8947 114.123 55.8175 116.757 40.2845Z"
            fill="#ADADAD"
          />
          <path
            d="M136.704 27.3611V16.8723H148.548C149.731 16.8717 150.866 16.4013 151.702 15.5646C152.538 14.7279 153.008 13.5933 153.008 12.4103V4.45969C153.008 3.27691 152.538 2.14257 151.702 1.30621C150.865 0.469859 149.731 0 148.548 0H4.45969C3.27691 0 2.14257 0.469859 1.30621 1.30621C0.469859 2.14257 0 3.27691 0 4.45969V12.4103C-1.57325e-07 13.5933 0.469784 14.7279 1.30607 15.5646C2.14236 16.4013 3.2767 16.8717 4.45969 16.8723H16.3062V25.3406C16.3246 37.7306 19.2739 49.9405 24.9131 60.9728C30.5522 72.0052 38.7212 81.547 48.7528 88.8188L56.1949 94.1967L48.7528 99.5791C38.7207 106.85 30.5513 116.391 24.9121 127.423C19.2729 138.455 16.3239 150.665 16.3062 163.055V171.526H4.45969C3.27691 171.526 2.14257 171.995 1.30621 172.832C0.469859 173.668 0 174.803 0 175.985V183.936C0.00182908 185.117 0.472501 186.25 1.30866 187.085C2.14481 187.92 3.2781 188.389 4.45969 188.389H148.555C149.141 188.389 149.721 188.273 150.262 188.049C150.803 187.825 151.294 187.497 151.709 187.082C152.123 186.668 152.451 186.177 152.675 185.636C152.899 185.095 153.015 184.515 153.015 183.929V175.978C153.015 175.393 152.899 174.813 152.675 174.272C152.451 173.731 152.123 173.239 151.709 172.825C151.294 172.411 150.803 172.082 150.262 171.858C149.721 171.634 149.141 171.519 148.555 171.519H136.711V161.028C136.711 138.95 124.4 116.003 103.779 99.6527L96.8913 94.1874L103.779 88.7267C124.393 72.386 136.704 49.4432 136.704 27.3611ZM89.7438 85.7697C88.474 86.777 87.4483 88.0583 86.7431 89.5177C86.038 90.9771 85.6718 92.577 85.6718 94.1978C85.6718 95.8186 86.038 97.4185 86.7431 98.8779C87.4483 100.337 88.474 101.619 89.7438 102.626L96.912 108.31C114.914 122.577 125.661 142.296 125.661 161.037V166.139C125.661 167.567 125.093 168.938 124.083 169.949C123.073 170.959 121.703 171.527 120.274 171.528H32.7274C32.0198 171.528 31.3191 171.388 30.6653 171.118C30.0116 170.847 29.4176 170.45 28.9174 169.949C28.4171 169.449 28.0203 168.855 27.7498 168.201C27.4792 167.547 27.34 166.846 27.3403 166.139V163.057C27.3537 152.413 29.8855 141.923 34.7288 132.444C39.5722 122.965 46.5896 114.767 55.2077 108.519L62.9673 102.907C64.3464 101.91 65.4694 100.6 66.2438 99.0844C67.0182 97.569 67.4221 95.8915 67.4221 94.1897C67.4221 92.488 67.0182 90.8105 66.2438 89.2951C65.4694 87.7798 64.3464 86.4698 62.9673 85.4729L55.2077 79.8672C46.5903 73.6188 39.5733 65.4205 34.7301 55.9419C29.8868 46.4633 27.3546 35.9734 27.3403 25.3291V22.2479C27.3403 20.8191 27.9079 19.4489 28.9182 18.4386C29.9285 17.4284 31.2987 16.8608 32.7274 16.8608H120.276C120.983 16.8608 121.684 17.0001 122.337 17.2708C122.991 17.5416 123.585 17.9384 124.085 18.4386C124.585 18.9389 124.982 19.5327 125.253 20.1863C125.524 20.8399 125.663 21.5404 125.663 22.2479V27.3496C125.663 46.0904 114.916 65.8 96.9143 80.072L89.7438 85.7697Z"
            fill="#ADADAD"
          />
        </svg>
        <div className="flex flex-col gap-2 md:w-1/2">
          <Title
            type={'h2'}
            className="font-bold mb-4 text-[#202020]"
            text={
              'Detailed Energy Audit Report is now under process and recommendations are being prepared'
            }
          />
          <Title
            className="text-[#3E3E3E] font-abel text-[18px]"
            text={
              'Our team is designing the architecture, energy engineering and industrial techniques solutions specific to your needs.'
            }
          />
          <Title
            className="text-[#3E3E3E] font-abel text-[18px]"
            text={
              'You will receive a notification when your recommendations are available.'
            }
          />
        </div>
      </div>
    </div>
  );
};

export default AuditResult;
