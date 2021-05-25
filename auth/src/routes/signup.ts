import express, {NextFunction, Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import { DatabaseConnectionError } from '../errors/database-connection-error'
import {User} from '../models/user'
import { RequestValidationError } from '../errors/request-validation-error'
import { BadRequestError } from '../errors/bad-request-error'

const router = express.Router()

router.post('/api/users/signup', [
    body('email') 
        .isEmail()
        .withMessage('Email must be password'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be within 4-20 characters')
    ] ,async(req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
            return next(new RequestValidationError(errors.array()))
    }
    const {email, password} = req.body
    
    const existingUser = User.findOne({email})
    console.log(existingUser)
    if(existingUser){
        return next(new BadRequestError('Email is already in Use'))
    }
    const user = User.build({email, password})
    await user.save()
    
    res.status(201).send(user)

    // return next(new DatabaseConnectionError())
    // throw new DatabaseConnectionError()

})

export {router as signUpRouter} 