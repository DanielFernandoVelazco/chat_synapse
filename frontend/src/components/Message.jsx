import React from 'react';
import './Message.css';

const Message = ({ message }) => {
  const isSelf = message.sender === 'self';
  return (
    <div className={`message-bubble ${isSelf ? 'self' : 'other'}`}>
      <p>{message.text}</p>
      <span>{message.time}</span>
    </div>
  );
};

export default Message;