import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { router } from './router'
import { rendern } from './ulits/method'
function App() {
  return (
    <>
      <Suspense fallback={<h1>loading.....</h1>}>{rendern(router)}</Suspense>
    </>
  )
}

export default App
