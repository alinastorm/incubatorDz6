import jwt from "jsonwebtoken"
import { IObject, LoginSuccessViewModel } from "../types/types"
import { settings } from '../settings';


export const jwtService = {

     generateAccessToken(userId: string) {
        const accessToken = jwt.sign({ userId }, settings.JWT_SECRET, { expiresIn: '1h' })
        const result: LoginSuccessViewModel = { accessToken }
        return result
    },
     getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (error) {
            return null
        }

    }

}
