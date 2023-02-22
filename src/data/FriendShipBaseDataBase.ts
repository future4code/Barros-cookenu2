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

    public getAllFriends = async () => {
        try {
           const result = await FriendShipBaseDataBase.connection(this.friendShipTable)
           return result 
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }

    public unfollow = async (id:string) => {
        try {
            await FriendShipBaseDataBase.connection(this.friendShipTable)
            .where({id})
            .delete()            
        } catch (error:any) {
            throw new CustomError(400, error.message); 
        }
    }

    public unfollowByAuthor = async(id:string) => {
        try {
            await FriendShipBaseDataBase.connection(this.friendShipTable)
            .where(function(){
                this.where("Cookenu_friends.user_1_id", "=", id)
                .orWhere("Cookenu_friends.user_2_id", "=",id)
            })
            .delete()            
        } catch (error:any) {
            throw new CustomError(400, error.message); 
        }
    }


}