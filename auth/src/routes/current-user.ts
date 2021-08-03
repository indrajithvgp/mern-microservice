import express from 'express'
import jwt from 'jsonwebtoken'
import {currentUser} from '@i60tickets/common'
import {requireAuth} from '@i60tickets/common'
 

const router = express.Router()

//(!req.session?.jwt)

router.get('/api/users/currentuser', currentUser, requireAuth, (req, res) => {
   res.send({currentUser: req.currentUser || null})
})

export {router as currentUserRouter} 