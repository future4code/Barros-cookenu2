import { CustomError } from "./CustomError";

export class MissingData extends CustomError {
    constructor() {
        super(406, '"name", "email" and "password" must be informed')
    }
}



export class UserIdNotFound extends CustomError {
    constructor() {
        super(404, "User ID not found.")
    }
}

export class InvalidName extends CustomError{ 
    constructor(){
        super(400, "invalid name")
    }
}

export class InvalidEmail extends CustomError{ 
    constructor(){
        super(400, "invalid Email")
    }
}

export class InvalidPassword extends CustomError{ 
    constructor(){
        super(400, "invalid password")
    }
}