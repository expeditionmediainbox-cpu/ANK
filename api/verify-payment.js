const defaultAppId = '1341305b9c77af6f8ea46cd0dc75031431';
const defaultSecretKey = Buffer.from('Y2Zza19tYV9wcm9kXzEwODI3ZGFlMDBhZTcxZWRhZjc5NzJlMjM4MmNlMGZhX2NkZmRmZmNh', 'base64').toString('utf-8');

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const orderId = req.method === 'GET' ? req.query?.order_id : req.body?.order_id;

  if (!orderId) {
    return res.status(400).json({ error: 'Missing order_id' });
  }

  const appId = process.env.CASHFREE_APP_ID || process.env.VITE_CASHFREE_APP_ID || defaultAppId;
  const secretKey = process.env.CASHFREE_SECRET_KEY || process.env.CASHFREE_KEY_SECRET || defaultSecretKey;
  const isSandbox = (process.env.CASHFREE_ENV || process.env.VITE_CASHFREE_ENV) === 'sandbox';

  const baseUrl = isSandbox
    ? `https://sandbox.cashfree.com/pg/orders/${orderId}`
    : `https://api.cashfree.com/pg/orders/${orderId}`;

  try {
    const response = await fetch(baseUrl, {
      method: 'GET',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2023-08-01',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || 'Verification failed', details: data });
    }

    if (data.order_status === 'PAID') {
      return res.status(200).json({ success: true, status: 'PAID', message: 'Payment verified successfully' });
    } else {
      return res.status(200).json({ success: false, status: data.order_status, message: `Payment status is ${data.order_status}` });
    }
  } catch (error) {
    console.error('Error verifying Cashfree payment:', error);
    return res.status(500).json({ error: 'Verification failed', details: error.message });
  }
}
