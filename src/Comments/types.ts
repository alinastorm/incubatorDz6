export interface CommentInputModel {
    content: string //   maxLength: 300     minLength: 20
}

export interface CommentViewModel {
    id: string //nullable: true
    content: string
    userId: string
    userLogin: string
    createdAt?: string//($date-time)

}
export interface CommentBdModel {
    id: string //nullable: true
    content: string
    userId: string
    userLogin: string
    postId: string
    createdAt?: string//($date-time)
}