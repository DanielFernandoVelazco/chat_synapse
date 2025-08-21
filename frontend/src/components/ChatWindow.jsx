import React, { useState } from 'react';
import MessageList from './MessageList.jsx';
import InputArea from './InputArea.jsx';
import './ChatWindow.css';

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'other', text: '¡Hola! ¿Cómo estás?', time: '10:30' },
    { id: 2, sender: 'self', text: 'Muy bien, gracias. ¿Y tú?', time: '10:31' },
  ]);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      sender: 'self',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, newMessage]);
    // Aquí iría la lógica para enviar el mensaje al backend
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={chat.image} alt="Perfil" className="chat-avatar" />
        <div className="chat-header-info">
          <h3>{chat.name}</h3>
          <span>En línea</span>
        </div>
      </div>
      <MessageList messages={messages} />
      <InputArea onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;