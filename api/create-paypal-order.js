function formatAmount(value) {
  return Number(value).toFixed(2)
}

function validItems(items) {
  if (!Array.isArray(items) || items.length === 0) return []
  return items
    .map((item) => ({
      name: String(item?.name || ''),
      quantity: Number(item?.quantity || 0),
      price: Number(item?.price || 0)
    }))
    .filter((item) => item.name && item.quantity > 0 && item.price > 0)
}

async function getPaypalAccessToken(baseUrl, clientId, secret) {
  const tokenRes = await fetch(`${baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${secret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  })

  const tokenData = await tokenRes.json()
  if (!tokenRes.ok || !tokenData.access_token) {
    throw new Error(tokenData.error_description || 'PayPal Auth fehlgeschlagen.')
  }
  return tokenData.access_token
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const mode = process.env.PAYPAL_MODE === 'live' ? 'live' : 'sandbox'
  const baseUrl = mode === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com'
  const clientId = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !secret) {
    return res.status(500).json({ error: 'PayPal Zugangsdaten fehlen.' })
  }

  const items = validItems(req.body?.items)
  if (items.length === 0) {
    return res.status(400).json({ error: 'Warenkorb ist leer.' })
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const origin = req.headers.origin || process.env.PUBLIC_BASE_URL || 'http://localhost:5173'

  try {
    const accessToken = await getPaypalAccessToken(baseUrl, clientId, secret)

    const orderRes = await fetch(`${baseUrl}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'EUR',
              value: formatAmount(total),
              breakdown: {
                item_total: {
                  currency_code: 'EUR',
                  value: formatAmount(total)
                }
              }
            },
            items: items.map((item) => ({
              name: item.name,
              quantity: String(item.quantity),
              unit_amount: {
                currency_code: 'EUR',
                value: formatAmount(item.price)
              }
            }))
          }
        ],
        application_context: {
          brand_name: 'Lüne Bräu',
          user_action: 'PAY_NOW',
          return_url: `${origin}/checkout?paid=success&provider=paypal`,
          cancel_url: `${origin}/checkout?paid=cancelled&provider=paypal`
        }
      })
    })

    const orderData = await orderRes.json()
    if (!orderRes.ok) {
      return res.status(500).json({ error: orderData?.message || 'PayPal Order fehlgeschlagen.' })
    }

    const approvalUrl = orderData?.links?.find((link) => link.rel === 'approve')?.href
    if (!approvalUrl) {
      return res.status(500).json({ error: 'PayPal Approval-Link fehlt.' })
    }

    return res.status(200).json({ approvalUrl })
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'PayPal Checkout fehlgeschlagen.' })
  }
}
