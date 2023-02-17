import { UserDataBase } from "../data/UserBaseDataBase";
import { CustomError } from "../error/CustomError";
import { EmailNotFound, InvalidRole, NameNotFound, PasswordNotFound, RoleNotFound } from "../error/userErrors";
import { user, UserInputDTO, UserRole } from "../model/user";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";


const idGenerator = new IdGenerator()
const userDataBase = new UserDataBase()
const tokenGenerator = new TokenGenerator()
const hashManager = new HashManager()

export class UserBusiness {
    public signup = async(input: UserInputDTO) => {
        try{
            
            const {name, email,password, role} = input

            if(!name){
                throw new NameNotFound()
            }
            if(!email){
                throw new EmailNotFound()
            }
            if(!password){
                throw new PasswordNotFound()
            }
            if(!role){
                throw new RoleNotFound()
            }

            const id: string = idGenerator.generateId();

            const hashPassword: string = await hashManager.hash(password);

            if(role.toUpperCase() != UserRole.ADMIN && role.toUpperCase() != UserRole.NORMAL){
                throw new InvalidRole()
            }

            const user: user = {
                id,
                name,
                email,
                password: hashPassword,
                role
            }

            await userDataBase.signup(user)
            const token = tokenGenerator.generateToken({id,role})
            return token

        }catch(error:any){
            throw new CustomError(400, error.message);
        }
    }
}