import PostModel from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const post = await PostModel.find();
    res.json(post);
  } catch (error) {
    console.error("Ошибка при получении постов:", error);
    res.status(500).json({
      message: "Не удалось получить все статьи",
    });
  }
};


export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      user: req.userId,
      imageUrl: req.body.imageUrl,
    });

    const post = await doc.save();

    res.status(201).json(post);
  } catch (error) {
    console.error('Ошибка при создании поста:', error);
    res.status(500).json({
      message: 'Не удалось создать пост',
    });
  }
};
