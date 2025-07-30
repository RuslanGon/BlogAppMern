import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p className={styles.text}>© {new Date().getFullYear()} MyBlog. Все права защищены.</p>
        <div className={styles.links}>
          <a href="/about" className={styles.link}>О нас</a>
          <a href="/contact" className={styles.link}>Контакты</a>
          <a href="/privacy" className={styles.link}>Политика конфиденциальности</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
