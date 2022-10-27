import { UserViewModel } from '../Users/types';
import usersRepository from '../Users/users-repository';
import cryptoService from '../_common/services/crypto-service';
import { HTTP_STATUSES, RequestWithBody, ResponseWithBodyCode } from '../_common/services/http-service/types';
import { jwtService } from '../_common/services/jwt-service';
import authRepository from './auth-repository';
import { AuthViewModel, LoginInputModel, LoginSuccessViewModel, MeViewModel } from './types';


class AuthController {

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
export default new AuthController()