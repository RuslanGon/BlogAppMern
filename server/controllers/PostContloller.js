import PostModel from "../models/Post.js";

export const getAllPosts = async (req, res) => {
  try {
    const post = await PostModel.find().populate('user').exec();
    res.json(post);
  } catch (error) {
    console.error("Ошибка при получении постов:", error);
    res.status(500).json({
      message: "Не удалось получить все статьи",
    });
  }
};

export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findByIdAndUpdate(
      postId,
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' } 
    ).populate('user', '-passwordHash'); 

    if (!post) {
      return res.status(404).json({ message: "Статья не найдена" });
    }

    res.json(post);

  } catch (error) {
    console.error("Ошибка при получении статьи:", error);
    res.status(500).json({
      message: "Не удалось получить статью",
    });
  }
};

export const deletePost = async (req, res) => {
    try {
      const postId = req.params.id;
  
      const deletedPost = await PostModel.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ message: "Пост не найден" });
      }
  
      res.json({ message: "Пост успешно удалён" });
    } catch (error) {
      console.error("Ошибка при удалении поста:", error);
      res.status(500).json({ message: "Не удалось удалить пост" });
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

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const updateResult = await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        user: req.userId,
        imageUrl: req.body.imageUrl,
      }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json({
      message: "Статья успешно обновлена",
    });

  } catch (error) {
    console.error("Ошибка при обновлении статьи:", error);
    res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({ user: req.userId }).populate('user', '-passwordHash').exec();
    res.json(posts);
  } catch (error) {
    console.error("Ошибка при получении моих постов:", error);
    res.status(500).json({
      message: "Не удалось получить мои посты",
    });
  }
};
