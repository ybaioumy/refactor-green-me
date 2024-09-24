import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import Ellipse from '../../assets/images/Ellipse.png';
import Icon from './Icon';
import SkeltonLoader from './SkeltonLoader';
import { Link } from 'react-router-dom';
import EmptyList from './EmptyList';
import { getTimeAgo } from '../../utilits/helpers';

const ProjectSwiper = ({ projects, isLoading }) => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  if (isLoading) return <SkeltonLoader />;
  if (!projects || projects.length === 0) return <EmptyList />;

  const isAtStart = activeIndex === 0;

  return (
    <div className="relative">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.activeIndex);
          setIsAtEnd(
            swiper.activeIndex ===
              swiper.slides.length - swiper.params.slidesPerView
          );
        }}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        grabCursor={true}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
        breakpointsBase="container"
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}>
        {projects?.data?.map((project, idx) => (
          <SwiperSlide key={project.id}>
            <Link to={'projects/eligible/' + project.id}>
              <div className="max-w-sm bg-[#fbfbfb] ml-1 rounded-2xl p-4 h-[350px] shadow-[0px_0px_10px_0px_#00000024] my-4 ">
                <div className="flex items-center justify-between ">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full">
                      <img
                        src={Ellipse}
                        alt="Icon"
                        className="w-12 h-12 object-cover"
                      />
                      <div className="absolute w-3 h-3 bg-red-600 rounded-full top-0 right-0"></div>
                    </div>
                    <p className="text-[24px] font-bold">
                      {`Project 00${idx + 1}` || ''}
                    </p>
                  </div>
                </div>

                <div className="py-2 border-y border-gray-300 min-h-[60px] mt-4 flex items-center overflow-hidden ">
                  <p className="text-lg font-bold line-clamp-2">
                    {project.projectName || ''}
                  </p>
                </div>
                <div className="py-2 border-b border-gray-300 ">
                  <div className="text-gray-600 text-lg font-bold">
                    Last Update
                  </div>
                  <div className="text-base p-2 bg-card w-fit rounded-md ">
                    {getTimeAgo(project?.lastUpdate)}
                  </div>
                </div>
                <div className="py-2 overflow-hidden">
                  <div className="text-gray-600 text-lg font-bold">
                    {'Status'}
                  </div>
                  <p className="text-base p-2 bg-card w-fit rounded-md ≈ ">
                    {project?.projectStatusName}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        style={{ boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.10)' }}
        onClick={handlePrev}
        className={`swiper-button-prev absolute -left-5 top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-gradient-blend h-[40px] w-[40px] flex justify-center items-center ${
          isAtStart ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isAtStart}>
        <Icon name="chev-left" />
      </button>

      <button
        style={{ boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.10)' }}
        onClick={handleNext}
        className={`swiper-button-next absolute -right-5 top-1/2 transform -translate-y-1/2 z-10 rounded-full bg-gradient-blend h-[40px] w-[40px] flex justify-center items-center ${
          isAtEnd ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={isAtEnd}>
        <Icon name="chev-right" />
      </button>
    </div>
  );
};

export default ProjectSwiper;
