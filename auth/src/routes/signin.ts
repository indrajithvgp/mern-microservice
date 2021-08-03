import express, {NextFunction, Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import {validateRequest} from '@i60tickets/common'
import {User} from '../models/user'
import jwt from 'jsonwebtoken'
import { RequestValidationError } from '@i60tickets/common'
import { BadRequestError } from '@i60tickets/common'
import { Password } from '../services/password'

const router = express.Router()

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Yo must supply a password')
],validateRequest, async(req: Request, res: Response, next: NextFunction) => {
    
    const {email, password} = req.body
    
    const existingUser = await User.findOne({email})

    if(!existingUser){
        return next(new BadRequestError('Invalid Credentials'))
    }
    const passwordMatch = await Password.compare(existingUser.password, password)

    if(!passwordMatch){ 
        return next(new BadRequestError('Invalid Credentials'))
    }

    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email

    }, process.env.JWT_KEY!)

    req.session = {
        jwt: userJwt
    } 

    res.status(200).send(existingUser)
    
})

export {router as signInRouter} 