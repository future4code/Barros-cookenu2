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
            res.status(error.statusCode || 400).send(error.message || error.sqlMessag)
        }
    }
}