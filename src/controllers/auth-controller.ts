import authRepository from '../repository/auth-repository';
import usersRepository from '../repository/users-repository';
import cryptoService from '../services/crypto-service';
import { jwtService } from '../services/jwt-service';
import { HTTP_STATUSES, RequestWithBody, ResponseWithCode, AuthViewModel, UserViewModel, ResponseWithBodyCode, LoginSuccessViewModel, RequestWithUser, MeViewModel, LoginInputModel } from '../types/types';


class Controller {

    async login(
        req: RequestWithBody<LoginInputModel>,
        res: ResponseWithBodyCode<LoginSuccessViewModel, 200 | 401>
    ) {
        const { login, password } = req.body
        // user
        const users = await usersRepository.readAll<UserViewModel>({ login })
        if (!users.length) return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        // auth
        const userId = users[0].id
        const auths = await authRepository.readAll<AuthViewModel>({ userId })
        if (!auths.length) return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        // hash
        const hash = auths[0].passwordHash
        const isEqual = await cryptoService.checkHash(hash, password)
        if (!isEqual) return res.sendStatus(HTTP_STATUSES.UNAUTHORIZED_401)
        //Token
        const token: LoginSuccessViewModel = jwtService.generateAccessToken(userId)

        res.status(HTTP_STATUSES.OK_200).send(token)
    }
    async getUser(
        req: Request & { headers: { authorization: string } } & { userId: string },
        res: ResponseWithBodyCode<MeViewModel, 200 | 404>
    ) {
        const user: UserViewModel | null = await usersRepository.readOne(req.userId)
        if (!user) return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        const result: MeViewModel = {
            email: user.email,
            login: user.login,
            userId: user.id
        }
        res.status(HTTP_STATUSES.OK_200).send(result)
    }
}
export default new Controller()