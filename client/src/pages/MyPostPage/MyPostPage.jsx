import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './MyPostPage.module.css'; 

const MyPostPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4444/posts/mine', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data); 
      } catch (err) {
        console.error('Ошибка при получении постов', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [token]);

  if (loading) {
    return <div className={styles.loading}>Загрузка постов...</div>;
  }

  if (posts.length === 0) {
    return <div className={styles.noPosts}>У вас пока нет постов</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Мои посты</h2>
      <ul className={styles.postList}>
        {posts.map(post => (
          <li key={post._id} className={styles.postItem}>
            <h3 className={styles.postTitle}>{post.title}</h3>
            <p className={styles.postText}>{post.text}</p>
            {post.imageUrl && (
              <img
                src={`http://localhost:4444${post.imageUrl}`}
                alt={post.title}
                className={styles.postImage}
              />
            )}
            <p className={styles.postTags}>Теги: {post.tags.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyPostPage;
