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

// middleware

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ msg: "Welcome!" });
// });
app.get("/api/v1", (req, res) => {
  res.json({ msg: "API" });
});

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

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
