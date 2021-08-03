import express, {NextFunction, Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import {body, validationResult} from 'express-validator'
import { DatabaseConnectionError } from '@i60tickets/common'
import {validateRequest} from '@i60tickets/common'
import {User} from '../models/user'
import { RequestValidationError } from '@i60tickets/common'
import { BadRequestError } from '@i60tickets/common'

const router = express.Router()

router.post('/api/users/signup', [
    body('email') 
        .isEmail()
        .withMessage('Email must be valid'), 
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be within 4-20 characters')
    ], validateRequest ,
    
    async(req: Request, res: Response, next: NextFunction) => {
    
    const {email, password} = req.body
    
    const existingUser = await User.findOne({email})

    if(existingUser){
        return next(new BadRequestError('Email is already in Use'))
    }
    const user = User.build({email, password})
    await user.save()

    

    const userJwt = jwt.sign({
        id: user.id,
        email: user.email
 
    }, process.env.JWT_KEY!)

    req.session = {
        jwt: userJwt
    } 
    
    return res.status(201).send(user)

    // return next(new DatabaseConnectionError())
    // throw new DatabaseConnectionError()

})

export {router as signUpRouter} 

// kubectl create secret generic jwt-secret --from-literal=JWT_KEY=asdf