import Stripe from 'stripe'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sessionId = req.query?.session_id
  if (!sessionId) {
    return res.status(400).json({ error: 'session_id fehlt.' })
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY fehlt.' })
  }

  try {
    const stripe = new Stripe(secretKey)
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const isPaid = session.payment_status === 'paid'
    return res.status(200).json({ paid: isPaid })
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Stripe-Verifizierung fehlgeschlagen.' })
  }
}
