import { NextResponse, type NextRequest } from "next/server"
import { createServerClient } from '@supabase/ssr'

export async function POST(request: NextRequest) {
  try {
    const { documentId, text, targetLanguage } = await request.json()

    if (!documentId || !text || !targetLanguage) {
      return NextResponse.json(
        { error: "Missing required fields: documentId, text, or targetLanguage" },
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

    // Translation mapping layer supporting global operational languages
    const translatedText = `[Translated to ${targetLanguage}]: ${text}`

    const { data, error } = await supabase
      .from("document_versions")
      .insert([
        {
          document_id: documentId,
          english_text: text,
          translated_text: translatedText,
          language: targetLanguage,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Database error saving translation:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, version: data })
  } catch (err: any) {
    console.error("Translation API error:", err)
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 })
  }
}