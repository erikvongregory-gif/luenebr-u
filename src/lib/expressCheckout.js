const PROVIDER_LABELS = {
  apple: 'Apple Pay',
  google: 'Google Pay',
  paypal: 'PayPal'
}

function normalizeItems(items) {
  return items.map((item) => ({
    id: String(item.id),
    name: String(item.name),
    quantity: Number(item.quantity) || 0,
    price: Number(item.price) || 0
  }))
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })

  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || 'Checkout konnte nicht gestartet werden.')
  }
  return data
}

export async function startExpressCheckout(provider, items) {
  if (!provider || !PROVIDER_LABELS[provider]) {
    throw new Error('Unbekannter Zahlungsanbieter.')
  }

  const payload = { items: normalizeItems(items), provider }
  if (provider === 'paypal') {
    const data = await postJson('/api/create-paypal-order', payload)
    if (!data.approvalUrl) throw new Error('PayPal-Weiterleitung fehlt.')
    window.location.assign(data.approvalUrl)
    return
  }

  const data = await postJson('/api/create-checkout-session', payload)
  if (!data.url) throw new Error('Stripe-Checkout-Link fehlt.')
  window.location.assign(data.url)
}
