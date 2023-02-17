import { CustomError } from "../error/CustomError";
import { user} from "../model/user";
import { BaseDatabase } from "./BaseDataBase";

export class UserDataBase extends BaseDatabase{
    private userTable = 'Cookenu_users'

    public signup = async(user: user): Promise<void> => {
        try{
            await UserDataBase.connection(this.userTable)
            .insert(user)
        }catch(error:any){
            throw new CustomError(400, error.message);
        }
    }


}