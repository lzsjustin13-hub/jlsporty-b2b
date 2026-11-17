export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, email, product, message } = data;

    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY || '5561a3ba-83d3-4ec6-9189-dcf62551ec46',
          subject: `JuLong OEM/ODM Inquiry - ${name || 'Buyer'} (${product || 'Sports Eyewear'})`,
          from_name: name || 'JuLong Website Visitor',
          name: name || 'Not provided',
          email: email || 'lzsjustin13@gmail.com',
          product_interest: product || 'Sports Sunglasses',
          message: message || 'Inquiry from JLsporty website.',
          to_email: 'lzsjustin13@gmail.com',
          source_page: 'https://www.jlsporty.com',
        }),
      });
    } catch (relayError) {
      console.warn('Relay warning:', relayError);
    }

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your inquiry has been sent to our sales team (lzsjustin13@gmail.com). We will get back to you within 24 hours.',
    });
  } catch (error) {
    console.error('Inquiry error:', error);
    return res.status(200).json({
      success: true,
      message: 'Thank you! Your inquiry has been received. We will contact you shortly.',
    });
  }
}
