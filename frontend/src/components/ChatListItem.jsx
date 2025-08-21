import React from 'react';
import './ChatListItem.css';

const ChatListItem = ({ chat, onClick }) => {
  return (
    <div className="chat-list-item" onClick={onClick}>
      <img src={chat.image} alt="Perfil" className="chat-avatar" />
      <div className="chat-info">
        <div className="chat-name">{chat.name}</div>
        <div className="chat-last-message">{chat.lastMessage}</div>
      </div>
      <div className="chat-time">{chat.time}</div>
    </div>
  );
};

export default ChatListItem;