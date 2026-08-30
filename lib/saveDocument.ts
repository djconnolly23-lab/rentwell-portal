import { SupabaseClient } from '@supabase/supabase-js'

export async function saveDocument(
  supabase: SupabaseClient, 
  userId: string, 
  userRole: string, 
  payload: { custom_title: string; file_url: string; document_id?: string }
) {
  if (userRole === 'renter') {
    throw new Error('Access Denied: Renters are restricted to viewing and signing documents only.')
  }

  const { data, error } = await supabase
    .from('profile_documents')
    .insert([{
      profile_id: userId,
      document_id: payload.document_id || null,
      custom_title: payload.custom_title,
      file_url: payload.file_url,
      crud_permissions: { create: true, read: true, update: true, delete: true },
      sig_status: 'pending'
    }])
    .select()
    .single()

  if (error) throw new Error(`Save failed: ${error.message}`)

  return data
}