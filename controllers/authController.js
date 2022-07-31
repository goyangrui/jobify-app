import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // check if user provided all necessary fields
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  // check if the user's provided email already exists in the database
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("email already in use");
  }

  // create user
  const user = await User.create({ name, email, password });

  // create json web token for user
  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;

  // if the email or password are not provided in the request body
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  // get the user instance object with the provided email (include password in user instance object)
  const user = await User.findOne({ email }).select("+password");

  // if the user doesn't exist
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // check if password is correct
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // generate token
  const token = user.createJWT();

  // remove password from response
  user.password = undefined;

  res
    .status(StatusCodes.CREATED)
    .json({ user, token, location: user.location });
};
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { register, login, updateUser };
