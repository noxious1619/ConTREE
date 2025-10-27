import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/Home.jsx'
import Template from './pages/Template.jsx'
import Counter from './pages/Counter.jsx'
import NewPool from './pages/NewPool.jsx'
import NewPool2 from './pages/NewPool_2.jsx'
import UserForm from './pages/UserForm.jsx'
import LockedPool from './pages/LockedPool.jsx'
import LockedPool_1 from './pages/LockedPage_1.jsx'
import LockedPool_2 from './pages/LockedPage_2'


function App() {
  return (
    <>
      {/* Toast provider */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Router */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/newpool/:id" element={<NewPool2 />} />
        </Routes>
      </Router>
    </>
  );
}


export default App
