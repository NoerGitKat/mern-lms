import { Request, Response, Router } from "express";
import { registerUser } from "../controllers/user.controller";
import { validateRegister } from "../utils/validation";

const userRouter = Router();

userRouter
  .route("/")
  .get((req: Request, res: Response) => res.status(200).json({ msg: "user works!" }));

userRouter.route("/register").post(validateRegister(), registerUser);

export default userRouter;
