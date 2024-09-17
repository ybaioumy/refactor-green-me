import React, { useState } from 'react';
import Button from './Button';
import User from '../../assets/images/m.png';
import { CloseOutlined, MinusOutlined } from '@ant-design/icons';
import Icon from './Icon';

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    setIsChatMinimized(false); // Reset minimize state when opening the chat
  };

  const minimizeChat = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  return (
    <div>
      {isChatOpen && (
        <ChatBot
          toggleChat={toggleChat}
          minimizeChat={minimizeChat}
          isChatMinimized={isChatMinimized}
        />
      )}
      <Button
        onClick={toggleChat}
        className="text-white rounded-full shadow-lg">
        {isChatOpen ? 'Close Chat' : 'Help/Chat'}
      </Button>
    </div>
  );
};

const ChatBot = ({ toggleChat, minimizeChat, isChatMinimized }) => {
  return (
    <div className="fixed bottom-5 right-4 w-full semi-transparent-black max-w-md p-2 rounded-lg shadow-lg z-[9999] transition duration-200">
      <div className="flex items-center justify-between p-2 text-white rounded-t-lg">
        <div>
          <h2 className="text-lg font-semibold">Got Questions? Let Us Help</h2>
          <div className="flex gap-2 items-center my-4">
            <img src={User} alt="User" />
            <p>Frank</p>
          </div>
          <p>Green Me Support Team</p>
        </div>
        <div className="absolute -top-10 right-0 flex gap-2">
          <button
            onClick={minimizeChat}
            className="text-lg w-[36px] h-[36px] bg-black rounded-full">
            <MinusOutlined />
          </button>
          <button
            onClick={toggleChat}
            className="text-lg w-[36px] h-[36px] bg-black rounded-full">
            <CloseOutlined />
          </button>
        </div>
      </div>
      {!isChatMinimized && (
        <>
          <div className="flex-1 p-6 overflow-y-auto bg-[#E2E2E2] rounded-tr-lg rounded-tl-lg">
            <div className="relative mb-4">
              <img
                src={User}
                alt="User"
                width={40}
                height={40}
                className="absolute -top-5 left-0"
              />
              <p className="p-4 mt-1 bg-white rounded-[49px]">
                Hello Ramy, How can I help You?
              </p>
              <p className="absolute -bottom-4 left-6 text-xs text-[#3E3E3E] mt-1 bg-[#C1DAFF] rounded-[15px] px-4 py-1">
                8:21 AM
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Ramy</p>
              <p className="p-2 mt-1 bg-white rounded-lg">
                Hi GMe .. please can you advise how to complete eligibility
                phase? I'm trying to submit Green Building Project.
              </p>
              <p className="text-xs text-[#3E3E3E] mt-1">8:22 AM</p>
            </div>
          </div>
          <div className="flex items-center p-2 bg-[#fff]">
            <input
              type="text"
              className="flex-1 p-2 bg-white rounded-lg focus:outline-none"
              placeholder="Type your message..."
            />
            <button className="bg-gradient-blend p-2 rounded-full w-[50px] h-[50px]">
              <Icon name={'sendButton'} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatButton;
