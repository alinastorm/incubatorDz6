import { Filter } from 'mongodb';
import postsRepository from '../Posts/posts-repository';
import { PostViewModel } from '../Posts/types';
import mongoDbAdapter from '../_common/db-adapters/mongo/mongoDb-adapter';
import { AdapterType } from '../_common/db-adapters/mongo/types';

import Repository from '../_common/repository/Repository';




class BlogsRepository extends Repository {
    constructor(collectionName: string, dataService: AdapterType) { super(collectionName, dataService) }

    async deleteOne(id: string): Promise<boolean> {

        const isBlogDeleted = await super.deleteOne(id)
        if (!isBlogDeleted) return false

        const filter: Filter<PostViewModel> = { blogId: id }
        const posts = await postsRepository.readAll<PostViewModel>(filter)
        posts.forEach(async ({ id }) => {
            await postsRepository.deleteOne(id)
        })

        return true

    }
}


export default new BlogsRepository('blogs', mongoDbAdapter)







