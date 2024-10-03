import express from "express";
import cookieParser from "cookie-parser";
import {loginRouter} from "./routes/login.route"
import bodyParser from "body-parser";
import cors from "cors"

const app = express();

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/login", bodyParser.urlencoded({extended:false}),loginRouter);

export default app;