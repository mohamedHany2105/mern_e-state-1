import Router from "express";

import {
  getAllService,
  getOneService,
  createService,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";
// import { verifyToken } from "../utils/verifyToken.js";

const serviceRouter = Router();

serviceRouter.get("/", getAllService);
serviceRouter.get("/:id", getOneService);
serviceRouter.post("/create", createService);
serviceRouter.post("/update/:id",updateService);
serviceRouter.delete("/delete/:id" ,deleteService);

export default serviceRouter;
