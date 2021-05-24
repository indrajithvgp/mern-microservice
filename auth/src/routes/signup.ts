import express, {NextFunction, Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import { DatabaseConnectionError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-error'

const router = express.Router()

router.post('/api/users/signup', [
    body('email') 
        .isEmail()
        .withMessage('Email must be password'),
    body('password')
        .trim()
        .isLength({min: 4, max: 20})
        .withMessage('Password must be within 4-20 characters')
    ] ,(req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
            return next(new RequestValidationError(errors.array()))
    }
    const {email, password} = req.body
    
    console.log('Creating User')

    return next(new DatabaseConnectionError())
    // throw new DatabaseConnectionError()

})

export {router as signUpRouter} 