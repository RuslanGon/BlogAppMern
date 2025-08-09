import React from 'react';
import Header from './components/Header/Header.jsx';
import { Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage /RegisterPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import MainPage from './pages/RegisterPage /MainPage/MainPage.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css'; 
import AddPost from './pages/AddPost/AddPost.jsx';
import MyPostPage from './pages/MyPostPage/MyPostPage.jsx';
import { useSelector } from 'react-redux';
import { selectIsAuth } from './redux/slice/user';

const App = () => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-post" element={isAuth ? <AddPost /> : <Navigate to="/login" />} />
          <Route path="/my-post" element={isAuth ? <MyPostPage /> : <Navigate to="/login" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
