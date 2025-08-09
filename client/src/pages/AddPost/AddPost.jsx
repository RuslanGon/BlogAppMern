import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';
import styles from './AddPost.module.css';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async () => {
    if (!image) return '';

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await api.post('/upload', formData);
      return res.data.url;
    } catch (err) {
      console.error('Ошибка загрузки изображения', err);
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const uploadedImageUrl = await handleImageUpload();

    try {
      await api.post('/posts', {
        title,
        text,
        tags: tags.split(',').map(tag => tag.trim()),
        imageUrl: uploadedImageUrl,
      });

      setTitle('');
      setText('');
      setTags('');
      setImage(null);

      alert('Пост успешно добавлен!');
      navigate('/my-post');
    } catch (err) {
      console.error('Ошибка при добавлении поста', err);
      alert('Ошибка добавления поста');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Добавить пост</h2>

      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={styles.input}
      />

      <textarea
        placeholder="Текст поста"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        className={styles.textarea}
      />

      <input
        type="text"
        placeholder="Теги (через запятую)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className={styles.input}
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        className={styles.fileInput}
      />

      <button type="submit" className={styles.button} disabled={loading}>
        {loading ? 'Добавление...' : 'Добавить пост'}
      </button>
    </form>
  );
};

export default AddPost;
