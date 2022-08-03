// initialize application
import express from "express";
const app = express();

// initialize environment variables
import dotenv from "dotenv";
dotenv.config();

// passes errors without try catch blocks
import "express-async-errors";

// morgan
import morgan from "morgan";

// connect to database function
import connectDB from "./db/connect.js";

// routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

// import not-found and error-handler middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

import authenticateUser from "./middleware/auth.js";

// imports for production (get url to static assets)
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

// security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

// middleware

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// get absolute path to current directory
const __dirname = dirname(fileURLToPath(import.meta.url));

// production - serve static assets from client/build folder
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());

// apply security middleware
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// error middleware

// not found middleware (after routes because middleware only executes if any of the routes do not match the user's request)
app.use(notFoundMiddleware);

// error handler middleware (handles errors that happen within the routes. MUST BE LAST!)
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// start connection to database, and run server
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
