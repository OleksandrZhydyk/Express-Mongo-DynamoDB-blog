import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { registerValidator, loginValidator } from "./validators/auth.js";
import { postCreateValidator } from "./validators/post.js";
import {
  checkAuth,
  handleValidationErrors,
  setCredentials,
} from "./middleware/index.js";
import { UserController, PostController } from "./controllers/index.js";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions.js";
import cookieSession from "cookie-session";
import awsconfig from "./config/dynamoConfig.js";
import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { userTable, postTable } from "./models/dynamoModels/index.js";
import { mongoConnect } from "./config/dbConnection.js";

// (async () => {
//   try {
//     const userdata = await awsconfig.dnmClient.send(
//       new CreateTableCommand(userTable)
//     );
//     console.log("Success", userdata);
//     const postdata = await awsconfig.dnmClient.send(
//       new CreateTableCommand(postTable)
//     );
//     console.log("Success", postdata);
//   } catch (err) {
//     console.log("Error", err);
//   }
// })();

// mongoConnect();

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(setCredentials);
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Hello W");
});

app.post(
  "/auth/login",
  loginValidator,
  handleValidationErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidator,
  handleValidationErrors,
  UserController.register
);

app.post("/auth/logout", UserController.logout);
app.post("/auth/refresh", UserController.refresh);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post(
  "/posts",
  checkAuth,
  postCreateValidator,
  handleValidationErrors,
  PostController.create
);
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidator,
  handleValidationErrors,
  PostController.update
);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server started on port: 4444");
});

// mongoose.connection.once("open", () => {
//   console.log("DB CONNECTED SUCCESSFULLY");
//   app.listen(process.env.PORT, (err) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Server started on port: 4444");
//   });
// });
