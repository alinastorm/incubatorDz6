import express from 'express';
import blogsController from "../controllers/blogs-controller";
import { nameBodyValidationMiddleware } from '../middlewares/name-validation-middleware';
import { youtubeUrlBodyValidationMiddleware } from '../middlewares/youtubeUrl-validation-middleware';
import { authorizationBasicMiddleware } from '../middlewares/authorization-validation-middleware';

import { mainValidator } from '../middlewares/mainValidator-middleware';
import { searchNameTermQueryValidationMiddleware } from '../middlewares/searchNameTerm-query-validation-middleware';
import { pageNumberQueryValidationMiddleware } from '../middlewares/pageNumber-validation-middleware';
import { sortByBlogsQueryValidationMiddleware } from '../middlewares/sortByBlogs-validation-middleware';
import { pageSizeQueryValidationMiddleware } from '../middlewares/pageSize-validation-middleware';
import { sortDirectionQueryValidationMiddleware } from '../middlewares/sortDirection-validation-middleware';
import { blogIdParamUriValidationMiddleware } from '../middlewares/blogId-param-validation-middleware';
import { titleBodyValidationMiddleware } from '../middlewares/title-validation-middleware';
import { shortdescriptionBodyValidationMiddleware } from '../middlewares/shortdescription-validation-middleware';
import { contentBodyValidationMiddleware } from '../middlewares/content-validation-middleware';
import { bloggerParamIdInBDValidationMiddleware } from '../middlewares/bloggerIdInBDParam-validation-middleware';
import { sortByPostsQueryValidationMiddleware } from '../middlewares/sortByPosts-validation-middleware';

export const blogsRoutes = express.Router()


blogsRoutes.get(`/blogs`,
    searchNameTermQueryValidationMiddleware,
    pageNumberQueryValidationMiddleware,
    pageSizeQueryValidationMiddleware,
    sortByBlogsQueryValidationMiddleware,
    sortDirectionQueryValidationMiddleware,
    blogsController.readAllOrByNamePaginationSort)

blogsRoutes.post(`/blogs`,
    authorizationBasicMiddleware,
    nameBodyValidationMiddleware,
    youtubeUrlBodyValidationMiddleware,
    mainValidator,
    blogsController.createOne)

blogsRoutes.get(`/blogs/:blogId/posts`,
    blogIdParamUriValidationMiddleware,
    pageNumberQueryValidationMiddleware,
    pageSizeQueryValidationMiddleware,
    sortByPostsQueryValidationMiddleware,
    sortDirectionQueryValidationMiddleware,
    mainValidator,
    bloggerParamIdInBDValidationMiddleware,
    blogsController.readAllPostsByBlogIdWithPaginationAndSort)


blogsRoutes.post(`/blogs/:blogId/posts`,
    authorizationBasicMiddleware,
    blogIdParamUriValidationMiddleware,
    titleBodyValidationMiddleware,
    shortdescriptionBodyValidationMiddleware,
    contentBodyValidationMiddleware,
    mainValidator,
    bloggerParamIdInBDValidationMiddleware,
    blogsController.createPostsByBlogId)

blogsRoutes.get(`/blogs/:blogId`,
    blogIdParamUriValidationMiddleware,
    mainValidator,
    bloggerParamIdInBDValidationMiddleware,
    blogsController.readOne)

blogsRoutes.put(`/blogs/:blogId`,
    authorizationBasicMiddleware,
    blogIdParamUriValidationMiddleware,
    nameBodyValidationMiddleware,
    youtubeUrlBodyValidationMiddleware,
    mainValidator,
    bloggerParamIdInBDValidationMiddleware,
    blogsController.updateOne)

blogsRoutes.delete(`/blogs/:blogId`,
    authorizationBasicMiddleware,
    blogIdParamUriValidationMiddleware,
    mainValidator,
    bloggerParamIdInBDValidationMiddleware,
    blogsController.deleteOne)



   // oneOf([
        //     nameBodyValidationMiddleware,
        //     youtubeUrlBodyValidationMiddleware,
        // ]),