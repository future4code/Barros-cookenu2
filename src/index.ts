import app from "./app"
import { friendShipRouter } from "./router/friendShipRouter"
import { recipeRouter } from "./router/recipeRouter"
import { userRouter } from "./router/userRouter"

app.use('/user', userRouter)

app.use('/recipe', recipeRouter)

app.use('/friendship', friendShipRouter)