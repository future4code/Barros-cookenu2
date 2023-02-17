import { CustomError } from "./CustomError";

export class NameNotFound extends CustomError{
    constructor(){
        super(404, "Name not found")
    }
}

export class EmailNotFound extends CustomError{
    constructor(){
        super(404, "Email not found")
    }
}

export class PasswordNotFound extends CustomError{
    constructor(){
        super(404, "Password not found")
    }
}

export class RoleNotFound extends CustomError{
    constructor(){
        super(404, "Role not found")
    }
}

export class InvalidRole extends CustomError{
    constructor(){
        super(404, "Invalid role")
    }
}

export class UserNotFound extends CustomError{
    constructor(){
        super(404, "Invalid user")
    }
}

export class invalidPassword extends CustomError{
    constructor(){
        super(404, "invalidPassword")
    }
}

export class IdNotFound extends CustomError{
    constructor(){
        super(404, "ID Not Found")
    }
}

export class TokenNotFound extends CustomError{
    constructor(){
        super(404, "Token not Found")
    }
}

export class Unauthorized extends CustomError{
    constructor(){
        super(404, "User not Authorized")
    }
}