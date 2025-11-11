import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import { useEffect, useState } from 'react';

function App() {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default App
