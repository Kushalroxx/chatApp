import express from "express";
import { loginControler ,signoutControler} from "../controler/login.controler";

const loginRouter = express()

loginRouter.route("/login").post(loginControler)
loginRouter.route("/signout").get(signoutControler)

export {loginRouter}