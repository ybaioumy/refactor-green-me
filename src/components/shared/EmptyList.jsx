import React from 'react';
import Icon from './Icon';
import addAnimation from '../../assets/animations/add.json';
import Lottie from 'react-lottie';

function EmptyList({ message, type = 'empty' }) {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: addAnimation,
  
  };
  return (
    <div className="w-full flex flex-col h-full items-center flex-wrap justify-center gap-10">
      {type === 'add' ? (
        <Lottie options={defaultOptions} height={150} width={200} />
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
