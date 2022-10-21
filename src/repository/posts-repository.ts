import { Filter } from 'mongodb';
import { CommentBdModel } from '../types/types';
import commentsRepository from './comments-repository';
import Repository from './repository';


class UserRepository extends Repository {
    constructor() { super('posts') }
    async deleteOne(id: string): Promise<boolean> {

        const isPostDeleted = await super.deleteOne(id)
        if (!isPostDeleted) return false

        const filter: Filter<CommentBdModel> = { postId: id }
        const comments = await commentsRepository.readAll<CommentBdModel>(filter)
        comments.forEach(async ({ id }) => {
            await commentsRepository.deleteOne(id)
        })
        return true
    }
}

export default new UserRepository()







