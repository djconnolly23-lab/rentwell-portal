import { SupabaseClient } from '@supabase/supabase-js'

export async function getDocuments(supabase: SupabaseClient, userId: string, userRole: string) {
  // Query your actual 'documents' master table matching your user role tier
  const { data: libraryDocs, error: libError } = await supabase
    .from('documents')
    .select('*')
    .contains('target_tier', [userRole])
    .eq('is_active', true)
  
  if (libError) throw new Error(`Library fetch error: ${libError.message}`)

  // Query user-specific document overrides or profile document records
  const { data: profileDocs, error: profError } = await supabase
    .from('document_versions')
    .select('*, documents(*)')
    .eq('document_id', userId)

  if (profError) throw new Error(`Profile docs error: ${profError.message}`)

  return {
    libraryTemplates: libraryDocs || [],
    profileDocuments: profileDocs || [],
  }
}