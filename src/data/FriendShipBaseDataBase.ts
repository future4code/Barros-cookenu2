import { CustomError } from "../error/CustomError";
import { friends } from "../model/friendship";
import { BaseDatabase } from "./BaseDataBase";

export class FriendShipBaseDataBase extends BaseDatabase{
    private friendShipTable = 'Cookenu_friends'

    public addFriend = async (friends: friends) => {
        try {
            await FriendShipBaseDataBase.connection(this.friendShipTable)
            .insert(friends)            
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }


}