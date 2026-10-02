import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middleware/error.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import dns from "node:dns";

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const app = express();
config()

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
})

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())


app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
);

app.get('/' , (req, res) => {
    res.end('server running!');
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

dbConnection()


app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
    console.log(`Server running at ${process.env.PORT}`)    
})