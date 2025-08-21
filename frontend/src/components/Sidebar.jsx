import React from 'react';
import ChatList from './ChatList.jsx';
import './Sidebar.css';

const Sidebar = ({ chats, onSelectChat }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Chats</h2>
      </div>
      <div className="sidebar-search">
        <input type="text" placeholder="Buscar..." />
      </div>
      <ChatList chats={chats} onSelectChat={onSelectChat} />
    </div>
  );
};

export default Sidebar;