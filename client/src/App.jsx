import React from 'react'
import Header from './components/Header/Header.jsx'
import { Route, Routes } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage /RegisterPage.jsx'
import LoginPage from './pages/LoginPage/LoginPage.jsx'
import MainPage from './pages/RegisterPage /MainPage/MainPage.jsx'

const App = () => {
  return (
    <>
<Header />
<Routes>MainPage
        <Route path="/main" element={ <MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={ <LoginPage />} />
      </Routes>
    </>
  )
}

export default App