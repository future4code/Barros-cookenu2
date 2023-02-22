export type recipe = {
    id: string,
    title: string,
    description: string,
    authorId: string,
}

export interface RecipeInputDTO {
    title: string,
    description: string,
    authorId: string,
}

export interface EditRecipeInput{
    id: string,
    title: string,
    description: string
}

export interface EditRecipeInputDTO{
    id: string,
    title: string,
    description: string,
    token: string
}

export interface DeleteRecipeInputDTO{
    id: string,
    token: string
}