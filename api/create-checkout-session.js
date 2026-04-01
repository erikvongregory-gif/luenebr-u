import Stripe from 'stripe'

function toCents(value) {
  return Math.round(Number(value) * 100)
}

function validItems(items) {
  if (!Array.isArray(items) || items.length === 0) return []
  return items
    .map((item) => ({
      name: String(item?.name || ''),
      quantity: Number(item?.quantity || 0),
      cents: toCents(item?.price || 0)
    }))
    .filter((item) => item.name && item.quantity > 0 && item.cents > 0)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    return res.status(500).json({ error: 'STRIPE_SECRET_KEY fehlt.' })
  }

  const stripe = new Stripe(secretKey)
  const items = validItems(req.body?.items)
  if (items.length === 0) {
    return res.status(400).json({ error: 'Warenkorb ist leer.' })
  }

  const origin = req.headers.origin || process.env.PUBLIC_BASE_URL || 'http://localhost:5173'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: 'eur',
          product_data: { name: item.name },
          unit_amount: item.cents
        }
      })),
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['DE']
      },
      success_url: `${origin}/checkout?paid=success&provider=stripe&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?paid=cancelled`
    })

    return res.status(200).json({ url: session.url })
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'Stripe Checkout fehlgeschlagen.' })
  }
}
