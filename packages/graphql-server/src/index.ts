import { config as configDotEnv } from 'dotenv'
import { Configuration } from './Configuration'
import { Service } from './Service'
import { readSchema } from './readSchema'

/* eslint-disable @typescript-eslint/no-var-requires */
async function bootstrap(): Promise<void> {
	try {
		configDotEnv()
		const nodeConfig = require('config')
		const config = new Configuration(nodeConfig)
		const schema = readSchema()
		await new Service(config, schema).start()
	} catch (err) {
		console.error('error launching CthulhuBot', err)
	}
}

bootstrap()
