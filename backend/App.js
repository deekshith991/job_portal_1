import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import DbConnect from "./DB/DbConnect.js";
import authRoutes from "./Routes/Auth.route.js";

configDotenv();


const Server_app = () => {

  const app = express();

  const PORT = process.env.PORT || 3001;

  app.use(express.json());
  app.use(cors());

  app.listen(PORT, () => {
    DbConnect();
    console.log(`[*] Server is Online @ http://localhost:${PORT}`);
  });

  app.get("/", (req, res) => {

    const API_home_page = "Job_portal Api";
    res.send(API_home_page).status(200);
  });

  app.use('/auth', authRoutes);

}

export default Server_app;


