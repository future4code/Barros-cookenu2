import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import { FriendsFeedInput } from "../model/friendship";
import {DeleteRecipeInputDTO, EditRecipeInputDTO, RecipeInput, RecipeInputDTO } from "../model/recipe";


const recipeBusiness = new RecipeBusiness()
export class RecipeController {
    
    public createRecipe = async (req: Request, res: Response):Promise<void> => {
        try {
            const input: RecipeInputDTO = {
                title: req.body.title,
                description: req.body.description,
                authorId: req.body.authorId,
                token: req.headers.authorization as string
            }
            

            await recipeBusiness.createRecipe(input)

            res.status(201).send({message: "Recipe Created!"})
            
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    public friendsFeed = async(req: Request, res: Response): Promise<void> => {
        try {   
            const input: FriendsFeedInput = {
                id: req.params.id as string,
                token: req.headers.authorization as string
            }

            const result = await recipeBusiness.friendsFeed(input)

            res.status(200).send(result)
            
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }

    public getRecipeById = async (req: Request, res: Response):Promise<void> => {
        try {
            const input: RecipeInput = {
                id: req.params.id as string,
                token: req.headers.authorization as string
            }
            
            const result = await recipeBusiness.getRecipeById(input)                     
            res.status(200).send(result)        
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    } 

    public editRecipe = async (req: Request, res: Response):Promise<void> => {
        try {
            
            const input:EditRecipeInputDTO = {
                id: req.params.id,
                title: req.body.title,
                description: req.body.description,
                token: req.headers.authorization as string                
            }         

            await recipeBusiness.editRecipe(input)

            res.status(200).send({message: "edited recipe!"})        
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
    
    public deleteRecipe = async (req: Request, res: Response):Promise<void> => {
        try {            
            const input:DeleteRecipeInputDTO = {
                id: req.params.id,
                token: req.headers.authorization as string                
            }         

            await recipeBusiness.deleteRecipe(input)

            res.status(200).send({message: "Deleted recipe!"})        
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    } 
  


}