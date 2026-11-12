export default async function handler(req, res) {
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const appId = process.env.CASHFREE_APP_ID || process.env.VITE_CASHFREE_APP_ID;
  const secretKey = process.env.CASHFREE_SECRET_KEY || process.env.CASHFREE_KEY_SECRET;
  const isSandbox = (process.env.CASHFREE_ENV || process.env.VITE_CASHFREE_ENV || 'production') === 'sandbox';

  if (!appId || !secretKey) {
    return res.status(500).json({ error: 'Cashfree credentials are not configured.' });
  }

  const { amount, description, customerPhone, customerEmail, customerName } = req.body;

  if (!amount || isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: 'Invalid amount provided.' });
  }

  const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const baseUrl = isSandbox ? 'https://sandbox.cashfree.com/pg/orders' : 'https://api.cashfree.com/pg/orders';

  try {
    const origin = req.headers.origin || req.headers.referer || 'https://ankitasharma.in';
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2023-08-01',
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: Number(amount),
        order_currency: 'INR',
        customer_details: {
          customer_id: `cust_${Date.now()}`,
          customer_phone: customerPhone || '9999999999',
          customer_email: customerEmail || 'customer@example.com',
          customer_name: customerName || 'Ankita Sharma Customer',
        },
        order_meta: {
          return_url: `${origin}/?order_id={order_id}`,
        },
        order_note: description || 'Private Session Booking',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Cashfree API error:', data);
      return res.status(response.status).json({ error: data.message || 'Failed to create Cashfree order', details: data });
    }

    return res.status(200).json({
      order_id: data.order_id,
      payment_session_id: data.payment_session_id,
      order_status: data.order_status,
    });
  } catch (error) {
    console.error('Error creating Cashfree order:', error);
    return res.status(500).json({ error: 'Failed to create Cashfree order', details: error.message });
  }
}
