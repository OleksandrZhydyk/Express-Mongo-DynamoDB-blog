import allowedOrigins from "./allowedOrigins.js";

const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200,
};

export default corsOptions;
