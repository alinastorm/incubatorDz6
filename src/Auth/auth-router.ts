import express from 'express';


import { mainValidator400 } from '../_common/middlewares/mainValidator-middleware';
import { authJwtBearerMiddleware } from '../_common/middlewares/authJwtBearer-middleware';
import { schemaLoginInputValidationMiddleware } from '../_common/middlewares/schemaLoginInput-validation-middleware';
import authController from './auth-controller';


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

