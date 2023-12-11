import express, { Express, NextFunction, Request, Response } from 'express'
import path from 'path'
import createError from 'http-errors'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import indexRouter from './route/index'
import userRouter from './route/user'


/**
 * Create Express.js server with navigation
 *
 * @since 1.0.0
 */
const app: Express = express()
const port: string | number = process.env.PORT || 3000

app.set('views', path.join(__dirname, 'view'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/user', userRouter)

app.use(function (req: Request, res: Response, next: NextFunction): void {
	next(createError(404))
})

app.use(function (err: any, req: Request, res: Response, next: NextFunction): void {
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	res.status((err.status || 500))
	res.render(
		'error',
		{
			title: '500 Internal Server Error',
			message: err.message,
		},
	)
})

/**
 * Run the server
 *
 * @since 1.0.0
 */
app.listen(port, (): void => {
	console.log('Server is up on http://localhost:' + port)
})

export default app
