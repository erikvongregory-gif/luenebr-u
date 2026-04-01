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

  const orderId = req.body?.orderId
  if (!orderId) {
    return res.status(400).json({ error: 'orderId fehlt.' })
  }

  const mode = process.env.PAYPAL_MODE === 'live' ? 'live' : 'sandbox'
  const baseUrl = mode === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com'
  const clientId = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET

  if (!clientId || !secret) {
    return res.status(500).json({ error: 'PayPal Zugangsdaten fehlen.' })
  }

  try {
    const accessToken = await getPaypalAccessToken(baseUrl, clientId, secret)
    const captureRes = await fetch(`${baseUrl}/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    const captureData = await captureRes.json()
    if (!captureRes.ok) {
      return res.status(500).json({ error: captureData?.message || 'PayPal Capture fehlgeschlagen.' })
    }

    return res.status(200).json({ status: captureData?.status || 'UNKNOWN' })
  } catch (error) {
    return res.status(500).json({ error: error?.message || 'PayPal Capture fehlgeschlagen.' })
  }
}
