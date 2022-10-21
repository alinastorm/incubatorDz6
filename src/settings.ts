export const settings = {
    MONGO_URI: 'mongodb+srv://AlexGr:mth0F2JOfBhmJlk4@cluster0.ojk6ayv.mongodb.net/?retryWrites=true&w=majority' || process.env.mongoURI || 'mongodb://127.0.0.1:27017',
    JWT_SECRET: process.env.JWT_SECRET || '123'
}