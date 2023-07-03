import PostModel from "../../models/mongoModels/post.js";
import { PostDTO } from "../../DTOs/index.js";

export const createDB = async (dto) => {
  const doc = new PostModel({
    title: dto.title,
    text: dto.text,
    tags: dto.tags,
    imageUrl: dto.imageUrl,
    user: dto.userId,
  });

  const post = await doc.save();
  return new PostDTO.GetPostOutputDTO(post);
};

export const getAllDB = async () => {
  const posts = await PostModel.find()
    .populate({ path: "user", select: ["name", "avatarUrl"] })
    .exec();

  function preparePost(post) {
    const { user, ...postData } = post._doc;
    const userId = user._id.valueOf();
    return new PostDTO.GetPostOutputDTO({ user: userId, ...postData });
  }

  return posts.map((item) => preparePost(item));
};

export const getOneWithLikesDB = async (dto) => {
  return await PostModel.findOneAndUpdate(
    { _id: dto.postId },
    { $inc: { viewsCount: dto.viewsCount } },
    { new: dto.new }
  );
};

export const getOneDB = async (dto) => {
  const post = await PostModel.findById(dto.postId);
  const { user, ...postData } = post._doc;
  const userId = user._id.valueOf();
  return new PostDTO.GetPostOutputDTO({ user: userId, ...postData });
};

export const removeOneDB = async (dto) => {
  const result = await PostModel.deleteOne({ _id: dto.postId });
  return result.acknowledged;
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
