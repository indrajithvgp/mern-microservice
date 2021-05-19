import express from 'express'
import chalk from 'chalk'
import {json} from 'body-parser'

const app = express()
app.use(json())

app.listen(3000, ()=> console.log(chalk.green('Running on port 3000')))