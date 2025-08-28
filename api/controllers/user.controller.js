import User from "../models/user.model.js";
import {errorHandler} from "../utils/error.js";
import Service from "../models/service.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(200).json({
      users
    });
  } catch (error) {
    next(error);
  }
};

export const getOneUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(errorHandler(401, "error in user id"));
    }

    res.status(201).json({
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const user = await User.findByIdAndUpdate(id, { name, email, password });
    if (!user) {
      return next(errorHandler(401, "user not found"));
    }

    res.status(201).json({
      message: "updated successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return next(errorHandler(401, "user not found"));
    }

    res.status(201).json({
      message: "deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserService = async (req, res, next) => {
  const {id}=req.params;
 
    console.log(id)
    try {
      const userList = await Service.findOne({ userRef: id});

      res.status(200).json({
        userList
      })
      
    } catch (error) {
      next(error);
    }
 
};
