import { Configuration } from './Configurationn'
import { GraphQLService } from './GraphQLService'
import { readSchema } from './readSchema'

/* eslint-disable @typescript-eslint/no-var-requires */
async function bootstrap(): Promise<void> {
	try {
		const { config: configDotEnv } = require('dotenv')
		configDotEnv({ debug: true })
		const nodeConfig = require('config')
		const configuration = new Configuration(nodeConfig)

		startServices(configuration)
	} catch (err) {
		console.error('error launching CthulhuBot', err)
	}
}

async function startServices(config: Configuration): Promise<void> {
	const schema = readSchema()
	await new GraphQLService(config, schema).start()
}

bootstrap()
