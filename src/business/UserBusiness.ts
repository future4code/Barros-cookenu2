import { UserDataBase } from "../data/UserBaseDataBase";
import { CustomError } from "../error/CustomError";
import { EmailNotFound, IdNotFound, invalidPassword, InvalidRole, NameNotFound, PasswordNotFound, RoleNotFound, TokenNotFound, Unauthorized, UserNotFound } from "../error/userErrors";
import { loginDTO, user, UserInputDTO, userProfileDTO, UserRole } from "../model/user";
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

    public login = async(input: loginDTO) =>{
        try {
            const {email, password} = input 
            if(!email){
                throw new EmailNotFound()
            }

            if(!password){
                throw new PasswordNotFound()
            }
            
            const user = await userDataBase.findUser(email)
                if(!user) {
                    throw new UserNotFound();
                }
            
                const validPassword: boolean= await hashManager.compare(password, user.password)

                if(!validPassword){
                    throw new invalidPassword;    
                }

            const token = tokenGenerator.generateToken({id: user.id, role:user.role})
            return token

        } catch (error:any) {
            throw new CustomError(400, error.message)
        }
    }

    public UserProfile = async (input: userProfileDTO) =>{
        try {
            const {id, token} = input

            if(!id){
                throw new IdNotFound()
            }

            if(!token){
                throw new TokenNotFound()
            }

            const data = tokenGenerator.tokenData(token)
            
            if(!data.id){
                throw new Unauthorized()
            }

           const result = await userDataBase.UserProfile(id)
           
           if(!result){
                throw new UserNotFound();
                
           }

           return result

        } catch (error: any) {
            throw new CustomError(400, error.message)
            
        }
    }
}