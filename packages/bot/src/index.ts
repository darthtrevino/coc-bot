import 'cross-fetch/polyfill'
import { Server } from 'http'
import { config as configDotEnv } from 'dotenv'
import { Bot } from './Bot'
import { Configuration } from './Configuration'
import { DataStore } from './DataStore'
import express from 'express'

/* eslint-disable @typescript-eslint/no-var-requires */
async function bootstrap(): Promise<void> {
	try {
		configDotEnv()
		const nodeConfig = require('config')
		const configuration = new Configuration(nodeConfig)
		startBot(configuration)
	} catch (err) {
		console.error('error launching CthulhuBot', err)
	}
}

function createHealthService(bot: Bot, config: Configuration): Promise<Server> {
	return new Promise((resolve) => {
		const app = express()
		app.get('/', (req, res) => {
			res.status(200).send({
				uptime: bot.uptime,
			})
		})
		const port = config.botServicePort
		resolve(
			app.listen(port, () => {
				console.log(`🩺 health service listening on port ${port}`)
			})
		)
	})
}

async function startBot(config: Configuration): Promise<void> {
	const dataStore = new DataStore(config)
	const bot = new Bot(dataStore)
	const identityToken = config.discordIdentityToken
	if (identityToken == null) {
		throw new Error('Discord identity token is not defined')
	} else {
		console.log(`connecting with token ${identityToken}`)
	}
	await bot.connect(identityToken)
	await createHealthService(bot, config)
}

bootstrap()
