import { Router } from "express";
import { getHealthCheck } from "../controllers";

const globalRouter = Router();

globalRouter.route("/healthcheck").get(getHealthCheck);

export default globalRouter;
