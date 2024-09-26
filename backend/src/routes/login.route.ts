import express from "express";
import { loginControler } from "../controler/login.controler";

const loginRouter = express()

loginRouter.route("/").post(loginControler)

export {loginRouter}