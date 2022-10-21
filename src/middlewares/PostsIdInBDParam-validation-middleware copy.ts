import { NextFunction, Response } from 'express';
import postsRepository from '../repository/posts-repository';
import { HTTP_STATUSES } from '../types/types';




export const postParamIdInBDValidationMiddleware = async (req: any, res: Response, next: NextFunction) => {
    const postId = req.params.postId
    const post = await postsRepository.readOne(postId)
    
    if (!post) {
        return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
    next()
}