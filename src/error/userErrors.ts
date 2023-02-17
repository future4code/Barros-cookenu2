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