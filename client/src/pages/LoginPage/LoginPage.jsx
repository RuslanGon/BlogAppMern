import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:4444/auth/login', formData);

      // Сохраняем токен и данные пользователя
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data));

      setSuccess('Вход выполнен успешно!');
      navigate('/main'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка входа');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Вход</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 10, padding: 8 }}
          />
        </div>

        <div>
          <label>Пароль</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', marginBottom: 20, padding: 8 }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;
