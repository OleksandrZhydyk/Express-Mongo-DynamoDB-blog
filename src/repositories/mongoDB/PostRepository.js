import PostModel from "../../models/post.js";

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
  return await PostModel.deleteOne({ _id: dto.postId });
};

export const updateDB = async (dto) => {
  const result = await PostModel.updateOne(
    { _id: dto.postId },
    {
      title: dto.title,
      text: dto.text,
      tags: dto.tags,
      imageUrl: dto.imageUrl,
      user: dto.userId,
    }
  );
  return result;
};
