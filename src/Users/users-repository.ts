import authRepository from '../Auth/auth-repository';
import Repository from '../_common/repository/Repository';
import { Filter } from 'mongodb';
import mongoDbAdapter from '../_common/db-adapters/mongo/mongoDb-adapter';
import { AuthViewModel } from '../Auth/types';
import { AdapterType } from '../_common/db-adapters/mongo/types';



class UserRepository extends Repository {
    constructor(collectionName: string, dataService: AdapterType) { super(collectionName, dataService) }


    async deleteOne(id: string) {
        // Удаляем users        
        const isDeleted = await super.deleteOne(id)
        if (!isDeleted) return false
        // Удаляем auth
        const filter: Filter<AuthViewModel> = { userId: id }
        const auths = await authRepository.readAll(filter)
        auths.forEach((auth) => {
            authRepository.deleteOne(auth.id)
        })
        return true

    }
}


export default new UserRepository('users',mongoDbAdapter)







