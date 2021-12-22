import express from "express";
import TourController from "../controllers/tourController";
import Validator from "../middlewares/validator";
import verifyToken from "../middlewares/verifyToken";
import varifyAccess from "../middlewares/verifyAccess";

const tourRouter = express.Router();

tourRouter.post(
    "/createTour", verifyToken,
    Validator.createTourRules(),
    Validator.validateInput,
TourController.createTour)
tourRouter.get("/all", TourController.getAllTours)
tourRouter.get("/:id", TourController.getOneTour);
tourRouter.delete("/:id", TourController.deleteOneTour);




export default tourRouter;