import { useState } from 'react'
import { Route, Routes } from 'react-router'
import './App.css'
import AllTaskers from './AllTaskers'
import SingleTasker from './SingleTasker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Route>
        <Routes path="/taskers" element={<AllTaskers />} />
        <Routes path="/taskers/:id" element={<SingleTasker />} />
      </Route>
    </>
  )
}

export default App;
