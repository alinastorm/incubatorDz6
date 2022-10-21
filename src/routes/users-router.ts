import express from 'express';
import usersController from "../controllers/users-controller";
import { nameBodyValidationMiddleware } from '../middlewares/name-validation-middleware';
import { youtubeUrlBodyValidationMiddleware } from '../middlewares/youtubeUrl-validation-middleware';
import { authorizationBasicMiddleware401 } from '../middlewares/authBasic-validation-middleware';

import { mainValidator400 } from '../middlewares/mainValidator-middleware';
import { searchLoginTermQueryValidationMiddleware } from '../middlewares/searchLoginTerm-query-validation-middleware';
import { searchEmailTermQueryValidationMiddleware } from '../middlewares/searchEmailTerm-query-validation-middleware';
import { sortDirectionQueryValidationMiddleware } from '../middlewares/sortDirection-validation-middleware';
import { pageSizeQueryValidationMiddleware } from '../middlewares/pageSize-validation-middleware';
import { pageNumberQueryValidationMiddleware } from '../middlewares/pageNumber-validation-middleware';
import { sortByUsersQueryValidationMiddleware } from '../middlewares/sortByUsers-validation-middleware';
import { loginBodyValidationMiddleware } from '../middlewares/login-body-validation-middleware';
import { passwordBodyValidationMiddleware } from '../middlewares/password-body-validation-middleware';
import { emailBodyValidationMiddleware } from '../middlewares/email-validation-middleware';
import { userIdParamUriValidationMiddleware } from '../middlewares/userId-param-validation-middleware';


export const usersRoutes = express.Router()


usersRoutes.get(`/users`,
    searchLoginTermQueryValidationMiddleware,
    searchEmailTermQueryValidationMiddleware,
    pageNumberQueryValidationMiddleware,
    pageSizeQueryValidationMiddleware,
    sortByUsersQueryValidationMiddleware,
    sortDirectionQueryValidationMiddleware,
    mainValidator400,
    <any>usersController.readAllPagination)

usersRoutes.post(`/users`,
    authorizationBasicMiddleware401,
    loginBodyValidationMiddleware,
    passwordBodyValidationMiddleware,
    emailBodyValidationMiddleware,
    mainValidator400,
    usersController.createOne)

usersRoutes.delete(`/users/:id`,
    authorizationBasicMiddleware401,
    userIdParamUriValidationMiddleware,
    mainValidator400,
    usersController.deleteOne)