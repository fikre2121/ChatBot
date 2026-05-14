import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';

function App() {

  return (
    <div className='p-4'>
      <h1 className="text-3xl font-bold underline text-green-400">Hello world!</h1>
      <Button className='p-'>click me</Button>
    </div>
  );
}

export default App
