import { FriendShipBaseDataBase } from "../data/FriendShipBaseDataBase";
import { CustomError } from "../error/CustomError";
import { UserNotFound } from "../error/friendShipError";
import { friends, FriendsInputDTO } from "../model/friendship";
import { IdGenerator } from "../services/IdGenerator";

const friendShipBaseDataBase = new FriendShipBaseDataBase()
const idGenerator = new IdGenerator()

export class FriendShipBusiness {
    public addFriend = async (input:FriendsInputDTO) =>{
        try {
        
            const {user_1_id, user_2_id} = input

        if( !user_1_id){
            throw new UserNotFound();            
        }

        if( !user_2_id){
            throw new UserNotFound();            
        }

        const id = idGenerator.generateId()

        const friends: friends = {
            id,
            user_1_id,
            user_2_id
        }

        await friendShipBaseDataBase.addFriend(friends)
        
    } catch (error:any) {
            throw new CustomError(400, error.message);
        }


    }
}