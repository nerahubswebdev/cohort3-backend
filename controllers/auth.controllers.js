import User from "../models/user.model.js";

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

    // using the mongodb model to create a user
    const newUser = await User.create({
      name: myname,
      email,
      username,
      password,
    });

    if (newUser) {
      res.status(201).json({
        success: true,
        message: "user registered",
        user: newUser,
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
  res.send("This is the login route");
};

export { register, login };
