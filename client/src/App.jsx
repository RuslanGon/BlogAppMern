import React from 'react';
import Header from './components/Header/Header.jsx';
import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage /RegisterPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import MainPage from './pages/RegisterPage /MainPage/MainPage.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css'; 
import AddPost from './pages/AddPost/AddPost.jsx';
import MyPostPage from './pages/MyPostPage/MyPostPage.jsx';

const App = () => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
      <Routes>
          {/* Главная страница */}
          <Route path="/" element={<MainPage />} />

          {/* Авторизация */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Посты */}
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/my-post" element={<MyPostPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
