import { CustomError } from "./CustomError";

export class IdNotFound extends CustomError{
    constructor(){
        super(404, "ID Not Found")
    }
}

export class TitleNotFound extends CustomError{
    constructor(){
        super(404, "Title Not Found")
    }
}

export class DescriptionNotFound extends CustomError{
    constructor(){
        super(404, "Description Not Found")
    }
}

export class AuthorIdNotFound extends CustomError{
    constructor(){
        super(404, "Author ID Not Found")
    }
}

export class RecipeNotFound extends CustomError{
    constructor(){
        super(404, "Recipe Not Found")
    }
}

export class RecipeNotAuthor extends CustomError{
    constructor(){
        super(404, "You must be the author of this recipe to edit it.")
    }
}