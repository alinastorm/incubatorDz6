import express from 'express';
import authController from "../controllers/auth-controller";


import { mainValidator400 } from '../middlewares/mainValidator-middleware';
import { loginBodyValidationMiddleware } from '../middlewares/login-body-validation-middleware';
import { passwordBodyValidationMiddleware } from '../middlewares/password-body-validation-middleware';
import { authJwtBearerMiddleware } from '../middlewares/authJwtBearer-middleware';
import { schemaLoginInputValidationMiddleware } from '../middlewares/schemaLoginInput-validation-middleware';


export const authRoutes = express.Router()


authRoutes.post(`/auth/login`,
    // loginBodyValidationMiddleware,
    // passwordBodyValidationMiddleware,
    schemaLoginInputValidationMiddleware,
    mainValidator400,
    authController.login)

authRoutes.post(`/auth/me`,
    <any>authJwtBearerMiddleware,
    <any>authController.getUser)

