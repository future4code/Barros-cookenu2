import { RecipeBaseDataBase } from "../data/RecipeBaseDataBase";
import { CustomError } from "../error/CustomError";
import { AuthorIdNotFound, DescriptionNotFound, IdNotFound, RecipeNotAuthor, RecipeNotFound, TitleNotFound } from "../error/recipErros";
import { TokenNotFound, Unauthorized } from "../error/userErrors";
import { EditRecipeInputDTO, recipe, RecipeInputDTO, EditRecipeInput, DeleteRecipeInputDTO } from "../model/recipe";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import {UserRole } from "../model/user"

const idGenerator = new IdGenerator()
const recipeBaseDataBase = new RecipeBaseDataBase()
const tokenGenerator = new TokenGenerator()

export class RecipeBusiness {
 public createRecipe = async (input: RecipeInputDTO) => {
    try {

        const {title, description, authorId} = input

                
        if(!title){
            throw new TitleNotFound()
        }

        if(!description){
          throw new DescriptionNotFound()  
        }

        if(!authorId){ 
            throw new AuthorIdNotFound()
        }

        const id = idGenerator.generateId()

        const recipe: recipe = {
            id,
            title,
            description,
            authorId
        }

        console.log(recipe);
        
        await recipeBaseDataBase.createRecipe(recipe)


    } catch (error:any) {
        throw new CustomError(400, error.message);
    }
 } 
 
 public friendsFeed =async (id:string) => {
    try {

    if(!id){
        throw new IdNotFound()
    }

    const result = await recipeBaseDataBase.friendsFeed(id)
    return result
        
    } catch (error:any) {
        throw new CustomError(400, error.message);
    }
 }

 public editRecipe = async (input:EditRecipeInputDTO) => {
    try {
        const {id, title,description,token} = input

        if(!id){
            throw new IdNotFound()
        }

        if(!token){
            throw new TokenNotFound()
        }

        
        const data = tokenGenerator.tokenData(token)

        if (!data.id) {
            throw new Unauthorized();
        }

        const getRecipeById = await recipeBaseDataBase.getRecipeById(id)

        if (!getRecipeById){
            throw new RecipeNotFound()            
        }

        if (data.role.toUpperCase() === UserRole.NORMAL && data.id !== getRecipeById.author_id){
            throw new RecipeNotAuthor()           
        }

        if (!title) {
            title === getRecipeById.title
        }

        if (!description) {
            description === getRecipeById.description
        }

        const editRecipe: EditRecipeInput = {
            id,
            title,
            description
        }

                      

        await recipeBaseDataBase.editRecipe(editRecipe)

                    
    } catch (error:any) {
        throw new CustomError(400, error.message);
    }
} 

public getRecipeById = async (id:string) => {
    try {
        const result = await recipeBaseDataBase.getRecipeById(id)
        return result           
    } catch (error:any) {
        throw new CustomError(400, error.message);
    }
} 

public deleteRecipe = async(input: DeleteRecipeInputDTO) => {
    try {
        const {id, token} = input
       
        if(!id){
            throw new IdNotFound()
        }

        if(!token){
            throw new TokenNotFound()
        }
        
        const data = tokenGenerator.tokenData(token)

        if (!data.id) {
            throw new Unauthorized();
        }

        const getRecipeById = await recipeBaseDataBase.getRecipeById(id)

        if (!getRecipeById){
            throw new RecipeNotFound()            
        }

        if(data.role.toUpperCase() ===  UserRole.NORMAL && getRecipeById.author_id !== data.id) {
            throw new RecipeNotAuthor()
        }

        await recipeBaseDataBase.deleteRecipe(id)

    } catch (error:any) {
        throw new CustomError(400, error.message); 
    }
}


}