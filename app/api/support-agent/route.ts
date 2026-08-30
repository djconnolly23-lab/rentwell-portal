import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, vertical = 'rentwell', category = 'general' } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Missing required field: message.' },
        { status: 400 }
      )
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    let automatedReply = ''
    let requiresEscalation = false

    const lowerMsg = message.toLowerCase()
    if (lowerMsg.includes('password') || lowerMsg.includes('login') || lowerMsg.includes('sign in')) {
      automatedReply = 'To reset your password or resolve login issues, please use the password reset link or verify your session tokens.'
    } else if (lowerMsg.includes('maintenance') || lowerMsg.includes('repair') || lowerMsg.includes('leak')) {
      automatedReply = 'Your maintenance inquiry has been logged and routed to the operational triage queue for a virtual assistant to review within the 15-minute SLA.'
    } else {
      automatedReply = 'Thank you for your request. Our support desk has logged your ticket for manual follow-up.'
      requiresEscalation = true
    }

    if (user) {
      await supabase.from('activity_logs').insert({
        actor: user.id,
        action: 'AI_SUPPORT_AGENT_QUERY',
        target_address: `Vertical: ${vertical} | Category: ${category}`,
      })
    }

    return NextResponse.json({
      success: true,
      vertical,
      response: automatedReply,
      requires_escalation: requiresEscalation,
      timestamp: new Date().toISOString(),
    }, { status: 200 })

  } catch (err: any) {
    console.error('Support Agent API error:', err)
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 })
  }
}