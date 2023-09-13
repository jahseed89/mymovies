import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Home, MovieDetails} from './pages/index'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='details/:movieId' element={<MovieDetails />} />
    </Routes>
  )
}

export default App