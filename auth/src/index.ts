import mongoose from 'mongoose'
import {app} from './app'
import chalk from 'chalk'

const start = async () =>{ 
    if(!process.env.JWT_KEY){
        throw new Error('error with env vars: JWT_KEY')
    }
    try{
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useNewUrlParser: true
        }) 
        console.log('DATABASE CONNECTED -- MONGODB')

    }catch(err){
        console.log(err.message)
    }
    
}

app.listen(3000, ()=> console.log(chalk.bgBlue('Running on port 3000')))

start()