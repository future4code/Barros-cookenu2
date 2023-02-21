import { CustomError } from "./CustomError";

export class UserNotFound1 extends CustomError{
    constructor(){
        super(404, "User1 Not Found")
    }
}

export class UserNotFound2 extends CustomError{
    constructor(){
        super(404, "User2 Not Found")
    }
}

export class DuplicatedId extends CustomError {
    constructor() {
        super(404, "You can't add yourself.")
    }
}

export class NoExistingFriendship extends CustomError {
    constructor() {
        super(404, "The users selected are not friends.")
    }
}