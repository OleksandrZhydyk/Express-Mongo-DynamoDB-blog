import PostModel from "../models/post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Post creation failed",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate({ path: "user", select: ["name", "avatarUrl"] })
      .exec();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const getOne = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await PostModel.findOneAndUpdate(
      { _id: postId },
      { $inc: { viewsCount: 1 } },
      { new: true }
    );
    if (!post) {
      return res.status(500).json({
        message: "Post not found",
      });
    }
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to load the post",
    });
  }
};

export const remove = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await PostModel.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    if (req.userId !== post.user._id.valueOf()) {
      return res.status(403).json({
        message: "Delete Forbidden",
      });
    }

    const result = await PostModel.deleteOne({ _id: postId });

    if (result.acknowledged) {
      return res.status(200).json({ success: true });
    }

    return res.status(500).json({
      message: "Failed to delete the post",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to delete the post",
    });
  }
};

export const update = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await PostModel.findOne({ _id: postId });
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    if (req.userId !== post.user._id.valueOf()) {
      return res.status(403).json({
        message: "Editing Forbidden",
      });
    }

    const result = await PostModel.updateOne(
      { _id: postId },
      {
        title: req.body.title,
        text: req.body.text,
        tags: req.body.tags,
        imageUrl: req.body.imageUrl,
        user: req.userId,
      }
    );

    if (result.acknowledged) {
      return res.status(200).json({ success: true });
    }

    return res.status(500).json({
      message: "Failed to delete the post",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Failed to delete the post",
    });
  }
};
