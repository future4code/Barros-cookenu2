import { RecipeBaseDataBase } from "../data/RecipeBaseDataBase";
import { CustomError } from "../error/CustomError";
import { AuthorIdNotFound, DescriptionNotFound, IdNotFound, TitleNotFound } from "../error/recipErros";
import { recipe, RecipeInputDTO } from "../model/recipe";
import { IdGenerator } from "../services/IdGenerator";

const idGenerator = new IdGenerator()
const recipeBaseDataBase = new RecipeBaseDataBase()

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



}