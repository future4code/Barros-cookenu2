import app from "./app"
import { friendShipRouter } from "./controller/routes/friendShipRouter"
import { postRouter } from "./controller/routes/postRouter"
import { userRouter } from "./controller/routes/userRouter"



app.use('/users',userRouter)

app.use('/post', postRouter)

app.use('/friendship', friendShipRouter)

