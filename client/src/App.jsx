import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home.jsx'
import Template from './pages/Template.jsx'
import Counter from './pages/Counter.jsx'
import NewPool from './pages/NewPool.jsx'
import UserForm from './pages/UserForm.jsx'
import LockedPool from './pages/LockedPool.jsx'


function App() {

  return (
    <>
      {/* <Home /> */}
      {/* <Template /> */}
      {/* <Counter /> */}
      {/* <NewPool /> */}
      {/* <UserForm /> */}
      <LockedPool />
    </>
  )
}

export default App
