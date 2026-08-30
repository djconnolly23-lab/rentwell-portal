import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, vertical, payload } = body

    if (!action || !vertical || !payload) {
      return NextResponse.json(
        { error: 'Missing required parameters: action, vertical, or payload.' },
        { status: 400 }
      )
    }

    // Initialize Supabase Server Client to handle authorized data logging / storage actions
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role for backend AI agent pipeline orchestration
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll() {},
        },
      }
    )

    let result: any = {}

    switch (action) {
      case 'parse_document':
        // Handle document OCR / parsing simulation or integration (e.g., Leases, Rate Confirmations, BOLs)
        result = {
          status: 'success',
          vertical,
          extracted_data: {
            document_type: vertical === 'rentwell' ? 'Lease Agreement' : 'Rate Confirmation',
            parsed_entities: payload.raw_text ? payload.raw_text.substring(0, 100) + '...' : 'No raw text provided',
            confidence_score: 0.98,
          },
          timestamp: new Date().toISOString(),
        }
        break

      case 'triage_inquiry':
        // Handle automated draft response generation for tenant/carrier inquiries within SLA
        result = {
          status: 'success',
          vertical,
          draft_response: vertical === 'rentwell' 
            ? 'Hello, your maintenance request has been logged and assigned to an active vendor.' 
            : 'Check-call update logged successfully. Safe travels on your current lane.',
          sla_target_met: true,
          timestamp: new Date().toISOString(),
        }
        break

      case 'multilingual_translate':
        // Handle background translation for global VA communication layers
        result = {
          status: 'success',
          vertical,
          translated_text: `[Translated to ${payload.target_language || 'en'}]: ${payload.text || ''}`,
          timestamp: new Date().toISOString(),
        }
        break

      default:
        return NextResponse.json({ error: `Unsupported AI agent action: ${action}` }, { status: 400 })
    }

    // Log operational execution into activity logs for audit tracking
    await supabase.from('activity_logs').insert({
      actor: 'FTP Unified AI Engine',
      action: `AI_AGENT_${action.toUpperCase()}`,
      target_address: `Vertical: ${vertical}`,
    })

    return NextResponse.json(result, { status: 200 })
  } catch (err: any) {
    console.error('AI Agent execution error:', err.message)
    return NextResponse.json({ error: 'Internal Server Error during AI execution.' }, { status: 500 })
  }
}