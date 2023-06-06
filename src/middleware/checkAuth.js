import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const authHeader =
    req.headers.authorization || req.headers.Authorization || "";

  if (!authHeader?.startsWith("Bearer")) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.userId = decoded._id;
      next();
    } catch (err) {
      return res.status(403).json({
        message: "Forbidden",
      });
    }
  } else {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
