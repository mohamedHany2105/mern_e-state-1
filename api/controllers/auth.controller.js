import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return next(errorHandler(401, "Incorrect email or password"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1m" });
    res.cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 1000),
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    });
    res.status(200).json({
      message: "Sign in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        img_profile: user.img_profile
      }
    });
  } catch (error) {
    next(error);
  }
};

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(200).json({
      message: "user created",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    token=res.cookie.access_token;

    res.clearCookie(token).status(200).json({
        message:"signOut successfully"
    })
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
