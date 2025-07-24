import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Проверяем наличие заголовка и Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Нет доступа (токен не найден)' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded._id; // Сохраняем ID пользователя
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Нет доступа (токен невалиден)' });
  }
};
