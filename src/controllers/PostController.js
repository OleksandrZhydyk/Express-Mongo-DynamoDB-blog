import { PostDTO } from "../DTOs/index.js";
import { PostRepo } from "../repositories/mongoDB/index.js";

export const create = async (req, res) => {
  try {
    const dto = new PostDTO.CreatePostDTO(req);
    const post = await PostRepo.createDB(dto);

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
    const posts = await PostRepo.getAllDB();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
  }
};

export const getOne = async (req, res) => {
  try {
    const dto = new PostDTO.GetOneDeletePostDTO({ postId: req.params.id });
    const post = await PostRepo.getOneWithLikesDB(dto);

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
  try {
    console.log(req.params.id);
    const dto = new PostDTO.GetOneDeletePostDTO({ postId: req.params.id });
    const post = await PostRepo.getOneDB(dto);

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

    const result = await PostRepo.removeOneDB(dto);

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
  try {
    const dto = new PostDTO.GetOneDeletePostDTO({ postId: req.params.id });
    const post = await PostRepo.getOneDB(dto);

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

    const updateDto = new PostDTO.UpdatePostDTO({ ...req, ...dto });
    console.log(updateDto);
    const result = await PostRepo.updateDB(updateDto);

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
