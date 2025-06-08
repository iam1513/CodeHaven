import { useState } from 'react'
import './App.css'
import usePing from './hooks/apis/queries/usePing'
import { PingComponent } from './components/atoms/pingComponent'
import { Routes, Route } from 'react-router-dom'
import CreateProject from './pages/CreateProject'

function App() {

  return (
    <Routes>
      <Route path="/" element={<CreateProject />} />
    </Routes>
  )
}

export default App
