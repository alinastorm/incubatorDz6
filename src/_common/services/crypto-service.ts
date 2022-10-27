import bcrypt from "bcrypt"



const cryptoService = {
    async generateHash(password: string, salt?: string) {
        const passwordSalt = salt || await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, passwordSalt)
        return passwordSalt + ":" + passwordHash
    },
    async checkHash(passwordHash: string, pass: string) {
        const [salt] = passwordHash.split(':')
        return passwordHash === await this.generateHash(pass, salt)
    }

}
export default cryptoService