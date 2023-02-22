import express from "express";
import { RecipeController } from "../controller/RecipeController";


const recipeController = new RecipeController()

export const recipeRouter = express.Router();



recipeRouter.post('/recipe', recipeController.createRecipe)
recipeRouter.get('/feed/:id', recipeController.friendsFeed)
recipeRouter.get('/getrecipe/:id', recipeController.getRecipeById)
recipeRouter.put('/edit/:id', recipeController.editRecipe)
recipeRouter.delete('/delete/:id', recipeController.deleteRecipe)