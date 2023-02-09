import { CustomError } from "./CustomError";

export class FriendsIdError extends CustomError {
    constructor() {
        super(406, "Users IDs not reported.")
    }
}

export class DuplicatedId extends CustomError {
    constructor() {
        super(404, "You can't add yourself.")
    }
}

export class ExistingFriendship extends CustomError {
    constructor() {
        super(404, "You have already added this user.")
    }
}

export class NoExistingFriendship extends CustomError {
    constructor() {
        super(404, "The users selected are not friends.")
    }
}
