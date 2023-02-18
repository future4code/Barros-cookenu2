import express from "express";
import { FriendShipController } from "../controller/FriendShipController";


const friendShipController = new FriendShipController()

export const friendShipRouter = express.Router();


friendShipRouter.post('/follow', friendShipController.addFriend)