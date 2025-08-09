import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchLogin, selectIsAuth } from "../../redux/slice/user";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector(selectIsAuth);
  const { status, error } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchLogin(formData));
  };

  // Если авторизованы — переходим на /my-post
  useEffect(() => {
    if (isAuth) {
      navigate("/my-post");
    }
  }, [isAuth, navigate]);

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Вход</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {status === "loading" && <p>Вход...</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 10, padding: 8 }}
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
            style={{ width: "100%", marginBottom: 20, padding: 8 }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px" }}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
