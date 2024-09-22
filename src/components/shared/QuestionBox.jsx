import React from 'react';

function QuestionBox({
  title,
  titleBorderd,
  description,
  children,
  direction = 'vertical',
}) {
  return (
    <div>
      {titleBorderd ? (
        <p className="py-2 border-y border-[#54A967] mb-4 text-[#1E4A28] text-[20px] font-bold">
          {title}{' '}
          {description ? (
            <span className="font-normal text-[15px]">{description}</span>
          ) : null}
        </p>
      ) : (
        <p className="text-[#186129] ml-4 text-[18px] font-[600]">{title}</p>
      )}
      <div
        className={`bg-[#EFEFEF] p-[40px] rounded-[17px]  ${
          direction === 'flex'
            ? 'flex flex-row items-center justify-between'
            : 'flex flex-col'
        }`}>
        {children}
      </div>
    </div>
  );
}

export default QuestionBox;
