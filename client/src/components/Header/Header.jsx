import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slice/user";
import styles from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth); // получаем статус из Redux

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());           
      localStorage.removeItem("token");  
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">MyBlog</Link>
      </div>

      <nav className={styles.nav}>
        {isAuth ? (
          <>
            <Link className={styles.link} to="/add-post">
              Написать статью
            </Link>
            <Link className={styles.link} to="/my-post">
              Мои статьи
            </Link>
            <Link
              className={styles.link}
              to="/"
              onClick={onClickLogout}
            >
              Выйти
            </Link>
          </>
        ) : (
          <>
            <Link className={styles.link} to="/login">
              Войти
            </Link>
            <Link className={styles.link} to="/register">
              Создать аккаунт
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
