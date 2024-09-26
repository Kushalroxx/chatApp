import express from "express";
import cookieParser from "cookie-parser";
import {loginRouter} from "./routes/login.route"
import bodyParser from "body-parser";

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/login", bodyParser.urlencoded({extended:false}),loginRouter);

export default app;