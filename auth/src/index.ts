import express from 'express'
import 'express-async-errors'
import chalk from 'chalk'
import {json} from 'body-parser'
import mongoose from 'mongoose'
import { currentUserRouter } from './routes/current-user'
import { signInRouter } from './routes/signin'
import { signOutRouter } from './routes/signout'
import { signUpRouter } from './routes/signup' 
import { errorHandler } from './middlewares/error-handler'
import {NotFoundError} from './errors/not-found-error'

const app = express()
app.use(json())

app.use(currentUserRouter)
app.use(signInRouter)
app.use(signOutRouter)
app.use(signUpRouter)
app.use(errorHandler)

app.all('*', async (req, res, next) => {
    next(new NotFoundError()) 
})
app.use(errorHandler)

const start = async () =>{
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log('DATABASE CONNECTED -- MONGODB')

    }catch(err){
        console.log(err)
    }
    
}

app.listen(3000, ()=> console.log(chalk.bgBlue('Running on port 3000')))

start()