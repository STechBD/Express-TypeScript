import express, { Express, NextFunction, Request, Response } from 'express'
import path from 'path'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import indexRouter from 'routes/index'
import userRouter from 'routes/users'


/**
 * Create Eserver.js server with navigation
 *
 * @since 1.0.0
 */
const app: Express = express()
const port: string | number = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', userRouter)

app.use(function (req: Request, res: Response, next: NextFunction): void {
	next(createError(404))
})

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	res.status((err.status || 500))
	res.render('error')
})

/**
 * Run the server
 *
 * @since 1.0.0
 */
app.listen(port, (): void => {
	console.log('Server is up on port ' + port)
})

export default app
