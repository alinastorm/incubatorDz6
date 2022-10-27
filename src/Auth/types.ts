export interface AuthInputModel {
    userId: string
    passwordHash: string // maxLength: 20 minLength: 6
}
export interface AuthViewModel {
    id: string
    userId: string
    passwordHash: string // maxLength: 20 minLength: 6
    createdAt: string
}

export interface MeViewModel {
    email: string
    login: string
    userId: string

}

export interface LoginSuccessViewModel {
    accessToken: string //    JWT access token
}

export interface LoginInputModel {
    login: string
    password: string
}