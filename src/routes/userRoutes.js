import express from "express";
import UserController from "../controllers/userController";
import Validator from "../middlewares/validator";
import DataChecker from "../middlewares/datachecker";
import verifyToken from "../middlewares/verifyToken";
import verifyAccess from "../middlewares/verifyAccess";

const userRouter = express.Router();

userRouter.post(
    "/register",
    Validator.newAccountRules(),
    Validator.validateInput,
    DataChecker.isEmailExist,
    UserController.createUser
    );
userRouter.post("/login",UserController.userLogin);
userRouter.get("/all", UserController.getAllUsers);
userRouter.get("/profile/:id", UserController.getOneUser);
userRouter.delete("/profile/:id", UserController.deleteOneUser);

// //booking paths
   userRouter.post(
    "/book/:id",
   verifyToken,
   verifyAccess("user"),
   UserController.bookTour);

  
userRouter.get("/books/all",UserController.getAllBookings);
userRouter.get("/books/:id",verifyToken,verifyAccess("admin"),UserController.getAllBookingsByTourId)
   
   



export default userRouter;
