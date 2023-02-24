import { RecipeBaseDataBase } from "../data/RecipeBaseDataBase";
import { CustomError } from "../error/CustomError";
import { AuthorIdNotFound, DescriptionNotFound, IdNotFound, RecipeNotAuthor, RecipeNotFound, TitleNotFound } from "../error/recipErros";
import { TokenNotFound, Unauthorized } from "../error/userErrors";
import { EditRecipeInputDTO, recipe, RecipeInputDTO, EditRecipeInput, DeleteRecipeInputDTO, RecipeOutputDTO, RecipeFeedDTO, RecipeInput} from "../model/recipe";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import {UserRole } from "../model/user"
import { FriendsFeedInput } from "../model/friendship";

const idGenerator = new IdGenerator()
const recipeBaseDataBase = new RecipeBaseDataBase()
const tokenGenerator = new TokenGenerator()

export class RecipeBusiness {
 
    public createRecipe = async (input: RecipeInputDTO):Promise<void> => {
    try {

        const {title, description, authorId, token} = input

                
        if(!title){
            throw new TitleNotFound()
        }

        if(!description){
          throw new DescriptionNotFound()  
        }

        if(!authorId){ 
            throw new AuthorIdNotFound()
        }

        if(!token){
            throw new TokenNotFound()
        }

        const data = tokenGenerator.tokenData(token)
                  
        
        if(!data.id){
            throw new Unauthorized()
        }

        const id = idGenerator.generateId()

        const recipe: recipe = {
            id,
            title,
            description,
            authorId
        }

        
        
        await recipeBaseDataBase.createRecipe(recipe)


    } catch (error:any) {
        throw new CustomError(400, error.message);
    }
 } 
 
 public friendsFeed =async (input:FriendsFeedInput):Promise<RecipeFeedDTO[]> => {
    try {

        const {id,token} = input

    if(!id){
        throw new IdNotFound()
    }

    if(!token){
        throw new TokenNotFound()
    }

    const data = tokenGenerator.tokenData(token)
              
    
    if(!data.id){
        throw new Unauthorized()
    }

    const result = await recipeBaseDataBase.friendsFeed(id)
    const resultOutput:RecipeFeedDTO[] = result.map((p) => {
        return {
            title: p.title,
            description: p.description,
            createdAt: p.created_at,
            name: p.name
        }
    })

    return resultOutput
        
    } catch (error:any) {
        throw new CustomError(400, error.message);
    }
 }

 public editRecipe = async (input:EditRecipeInputDTO): Promise<void> => {
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

        const getRecipeById = await recipeBaseDataBase.filterRecipeById(id)

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

public getRecipeById = async (input: RecipeInput): Promise<RecipeOutputDTO[]> => {
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

        const result = await recipeBaseDataBase.getRecipeById(id)
        const resultOutput:RecipeOutputDTO[] = result.map((p) => {
            return {
                id: p.id,
                title: p.title,
                description: p.description,
                createdAt: p.created_at,
                authorId: p.author_id
            }
        })

        return resultOutput               
                 
    } catch (error:any) {
        throw new CustomError(400, error.message);
    }
} 

public deleteRecipe = async(input: DeleteRecipeInputDTO):Promise<void> => {
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

        const getRecipeById = await recipeBaseDataBase.filterRecipeById(id)

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