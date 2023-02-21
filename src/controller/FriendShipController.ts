import { Request, Response } from "express";
import { FriendShipBusiness } from "../business/FriendShipBusiness";
import { FriendsInputDTO } from "../model/friendship";

const friendShipBusiness = new FriendShipBusiness()
export class FriendShipController {
    public addFriend = async(req:Request, res: Response) => {
        try {
            const input:FriendsInputDTO = {
                user_1_id: req.body.user_1_id,
                user_2_id: req.body.user_2_id
            }
            
        await friendShipBusiness.addFriend(input)

        res.status(201).send({message: "friendship created!"})
            
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public getAllFriends = async(req:Request, res: Response) => {
        try {
           const result =  await friendShipBusiness.getAllFriends()
           res.status(201).send(result)           
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public unfollow = async(req:Request, res: Response) => {
        try {

            const input: FriendsInputDTO = {
                user_1_id: req.params.user_1_id as string,
                user_2_id: req.body.user_2_id
            }

            console.log(input.user_2_id);
            

            await friendShipBusiness.unfollow(input)

            res.status(200).send({ message: "broken friendship! :(" }) 
                     
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


}