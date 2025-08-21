import React, { useState } from 'react';
import Login from './components/Login.jsx';
import Sidebar from './components/Sidebar.jsx';
import ChatWindow from './components/ChatWindow.jsx';
import './App.css';

// 1. Importa la interfaz
import { LoginCredentials } from './types/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  // Simulación de chats
  const chats = [
    { id: 1, name: 'Carlos', lastMessage: '¡Hola! ¿Cómo estás?', time: '10:30', image: 'https://via.placeholder.com/50' },
    { id: 2, name: 'Ana', lastMessage: 'Claro, nos vemos más tarde.', time: 'Ayer', image: 'https://via.placeholder.com/50' },
    { id: 3, name: 'Pedro', lastMessage: 'Recuerda la reunión de mañana.', time: 'Martes', image: 'https://via.placeholder.com/50' },
  ];

  // 2. Asigna el tipo a 'credentials'
  const handleLogin = (credentials: LoginCredentials) => {
    // ... (resto de la función)
    console.log('Credenciales de login:', credentials);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-container">
      <Sidebar chats={chats} onSelectChat={setSelectedChat} />
      {selectedChat ? (
        <ChatWindow chat={selectedChat} />
      ) : (
        <div className="no-chat-selected">
          Selecciona un chat para empezar a conversar.
        </div>
      )}
    </div>
  );
}

export default App;