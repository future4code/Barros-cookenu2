import { FriendShipBaseDataBase } from "../data/FriendShipBaseDataBase";
import { UserDataBase } from "../data/UserBaseDataBase";
import { CustomError } from "../error/CustomError";
import { DuplicatedId, NoExistingFriendship, UserNotFound1, UserNotFound2 } from "../error/friendShipError";
import { IdNotFound } from "../error/userErrors";
import { friends, FriendsInputDTO } from "../model/friendship";
import { IdGenerator } from "../services/IdGenerator";

const friendShipBaseDataBase = new FriendShipBaseDataBase()
const userDataBase = new UserDataBase()
const idGenerator = new IdGenerator()

export class FriendShipBusiness {
    public addFriend = async (input:FriendsInputDTO) =>{
        try {
        
            const {user_1_id, user_2_id} = input

        if( !user_1_id){
            throw new UserNotFound1();            
        }

        if( !user_2_id){
            throw new UserNotFound2();            
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

    public getAllFriends = async () => {
        try {
           const result = friendShipBaseDataBase.getAllFriends()
           return result 
        } catch (error:any) {
            throw new CustomError(400, error.message);
        }
    }

    public unfollow = async (input:FriendsInputDTO) => {
        try {
            const {user_1_id, user_2_id} = input

            if( !user_1_id){
                throw new UserNotFound1();            
            }
    
            if( !user_2_id){
                throw new UserNotFound2();            
            }

            if(user_1_id === user_2_id){
                throw new DuplicatedId()
            }

            const allUsers = await userDataBase.getAllUsers()                      

            const checkUser1 = allUsers.find(user => user.id === user_1_id)

            
            if(!checkUser1) {
                throw new IdNotFound()
            }

            const checkUser2 = allUsers.find(user => user.id === user_2_id)

            if(!checkUser2) {
                throw new IdNotFound()
            }

            
            
            const allFriendsShips = await friendShipBaseDataBase.getAllFriends()

            

            const getFriendShips = allFriendsShips.find(friendship => friendship.user_1_id === checkUser1.id && friendship.user_2_id === checkUser2.id || friendship.user_1_id === checkUser2.id && friendship.user_2_id === checkUser1.id)

            
            if(!getFriendShips){
                throw new NoExistingFriendship()
            }

            const id = getFriendShips.id

            await friendShipBaseDataBase.unfollow(id)            

                        
        } catch (error:any) {
            throw new CustomError(400, error.message); 
        }
    }




}