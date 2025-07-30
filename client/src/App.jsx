import React from 'react';
import Header from './components/Header/Header.jsx';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage /RegisterPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import MainPage from './pages/RegisterPage /MainPage/MainPage.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css'; 

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
