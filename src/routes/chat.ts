import express, { Request, Response, NextFunction } from 'express'
import * as tf from '@tensorflow/tfjs-node'
import fs from 'fs-extra'


/**
 * Define paths
 *
 * @since 1.0.0
 */
const currentDir = process.cwd()
let modelDir = `${ currentDir }/model`
const modelDirs = fs.readdirSync(modelDir)
modelDir = `${ modelDir }/${ modelDirs[modelDirs.length - 1] }`
const dataFile = `${ modelDir }/data.json`
const wordIndexFile = `${ modelDir }/word_index.json`
const modelFile = `${ modelDir }/model.json`

/**
 * Load the model
 *
 * @since 1.0.0
 */
const model = tf.sequential(fs.readFileSync(modelFile, 'utf-8'))
const data = JSON.parse(fs.readFileSync(dataFile, 'utf-8'))
const wordIndex = JSON.parse(fs.readFileSync(wordIndexFile, 'utf-8'))

/**
 * Define predict function to predict the response according to the input
 *
 * @param { string } input Input text data to get prediction
 * @returns { string | undefined }
 *
 * @since 1.0.0
 */
function predict(input: string): string | undefined {
	const tokenizer = new tf.Tokenizer({ wordIndex })
	const sequences = tokenizer.textsToSequences([ input ])
	if (!sequences[0].length) {
		return undefined // Input is empty or contains only unknown words
	}

	const paddedSequences = tf.padSequences(sequences, { padding: 'post', maxLength: 20 })
	const predictions = model.predict(paddedSequences)
	const tag = predictions.argMax(1).dataSync()[0]

	for (const intent of data) {
		if (intent.tag === tag) {
			return intent.response[Math.floor(Math.random() * intent.response.length)]
		}
	}

	return undefined
}

/**
 * Define Express.js router
 *
 * @since 1.0.0
 */
const router = express.Router()

/**
 * Load the chat page
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
	const { message } = req.body

	res.json({
		status: 'success',
		app: 'Mama',
		version: '1.0.0',
		version_code: 1,
		parent_app: 'Ulkaa',
		response: predict(message),
	})
})


module.exports = router()
