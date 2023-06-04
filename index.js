import express from "express";
import mongoose from "mongoose";
import { registerValidator, loginValidator } from "./validators/auth.js";
import { postCreateValidator } from "./validators/post.js";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

// mongoose.connect(
//     'mongodb+srv://zhydykalex:pPCPt9M6K8P8xgVT@cluster0.3ipvpzh.mongodb.net/?retryWrites=true&w=majority'
//     ).then(() => console.log("DB OK"))
//     .catch ((err) => console.log("DB error", err))

mongoose
  .connect("mongodb://root:example@localhost:27017/mongo_db?authSource=admin")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello W");
});

app.post("/auth/login", loginValidator, UserController.login);
app.post("/auth/register", registerValidator, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/posts", checkAuth, postCreateValidator, PostController.create);
app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, PostController.update);

app.listen(4444, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Server started on port: 4444");
});
