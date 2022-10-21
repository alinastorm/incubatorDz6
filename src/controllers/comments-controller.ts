import { Response } from 'express';
import commentsRepository from '../repository/comments-repository';
import { BlogViewModel, RequestWithBody, UserViewModel, UserInputModel, RequestWithParams, ResponseWithBodyCode, CommentInputModel, RequestWithParamsBody, ResponseWithCode, CommentViewModel, HTTP_STATUSES, CommentBdModel, NoExtraProperties } from '../types/types';


// делаем контроллеры комментов в коментах

class Controller {

    async readAll(req: Request, res: Response) {
        const result = await commentsRepository.readAll<CommentBdModel>()
        res.send(result)
    }
    async readOne(
        req: RequestWithParams<{ commentId: string }>,
        res: ResponseWithBodyCode<CommentViewModel, 200 | 404>
    ) {
        const commentId = req.params.commentId
        const comment = await commentsRepository.readOne<CommentBdModel>(commentId)
        if (!comment) return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        const { postId, ...other } = comment
        const mapComment: NoExtraProperties<CommentViewModel, typeof other> = other
        res.status(HTTP_STATUSES.OK_200).send(mapComment)
    }
    async updateOne(
        req: RequestWithParamsBody<{ commentId: string }, CommentInputModel> & { userId: string },
        res: ResponseWithCode<204 | 403 | 404>) {

        const { commentId } = req.params
        const  content = req.body
        const userId = req.userId
        const comment = await commentsRepository.readOne<CommentBdModel>(commentId)
        if (!comment) return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        if (comment.userId !== userId) return res.sendStatus(HTTP_STATUSES.NO_ACCESS_CONTENT_403)
        const isUpdated = await commentsRepository.updateOne(commentId, content)
        isUpdated ?
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) :
            null
    }
    async deleteOne(
        req: RequestWithParams<{ commentId: string }> & { userId: string },
        res: ResponseWithBodyCode<BlogViewModel, 204 | 403 | 404>
    ) {
        const { commentId } = req.params
        const userId = req.userId
        const comment = await commentsRepository.readOne<CommentBdModel>(commentId)
        if (!comment) return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        if (comment.userId !== userId) return res.sendStatus(HTTP_STATUSES.NO_ACCESS_CONTENT_403)
        const isDeleted = await commentsRepository.deleteOne(commentId)
        isDeleted ?
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204) : null
        // res.sendStatus(HTTP_STATUSES.SERVER_ERROR_500)
    }

}
export default new Controller()