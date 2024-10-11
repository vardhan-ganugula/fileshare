import React from 'react'
import { Routes, Route } from 'react-router-dom'
import {Homepage} from './pages'


function App() {
  return (
    <Routes>
      <Route Component={Homepage} path='/' />
    </Routes>
  )
}

export default App