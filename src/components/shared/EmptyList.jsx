import React, { useRef } from 'react';
import Icon from './Icon';
import addAnimation from '../../assets/animations/add.json';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';

function EmptyList({ message, type = 'empty' }) {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: addAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const animationRef = useRef();
  return (
    <div className="w-full flex flex-col h-full items-center flex-wrap justify-center gap-2">
      {type === 'add' ? (
        <Link to={'/new-project'}>
          <Lottie
            options={defaultOptions}
            height={150}
            width={150}
            ref={animationRef}
          />
        </Link>
      ) : (
        <Icon name={'empty'} />
      )}
      <h2 className="text-center text-black text-base font-semibold leading-relaxed pb-1">
        {message || 'There’s no product here'}
      </h2>
    </div>
  );
}

export default EmptyList;
