import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { loginDTO, userGetByIdDTO, UserInputDTO} from "../model/user";

const userBusiness = new UserBusiness()

export class UserController {
    public signup = async(req: Request, res:Response) => {
        try{
            const input: UserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
           
            const token = await userBusiness.signup(input)

            res.status(200).send({message: "User Created!", token})

        }catch(error:any){
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

   public login = async (req: Request, res: Response) => {
        try {
            
            const input: loginDTO= {
                email: req.body.email,
                password: req.body.password
            }

        const token = await userBusiness.login(input)
        res.status(200).send({message: "Logged in user!", token})

        } catch (error: any) {
        res.status(error.statusCode || 400).send(error.message || error.sqlMessage)        }
   }

   public UserProfile = async (req: Request, res: Response)=>{
    try {

        const  token = req.headers.authorization as string
        
        const result = await userBusiness.UserProfile(token)
        res.status(200).send(result[0])

    } catch (error: any) {
    res.status(error.statusCode || 400).send(error.message || error.sqlMessage)  
        
    }
   }

   public getUserById = async (req: Request, res: Response)=>{
    try {

        const input: userGetByIdDTO = {
            id: req.params.id,
            token: req.headers.authorization as string
        } 
        const result = await userBusiness.getUserById(input)
        res.status(200).send(result[0])

    } catch (error: any) {
    res.status(error.statusCode || 400).send(error.message || error.sqlMessage)  
        
    }
   }

   public getAllUsers =async (req: Request, res: Response) => {
    try {
        const result = await userBusiness.getAllUsers()
        res.status(200).send(result)
    } catch (error:any) {
        res.status(error.statusCode || 400).send(error.message || error.sqlMessage)    
    }
   }


}