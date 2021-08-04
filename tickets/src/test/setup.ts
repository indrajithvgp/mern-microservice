import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose"
import {app} from '../app'


// declare global {
//     var signin: () => Promise<string[]>;
//   }

let mongo: any
beforeAll(async () => {
    
    process.env.JWT_KEY = "secret"
    mongo = new MongoMemoryServer()
    jest.setTimeout(10000); 
    const mongoUri = await mongo.getUri()

    await mongoose.connect(mongoUri, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({})
    }
})

afterAll(async ()=>{
    await mongo.stop()
    await mongoose.connection.close()
 
})