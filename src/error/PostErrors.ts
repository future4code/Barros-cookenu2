import { CustomError } from "./CustomError";

export class MissingData extends CustomError {
    constructor() {
        super(406, " 'photo', 'description', 'type' and 'authorId' must be informed.")
    }
}

export class WrongType extends CustomError {
    constructor() {
        super(422, " 'type' has to be either 'normal' or 'event'.")
    }
}

export class IdNotFound extends CustomError {
    constructor() {
        super(404, "Post not found.")
    }
}