import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipeBusiness";
import {RecipeInputDTO } from "../model/recipe";

const recipeBusiness = new RecipeBusiness()
export class RecipeController {
    public createRecipe = async (req: Request, res: Response) => {
        try {
            const input: RecipeInputDTO = {
                title: req.body.title,
                description: req.body.description,
                authorId: req.body.authorId
            }

            console.log(input)

            await recipeBusiness.createRecipe(input)

            res.status(201).send({message: "Recipe Created!"})
            
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }


    public friendsFeed = async(req: Request, res: Response) => {
        try {   
            const id = req.params.id as string

            const result = await recipeBusiness.friendsFeed(id)

            res.status(200).send(result)
            
        } catch (error:any) {
            res.status(error.statusCode || 400).send(error.message || error.sqlMessage)
        }
    }
}