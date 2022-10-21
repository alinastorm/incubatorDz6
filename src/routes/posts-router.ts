import express from 'express';
import postsController from "../controllers/posts-controller"
import { titleBodyValidationMiddleware } from '../middlewares/title-validation-middleware';
import { postIdParamValidationMiddleware } from '../middlewares/postIdParam-validation-middleware';
import { contentBodyValidationMiddleware } from '../middlewares/content-validation-middleware';
import { shortdescriptionBodyValidationMiddleware } from '../middlewares/shortdescription-validation-middleware';
import { authorizationBasicMiddleware401 } from '../middlewares/authBasic-validation-middleware';
import { mainValidator400 } from '../middlewares/mainValidator-middleware';
import { pageNumberQueryValidationMiddleware } from '../middlewares/pageNumber-validation-middleware';
import { pageSizeQueryValidationMiddleware } from '../middlewares/pageSize-validation-middleware';
import { sortByPostsQueryValidationMiddleware } from '../middlewares/sortByPosts-validation-middleware';
import { sortDirectionQueryValidationMiddleware } from '../middlewares/sortDirection-validation-middleware';
import { postParamIdInBDValidationMiddleware } from '../middlewares/PostsIdInBDParam-validation-middleware copy';
import { blogIdBodyWithCheckBDValidationMiddleware } from '../middlewares/blogId-bodyWithChekBD-validation-middleware';
import { commentsInputModelSchemaValidationMiddleware } from '../middlewares/commentsInputSchema-validation-middleware';
import { sortByCommentsQueryValidationMiddleware } from '../middlewares/sortByComments-validation-middleware';
import { authJwtBearerMiddleware } from '../middlewares/authJwtBearer-middleware';

const mainRoute = 'posts'

export const postsRoutes = express.Router()


postsRoutes.get(`/posts/:postId/comments`,
    pageNumberQueryValidationMiddleware,
    pageSizeQueryValidationMiddleware,
    sortByCommentsQueryValidationMiddleware,
    sortDirectionQueryValidationMiddleware,
    mainValidator400,
    postParamIdInBDValidationMiddleware,
    <any>postsController.getCommentsByPostIdPaginationSort)

postsRoutes.post(`/posts/:postId/comments`,
    <any>authJwtBearerMiddleware,
    postIdParamValidationMiddleware,
    commentsInputModelSchemaValidationMiddleware,
    mainValidator400,
    // postParamIdInBDValidationMiddleware,
    <any>postsController.createCommentsByPostId)


postsRoutes.get(`/posts`,
    pageNumberQueryValidationMiddleware,
    pageSizeQueryValidationMiddleware,
    sortByPostsQueryValidationMiddleware,
    sortDirectionQueryValidationMiddleware,
    mainValidator400,
    <any>postsController.readAllPaginationSort)

postsRoutes.post(`/posts`,
    authorizationBasicMiddleware401,
    titleBodyValidationMiddleware,
    shortdescriptionBodyValidationMiddleware,
    contentBodyValidationMiddleware,
    blogIdBodyWithCheckBDValidationMiddleware,
    mainValidator400,
    // bloggerBodyIdInBDValidationMiddleware,
    postsController.createOne)

postsRoutes.get(`/posts/:postId`,
    postIdParamValidationMiddleware,
    mainValidator400,
    postParamIdInBDValidationMiddleware,
    postsController.readOne)

postsRoutes.put(`/posts/:postId`,
    authorizationBasicMiddleware401,
    postIdParamValidationMiddleware,
    titleBodyValidationMiddleware,
    shortdescriptionBodyValidationMiddleware,
    contentBodyValidationMiddleware,
    blogIdBodyWithCheckBDValidationMiddleware,
    mainValidator400,
    postParamIdInBDValidationMiddleware,
    // bloggerBodyIdInBDValidationMiddleware,
    postsController.updateOne)

postsRoutes.delete(`/posts/:postId`,
    authorizationBasicMiddleware401,
    postIdParamValidationMiddleware,
    mainValidator400,
    postParamIdInBDValidationMiddleware,
    postsController.deleteOne)


