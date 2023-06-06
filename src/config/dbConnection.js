import mongoose from "mongoose";

export default async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI_DEV, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log("DB CONECTION FAILED", err);
  }
};
