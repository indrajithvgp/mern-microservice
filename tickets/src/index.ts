import mongoose from 'mongoose'
import {app} from './app'
import chalk from 'chalk' 

const start = async () =>{ 
    if(!process.env.JWT_KEY){
        throw new Error('error with env vars: JWT_KEY')
    }
    if(!process.env.MONGO_URI){
        throw new Error('error with env vars: MONGO_URI')
    }
    try{
        await mongoose.connect(process.env.MONGO_URI,{
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