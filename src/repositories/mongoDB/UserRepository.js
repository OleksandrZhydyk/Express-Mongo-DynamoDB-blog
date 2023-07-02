import UserModel from "../../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

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

  return await doc.save();
};

export const getMeDB = async (dto) => {
  return await UserModel.findById(dto.userId);
};

export const loginDB = async (dto) => {
  return await UserModel.findOne({ email: dto.email });
};

// export const refreshDB = async (dto) => {
//   return await UserModel.findById(dto.userId);
// };
