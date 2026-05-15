import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';
import ChatWindow from "./components/chat/ChatWindow";

function App() {

  return (
    <div className="p-4">
      
      <div className="h-screen w-full ">
        <ChatWindow />
      </div>
    </div>
  );
}

export default App
