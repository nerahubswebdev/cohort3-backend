import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const registerData = req.body;
    const { myname, email, username, password } = registerData;

    if (!myname || !email || !username || !password) {
      res.status(400).json({
        success: false,
        message: "All fields required",
      });
      return;
    }

    // check if email exists
    const emailExists = await User.findOne({ email: email }).exec();
    const usernameExists = await User.findOne({ username: username }).exec();

    if (emailExists) {
      res.status(409).json({
        success: false,
        message: "Email already in use",
      });
      return;
    }
    if (usernameExists) {
      res.status(409).json({
        success: false,
        message: "Username already in use",
      });
      return;
    }

    // encrypting password
    const salt = await bcrypt.genSalt(13);
    const encryptedpassword = await bcrypt.hash(password, salt);

    // using the mongodb model to create a user
    const newUser = await User.create({
      name: myname,
      email,
      username,
      password: encryptedpassword,
    });

    if (newUser) {
      res.status(201).json({
        success: true,
        message: "user registered",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "user not registered",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  const body = req.body;

  if (!body.email || !body.password) {
    res.status(400).json({
      success: false,
      message: "All fields required",
    });
    return;
  }

  const userExists = await User.findOne({ email: body.email }).exec();

  if (!userExists) {
    res.status(404).json({
      success: false,
      message: "Invalid credentials email",
    });

    return;
  }

  const validPassword = await bcrypt.compare(
    body.password,
    userExists?.password
  );

  if (!validPassword) {
    res.status(409).json({
      success: false,
      message: "Invalid credentials password",
    });
    return;
  }

  // creating the tokens for authentication
  const accesstoken = jwt.sign(
    {
      jdjdjdjd: userExists?._id,
    },
    process.env.obi,
    {
      expiresIn: process.env.mat,
    }
  );

  const refreshtoken = jwt.sign(
    {
      tttete: userExists?._id,
    },
    process.env.ada,
    {
      expiresIn: process.env.mrt,
    }
  );

  // the cookies for authentication

  res.cookie("goat", accesstoken, {
    httpOnly: true,
    // secure: true,
    sameSite: "none",
    maxAge: 60 * 1000,
  });
  res.cookie("nama", refreshtoken, {
    httpOnly: true,
    // secure: true,
    sameSite: "none",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "login successful",
    // loginToken: { accesstoken, refreshtoken },
  });
};

export { register, login };
