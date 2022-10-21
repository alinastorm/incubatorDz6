import { AuthViewModel } from '../types/types';
import authRepository from './auth-repository';
import Repository from './repository';
import { Filter } from 'mongodb';



class UserRepository extends Repository {
    constructor() { super('comments') }
}


export default new UserRepository()







