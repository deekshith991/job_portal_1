import express from 'express';
import {
  user_register,
  user_login,
  company_register,
  company_login
} from "../controllers/authcontrollers.js";

const router = express.Router();

// User routes
router.post('/user/register', user_register);
router.post('/user/login', user_login);

// Company routes
router.post('/company/register', company_register);
router.post('/company/login', company_login);

export default router;
