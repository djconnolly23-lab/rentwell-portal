try {
  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    Deno.env.get("STRIPE_WEBHOOK_SECRET")!
  );

  // ✅ Insert success log into webhook_logs
  await fetch(`${Deno.env.get("SUPABASE_URL")}/rest/v1/webhook_logs`, {
    method: "POST",
    headers: {
      "apikey": Deno.env.get("SUPABASE_KEY")!,
      "Authorization": `Bearer ${Deno.env.get("SUPABASE_KEY")!}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event_type: event.type,
      payload: event.data.object,
      status: "processed"
    })
  });

  // … your existing payments insert logic here …

} catch (err) {
  // ❌ Insert error log into webhook_logs
  await fetch(`${Deno.env.get("SUPABASE_URL")}/rest/v1/webhook_logs`, {
    method: "POST",
    headers: {
      "apikey": Deno.env.get("SUPABASE_KEY")!,
      "Authorization": `Bearer ${Deno.env.get("SUPABASE_KEY")!}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      event_type: "error",
      payload: { message: err.message },
      status: "failed"
    })
  });

  return new Response(`Webhook Error: ${err.message}`, { status: 400 });
}
