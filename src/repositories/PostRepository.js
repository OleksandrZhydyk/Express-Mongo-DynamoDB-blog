import PostModel from "../models/post.js";

export const createDB = async (dto) => {
  const doc = new PostModel({
    title: dto.title,
    text: dto.text,
    tags: dto.tags,
    imageUrl: dto.imageUrl,
    user: dto.userId,
  });

  return await doc.save();
};

export const getAllDB = async () => {
  return await PostModel.find()
    .populate({ path: "user", select: ["name", "avatarUrl"] })
    .exec();
};

export const getOneWithLikesDB = async (dto) => {
  return await PostModel.findOneAndUpdate(
    { _id: dto.postId },
    { $inc: { viewsCount: dto.viewsCount } },
    { new: dto.new }
  );
};

export const getOneDB = async (dto) => {
  return await PostModel.findById(dto.postId);
};

export const removeOneDB = async (dto) => {
  const post = await PostModel.findOne({ _id: dto.postId });
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

  const result = await PostModel.deleteOne({ _id: dto.postId });
  return result;
};

export const update = async (dto) => {
  const post = await PostModel.findOne({ _id: dto.postId });
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
    { _id: dto.postId },
    {
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId,
    }
  );
  return result;
};
