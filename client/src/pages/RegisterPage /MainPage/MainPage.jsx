import React from 'react';
import styles from './MainPage.module.css';
import blog from '../../../assets/blog.jpg';

const MainPage = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>Добро пожаловать в MyBlog</h1>
        <p className={styles.subtitle}>
          Делитесь своими мыслями, читайте статьи других и вдохновляйтесь каждый день.
        </p>
        <img src={blog} alt="Blog illustration" className={styles.image} />
      </div>
    </div>
  );
};

export default MainPage;
