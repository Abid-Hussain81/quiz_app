import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Start from './Components/Start';
import Quiz from './Components/Quiz';
import AttemptResult from './Components/attemptResult';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Start />}/>
        <Route path='/quiz' element={<Quiz />}/>
        <Route path='/AttemptResult' element = {<AttemptResult />}/>
      </Routes>
    </Router>
  )
}

export default App
