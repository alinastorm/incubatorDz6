
import cryptoService from '../_common/services/crypto-service';
import usersRepository from './users-repository';
import { Filter } from 'mongodb';
import authRepository from '../Auth/auth-repository';
import { UserInputModel, UsersSearchPaginationModel, UserViewModel } from './types';
import { AuthViewModel } from '../Auth/types';
import { BlogViewModel } from '../Blogs/types';
import { HTTP_STATUSES, RequestWithBody, RequestWithParams, RequestWithQuery, ResponseWithBodyCode } from '../_common/services/http-service/types';
import { Paginator, SearchPaginationModel } from '../_common/repository/types';


class UserController {

    async readAllPagination(
        req: RequestWithQuery<UsersSearchPaginationModel>,
        res: ResponseWithBodyCode<Paginator<UserViewModel[]>, 200>
    ) {

        const { pageNumber, pageSize, searchEmailTerm, searchLoginTerm, sortBy, sortDirection } = req.query

        const filter: Filter<UserViewModel> = { $or: [] }
        if (searchEmailTerm) filter.$or?.push({ email: { $regex: searchEmailTerm, $options: 'i' } })
        if (searchLoginTerm) filter.$or?.push({ login: { $regex: searchLoginTerm, $options: 'i' } })
        let query: SearchPaginationModel
        filter.$or?.length ?
            query = { pageNumber, pageSize, filter, sortBy, sortDirection } :
            query = { pageNumber, pageSize, sortBy, sortDirection }

        const result: Paginator<UserViewModel[]> = await usersRepository.readAllOrByPropPaginationSort(query)

        res.status(HTTP_STATUSES.OK_200).send(result)
    }

    async createOne(
        req: RequestWithBody<UserInputModel>,
        res: ResponseWithBodyCode<UserViewModel, 201 | 404>
    ) {

        const { email, login, password } = req.body
        const createdAt = new Date().toISOString()
        const queryUser: Omit<UserViewModel, 'id'> = { email, login, createdAt }
        const userId: string = await usersRepository.createOne(queryUser)

        const passwordHash = await cryptoService.generateHash(password)

        const queryAuth: Omit<AuthViewModel, "id"> = { passwordHash, userId, createdAt }
        const idAuth: string = await authRepository.createOne(queryAuth)

        const user: UserViewModel | null = await usersRepository.readOne(userId)
        if (!user) return res.status(HTTP_STATUSES.NOT_FOUND_404)
        res.status(HTTP_STATUSES.CREATED_201).send(user)
    }

    async deleteOne(
        req: RequestWithParams<{ id: string }>,
        res: ResponseWithBodyCode<BlogViewModel, 204 | 404>
    ) {
        const { id } = req.params
        const result: boolean = await usersRepository.deleteOne(id)
        // const result: boolean = await usersWriteRepository.deleteOne(query)

        if (!result) return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    }

}
export default new UserController()