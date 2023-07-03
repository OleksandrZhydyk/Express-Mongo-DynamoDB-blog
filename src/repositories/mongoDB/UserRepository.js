import UserModel from "../../models/mongoModels/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { UserDTO } from "../../DTOs/index.js";

dotenv.config({ path: "../.env" });

export const registerDB = async (dto) => {
  const salt = await bcrypt.genSalt(10);
  const pwdhash = await bcrypt.hash(dto.password, salt);

  const doc = new UserModel({
    email: dto.email,
    name: dto.name,
    passwordHash: pwdhash,
    avatarUrl: dto.avatarUrl,
  });

  const user = await doc.save();
  const { passwordHash, ...userData } = user._doc;
  return new UserDTO.RegisterGetMeUserOutputDTO(userData);
};

export const getMeDB = async (dto) => {
  const user = await UserModel.findById(dto.userId);
  const { passwordHash, ...userData } = user._doc;
  return new UserDTO.RegisterGetMeUserOutputDTO(userData);
};

export const loginDB = async (dto) => {
  const user = await UserModel.findOne({ email: dto.email });
  console.log(user);
  return new UserDTO.LoginChecksDTO(user);
};
