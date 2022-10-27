
import Repository from '../_common/repository/Repository';
import mongoDbAdapter from '../_common/db-adapters/mongo/mongoDb-adapter';
import { AdapterType } from '../_common/db-adapters/mongo/types';



class CommentsRepository extends Repository {
    constructor(collectionName: string, dataService: AdapterType) { super(collectionName, dataService) }

}


export default new CommentsRepository("comments", mongoDbAdapter)







