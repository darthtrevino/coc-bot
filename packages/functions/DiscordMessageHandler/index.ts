import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import nacl from 'tweetnacl'
import { handleDiscordCommand } from './handleDiscordCommand'

// Your public key can be found on your application in the Developer Portal
const PUBLIC_KEY = process.env.BOT_PUBLIC_KEY

const httpTrigger: AzureFunction = async function (
	context: Context,
	req: HttpRequest
): Promise<void> {
	try {
		if (!verifyDiscordAuth(req)) {
			context.res.status = 401
			context.res.body = 'invalid request signature'
			return
		}

		// Ack Setup
		if (req.body.type === 1) {
			context.res = {
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					type: 1,
				}),
			}
		} else {
			const result = handleDiscordCommand(req.body.data)
			context.res = {
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					type: 4,
					data: {
						content: result,
					},
				}),
			}
		}
	} catch (err) {
		console.log('Caught Error', err)
		throw err
	}
}

function verifyDiscordAuth(req: HttpRequest): boolean {
	const signature = req.headers['X-Signature-Ed25519'.toLowerCase()]
	const timestamp = req.headers['X-Signature-Timestamp'.toLowerCase()]
	const body = req.rawBody || ''
	if (!signature || !timestamp || !body) {
		return false
	}

	const result = nacl.sign.detached.verify(
		Buffer.from(timestamp + body),
		Buffer.from(signature, 'hex'),
		Buffer.from(PUBLIC_KEY, 'hex')
	)
	return result
}

export default httpTrigger
