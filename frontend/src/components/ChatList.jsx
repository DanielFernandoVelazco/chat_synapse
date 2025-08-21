import React from 'react';
import ChatListItem from './ChatListItem.jsx';
import './ChatList.css';

const ChatList = ({ chats, onSelectChat }) => {
  return (
    <div className="chat-list">
      {chats.map((chat) => (
        <ChatListItem key={chat.id} chat={chat} onClick={() => onSelectChat(chat)} />
      ))}
    </div>
  );
};

export default ChatList;