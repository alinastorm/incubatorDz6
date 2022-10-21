import express from 'express';
import commentsController from "../controllers/comments-controller";
import { mainValidator400 } from '../middlewares/mainValidator-middleware';
import { commentIdUriParamValidationMiddleware } from '../middlewares/commentID-param-validation-middleware';
import { commentsInputModelSchemaValidationMiddleware } from '../middlewares/commentsInputSchema-validation-middleware';
import { authJwtBearerMiddleware } from '../middlewares/authJwtBearer-middleware';


export const commentsRoutes = express.Router()


commentsRoutes.put(`/comments/:commentId`,
    <any>authJwtBearerMiddleware,
    commentIdUriParamValidationMiddleware,
    commentsInputModelSchemaValidationMiddleware,
    mainValidator400,
    <any>commentsController.updateOne)

commentsRoutes.delete(`/comments/:commentId`,
    <any>authJwtBearerMiddleware,
    commentIdUriParamValidationMiddleware,
    mainValidator400,
    <any>commentsController.deleteOne)

commentsRoutes.get(`/comments/:commentId`,
    commentIdUriParamValidationMiddleware,
    mainValidator400,
    commentsController.readOne)

///testing
commentsRoutes.get(`/comments`,
    <any>commentsController.readAll)