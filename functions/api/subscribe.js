// Cloudflare Pages Function - handles Mailchimp subscriptions
export async function onRequestPost(context) {
  const MAILCHIMP_API_KEY = context.env.MAILCHIMP_API_KEY;
  
  if (!MAILCHIMP_API_KEY) {
    return new Response(JSON.stringify({ result: 'error', msg: 'Server configuration error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
  const MAILCHIMP_LIST_ID = '2b21aacbb6';
  const MAILCHIMP_DC = 'us9';

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const data = await context.request.json();
    const { email, source, interest, current } = data;

    if (!email) {
      return new Response(JSON.stringify({ result: 'error', msg: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Base64 encode for Basic auth
    const authString = 'anystring:' + MAILCHIMP_API_KEY;
    const base64Auth = btoa(authString);

    // Add to Mailchimp
    const response = await fetch(
      `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${base64Auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            SOURCE: source || 'general',
            INTEREST: interest || 'not_answered',
            CURRENT: current || 'not_answered',
          },
        }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      return new Response(JSON.stringify({ result: 'success', msg: 'Thanks for subscribing!' }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } else if (result.title === 'Member Exists') {
      return new Response(JSON.stringify({ result: 'success', msg: 'You are already subscribed!' }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } else {
      return new Response(JSON.stringify({ result: 'error', msg: result.detail || 'Subscription failed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ result: 'error', msg: 'Server error: ' + err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
