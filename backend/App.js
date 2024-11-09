import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors";
import DbConnect from "./DB/DbConnect.js";
import authRoutes from "./Routes/Auth.route.js";
import userRoute from "./Routes/User.route.js"

configDotenv();


const Server_app = () => {

  const app = express();

  const PORT = process.env.PORT || 3001;
    // Configure CORS options if you need to limit allowed origins or methods
  const corsOptions = {
    origin: 'http://localhost:3000', // Frontend URL
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // Enable if using cookies
  };

  app.use(express.json());
  app.use(cors(corsOptions));

  app.listen(PORT, () => {
    DbConnect();
    console.log(`[*] Server is Online @ http://localhost:${PORT}`);
  });

  app.get("/", (req, res) => {

    const API_home_page = "Job_portal Api";
    res.send(API_home_page).status(200);
  });

  app.use('/auth', authRoutes);
  app.use('/users', userRoute);

}

export default Server_app;


