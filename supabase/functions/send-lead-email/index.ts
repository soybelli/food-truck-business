import { serve } from 'https://deno.fresh.run/std@0.177.0/http/server.ts';
import { Resend } from 'https://esm.sh/resend@0.16.0';

const resend = new Resend(Deno.env.get('RESEND_API_KEY'));

serve(async (req) => {
  try {
    const { to, subject, html } = await req.json();

    const data = await resend.emails.send({
      from: 'VesselsOps <notifications@vesselsops.com>',
      to,
      subject,
      html
    });

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});