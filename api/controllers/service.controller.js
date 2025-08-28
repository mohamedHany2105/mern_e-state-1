import Service from "../models/service.model.js";

import { errorHandler } from "../utils/error.js";

export const getAllService = async (req, res, next) => {
  try {
    const service = await Service.find({});

    res.status(200).json({
      service,
    });
  } catch (error) {}
};

export const createService = async (req, res, next) => {
  const {name,description,address,regularPrice,discountPrice,bathrooms,bedrooms,furnished,parking,type,offer,imageUrls,userRef}=req.body

  try {
    const service = await Service.create({name,description,address,regularPrice,discountPrice,bathrooms,bedrooms,furnished,parking,type,offer,imageUrls,userRef});

    if (!service) {
      return next(errorHandler(401, "missing information"));
    }

    res.status(201).json({
      service
    });
  } catch (error) {
    next(error);
  }
};

export const getOneService = async (req, res, next) => {
  const { id } = req.params;

  try { 
    const service = await Service.findById(id);

    if (!service) {
      return next(errorHandler(400, "service not found"));
    }
    res.status(200).json({
      service,
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const service = await Service.findByIdAndUpdate(id, req.body);

    res.status(200).json({
      service,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  const {id}=req.params;  
  try {
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return next(errorHandler(400, "service not found"));
    }
    res.status(200).json({
      messae: "deleted successfully ",
    });
  } catch (error) {
    next(error);
  }
};
