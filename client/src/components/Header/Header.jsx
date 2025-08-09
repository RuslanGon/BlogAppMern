import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ isAuth }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">MyBlog</Link>
      </div>

      <nav className={styles.nav}>
        {isAuth ? (
          <>
            <Link className={styles.link} to="/add-post">Написать статью</Link>
            <Link className={styles.link} to="/logout">Выйти</Link>
          </>
        ) : (
          <>
            <Link className={styles.link} to="main">Добавить статью</Link>
            <Link className={styles.link} to="/login">Войти</Link>
            <Link className={styles.link} to="/register">Создать аккаунт</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
