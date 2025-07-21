import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Start from './Components/Start';
import Quiz from './Components/Quiz';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Start />}/>
        <Route path='/quiz' element={<Quiz />}/>
      </Routes>
    </Router>
  )
}

export default App
