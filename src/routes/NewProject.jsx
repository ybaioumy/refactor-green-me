import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetLookingForQuery } from '../redux/features/eligibility';
import Loader from '../components/shared/Loader';
import EmptyList from '../components/shared/EmptyList';
import Tooltip from '../components/shared/Tooltip';
const GreenMeOptions = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [hoveredOption, setHoveredOption] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const { data, isLoading, error } = useGetLookingForQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (!data) return <EmptyList message={'Nothing here'} />;
  if (error) return <EmptyList message={'Something went wrong'} />;

  return (
    <div className="mt-8 px-2 md:px-8">
      <p className="text-[#1E4A28] text-2xl font-bold">
        What are you looking for?
      </p>
      <p className="text-[#1E4A28] text-base font-normal">
        Start your GreenMe journey with any of the following options
      </p>
      <div className="flex justify-between flex-wrap gap-2 mt-10">
        {data?.map((box, idx) => (
          <div
            className="flex flex-col justify-between gap-5 mb-5 w-full md:max-w-[23%]"
            key={idx}>
            <Link
              to={`/new-project/${box.id}`}
              className={`bg-[#1E4A28] relative w-full h-[200px] sm:w-[calc(50% - 10px)] sm:h-[180px] md:w-[calc(50% - 10px)] md:h-[190px] lg:w-[calc(50% - 10px)] lg:h-[220px] xl:w-[calc(50% - 10px)] xl:h-[240px] rounded-[5px] p-[20px] flex flex-col items-start justify-end transition-opacity duration-300 hover:opacity-100 ${
                hoveredOption === idx || selectedOption === idx
                  ? 'opacity-100'
                  : 'opacity-70'
              }`}>
              <div className="absolute top-0 right-0 z-0">
                <RenderSVG />
              </div>
              <p className="z-10 text-[#DEFFE6] text-lg font-bold">
                {box.name}
              </p>
            </Link>
            <button
              onMouseEnter={(e) => {
                setHoveredOption(idx);
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltipPosition({
                  top: rect.top + window.scrollY + 25,
                  left: rect.left + window.scrollX + 10,
                });
              }}
              onMouseLeave={() => setHoveredOption(null)}
              onClick={() =>
                setSelectedOption((prev) => (prev === idx ? null : idx))
              }
              className="relative cursor-pointer w-fit">
              <div className="w-fit">
                <InfoIcon
                  isHovered={hoveredOption === idx || selectedOption === idx}
                />
              </div>
              {(hoveredOption === idx || selectedOption === idx) && (
                <Tooltip position={tooltipPosition}>
                  <p className="text-base mb-2">
                    More Info About This ... please read below:
                  </p>
                  <div className="bg-white px-3 rounded-[25px]">
                    <p className="text-lg text-[#1E4A28] font-bold text-wrap">
                      {box.name}
                    </p>
                    <div className="h-24 overflow-y-auto m-auto border-tr-10">
                      <p className="text-base text-black">{box?.info}</p>
                    </div>
                  </div>
                </Tooltip>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const RenderSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="140"
    height="180"
    viewBox="0 0 243 313"
    fill="none">
    <g opacity="0.2">
      <path
        d="M156.558 270.287C146.486 270.284 136.592 267.615 127.869 262.545L46.5125 215.261C37.8036 210.177 30.5722 202.881 25.5407 194.101C20.5092 185.322 17.8537 175.368 17.8396 165.232V100.915C12.6488 104.424 8.39526 109.165 5.45426 114.72C2.51326 120.275 0.975126 126.473 0.975587 132.768V227.341C0.973853 234.073 2.7321 240.687 6.07365 246.518C9.4152 252.349 14.2223 257.192 20.0119 260.56L101.357 307.86C107.149 311.227 113.719 313 120.407 313C127.095 313 133.665 311.227 139.457 307.86L220.798 260.56C226.069 257.493 230.533 253.199 233.816 248.038C237.1 242.876 239.107 236.997 239.67 230.894L185.215 262.549C176.5 267.61 166.618 270.278 156.558 270.287Z"
        fill="white"
      />
      <path
        d="M256.951 37.4399L175.607 -9.86049C169.814 -13.2274 163.244 -15 156.556 -15C149.868 -15 143.298 -13.2274 137.506 -9.86049L56.1491 37.4399C50.3572 40.8072 45.5478 45.6502 42.2041 51.4821C38.8605 57.314 37.1004 63.9294 37.1008 70.6633V165.232C37.0995 171.966 38.8593 178.581 42.203 184.414C45.5468 190.246 50.3567 195.088 56.1491 198.455L137.494 245.755C143.286 249.122 149.856 250.895 156.544 250.895C163.232 250.895 169.802 249.122 175.594 245.755L256.939 198.455C262.734 195.09 267.546 190.248 270.892 184.416C274.238 178.583 276 171.967 276 165.232V70.6633C276 63.9294 274.24 57.314 270.896 51.4821C267.553 45.6502 262.743 40.8072 256.951 37.4399ZM87.1949 144.521C87.1949 147.063 86.1919 149.501 84.4065 151.299C82.6211 153.096 80.1997 154.106 77.6748 154.106C75.1499 154.106 72.7284 153.096 70.943 151.299C69.1576 149.501 68.1546 147.063 68.1546 144.521C68.1546 94.6086 107.813 54.0031 156.558 54.0031C159.076 54.0031 161.597 54.1971 164.035 54.3871C166.449 54.6106 168.686 55.7593 170.283 57.5961C171.881 59.4328 172.716 61.8172 172.617 64.2565C172.518 66.6958 171.492 69.0036 169.752 70.7031C168.011 72.4025 165.688 73.3638 163.264 73.3881C162.971 73.3881 162.677 73.3881 162.384 73.3477C161.051 73.1941 159.711 73.1077 158.369 73.089C157.791 73.089 157.257 73.1132 156.763 73.1577H156.582C118.313 73.1739 87.1949 105.18 87.1949 144.521ZM172.318 140.781C168.841 149.598 162.537 154.862 155.454 154.862C152.713 154.875 150.017 154.161 147.637 152.792C145.256 151.423 143.276 149.447 141.895 147.064L141.854 146.991C138.823 141.331 139.128 134.551 142.657 128.883L190.359 51.9251C191.328 50.4049 192.66 49.1543 194.235 48.2883C195.809 47.4222 197.575 46.9684 199.369 46.9687C201.072 46.971 202.75 47.387 204.259 48.1815C209.142 50.7567 211.061 56.5985 208.724 61.7773L172.318 140.781ZM235.438 153.912C232.913 153.91 230.493 152.899 228.708 151.102C226.923 149.305 225.92 146.868 225.918 144.327C225.943 126.282 219.235 108.886 207.122 95.587C203.569 91.5442 203.794 85.5649 207.604 81.9669L207.648 81.9265C209.45 80.3118 211.777 79.416 214.189 79.4078C215.494 79.4019 216.785 79.6679 217.983 80.189C219.18 80.7102 220.258 81.4751 221.147 82.4359C236.536 99.318 245.044 121.417 244.978 144.331C244.974 146.875 243.966 149.313 242.177 151.109C240.389 152.906 237.964 153.914 235.438 153.912Z"
        fill="white"
      />
    </g>
  </svg>
);
const InfoIcon = ({ isHovered }) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 59 59"
    fill={isHovered ? '#339224' : '#CBCBCB'}
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M29.5002 25.1982C31.1973 25.1982 32.5731 26.5226 32.5731 28.1562V41.2924C32.5731 42.926 31.1973 44.2503 29.5002 44.2503C27.803 44.2503 26.4272 42.926 26.4272 41.2924V28.1562C26.4272 26.5226 27.803 25.1982 29.5002 25.1982Z"
      fill={isHovered ? '#339224' : '#CBCBCB'}
    />
    <path
      d="M31.5604 14.9208C32.8162 16.0506 32.918 17.984 31.7876 19.2392L31.7604 19.2694C30.6301 20.5246 28.6957 20.6263 27.4399 19.4965C26.1841 18.3667 26.0824 16.4333 27.2127 15.1781L27.2399 15.1479C28.3702 13.8927 30.3046 13.791 31.5604 14.9208Z"
      fill={isHovered ? '#339224' : '#CBCBCB'}
    />
    <path
      d="M0 29.5C0 13.2076 13.2076 0 29.5 0C45.7923 0 59 13.2076 59 29.5C59 45.7923 45.7923 59 29.5 59C13.2076 59 0 45.7923 0 29.5ZM29.5 5.97048C16.505 5.97048 5.97048 16.505 5.97048 29.5C5.97048 42.4949 16.505 53.0295 29.5 53.0295C42.4949 53.0295 53.0295 42.4949 53.0295 29.5C53.0295 16.505 42.4949 5.97048 29.5 5.97048Z"
      fill={isHovered ? '#339224' : '#CBCBCB'}
    />
  </svg>
);
export default GreenMeOptions;
