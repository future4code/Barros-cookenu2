import express from "express";
import { FriendShipController } from "../controller/FriendShipController";


const friendShipController = new FriendShipController()

export const friendShipRouter = express.Router();


friendShipRouter.post('/follow', friendShipController.addFriend)
friendShipRouter.get('/allfriendship', friendShipController.getAllFriends)
friendShipRouter.delete('/friendship/:user_1_id', friendShipController.unfollow)