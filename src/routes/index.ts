import express, { NextFunction, Request, Response, Router } from 'express'


/**
 * Define Express.js router
 *
 * @since 1.0.0
 */
const router: Router = express.Router()


/**
 * Load the homepage
 *
 * @param { Request } Request
 * @param { Response } Response
 * @param { NextFunction } Next Function
 *
 * @returns { void }
 *
 * @since 1.0.0
 */
router.get('/', function (req: Request, res: Response, next: NextFunction): void {
	res.json(
		{
			'status': 'success',
			'app': 'Mama',
			'version': '1.0.0',
			'version_code': 1,
			'parent_app': 'Ulkaa',
			'response': 'Ulkaa server is up and running.',
		}
	)
})


export default router
