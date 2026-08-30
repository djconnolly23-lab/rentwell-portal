import { SupabaseClient } from '@supabase/supabase-js'

export async function getDocumentVersions(supabase: SupabaseClient, libraryDocId: string) {
  const { data, error } = await supabase
    .from('document_library')
    .select('version, file_url, created_at, is_active')
    .eq('id', libraryDocId)
    .order('version', { ascending: false })

  if (error) throw new Error(`Version history fetch failed: ${error.message}`)

  return data
}