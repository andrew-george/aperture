import { PaymentIntent } from '@stripe/stripe-js'
import { NextApiRequest, NextApiResponse } from 'next'
import { calculateTotalPrice } from '../../utils'

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { items } = await JSON.parse(req.body)

	const paymentIntent: PaymentIntent = await stripe.paymentIntents.create({
		amount: calculateTotalPrice(items) * 100,
		currency: 'usd',
		payment_method_types: ['card'],
		// automatic_payment_methods: {
		// enabled: true,
		// },
	})

	res.send({
		clientSecret: paymentIntent.client_secret,
	})
}
