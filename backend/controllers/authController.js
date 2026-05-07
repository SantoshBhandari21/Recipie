// export const register = (req, res) => {
//   res.status(200).json({ message: "User registered successfully" });
// };

import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { username, email, password, avatar } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ msg: `${username} already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
      avatar,
    });

    // Create user response object
    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    res
      .status(201)
      .json({ msg: "User registered successfully", data: userResponse });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    console.error(error);
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Check if the user's password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const age = 1000 * 60 * 60 * 24 * 7; // 1 week

    const token = jwt.sign(
      {
        id: user._id,

        username: user.username,
        avatar: user.avatar,
        isAdmin: false,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age },
    );

    // Create user info object
    const userInfo = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar, // This will be null if no avatar
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true, // uncomment in production with HTTPS
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    console.error(error);
  }
};

// Logout user
export const logoutUser = (req, res) => {
  res.clearCookie("token").status(200).json({ msg: "Logged out successfully" });
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { username, email, avatar } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if new username/email already exists (if changed)
    if (username && username !== user.username) {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ msg: "Username already exists" });
      }
      user.username = username;
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email already exists" });
      }
      user.email = email;
    }

    if (avatar) user.avatar = avatar;

    await user.save();

    const userResponse = {
      _id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    res.status(200).json({ msg: "Profile updated successfully", data: userResponse });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    console.error(error);
  }
};
