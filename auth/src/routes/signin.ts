import express, {NextFunction, Request, Response} from 'express'
import {body, validationResult} from 'express-validator'
import {validateRequest} from '../middlewares/validate-request'
import {User} from '../models/user'
import jwt from 'jsonwebtoken'
import { RequestValidationError } from '../errors/request-validation-error'
import { BadRequestError } from '../errors/bad-request-error'
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