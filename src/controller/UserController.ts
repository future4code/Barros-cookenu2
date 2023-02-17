import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserInputDTO } from "../model/user";

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
}