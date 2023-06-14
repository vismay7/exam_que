import express, { Express, Request, Response } from "express";
import cors from "cors";
import router from "./routes";
import fileUpload from "express-fileupload";

const app: Express = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(fileUpload());

app.use("/", router);

app.listen(3000, () => console.log("server run on 3000"));
