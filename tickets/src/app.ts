import express from 'express'
import 'express-async-errors'
import chalk from 'chalk'
import {json} from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler } from '@i60tickets/common'
import {NotFoundError, currentUser } from '@i60tickets/common'
import {createTicketRouter} from './routes/new'

const app = express()
app.set('trust proxy', true)
app.use(json())

app.use(cookieSession({ 
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}))
app.use(currentUser)
app.use(createTicketRouter)

app.all('*', async (req, res, next) => {
    next(new NotFoundError()) 
})
app.use(errorHandler)



export {app}
