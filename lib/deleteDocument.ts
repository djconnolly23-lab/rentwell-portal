import { SupabaseClient } from '@supabase/supabase-js'

export async function deleteDocument(
  supabase: SupabaseClient, 
  userId: string, 
  userRole: string, 
  recordId: string
) {
  if (userRole === 'renter') {
    throw new Error('Access Denied: Renters cannot delete documents.')
  }

  const { error } = await supabase
    .from('profile_documents')
    .delete()
    .eq('id', recordId)
    .eq('profile_id', userId)

  if (error) throw new Error(`Delete failed: ${error.message}`)

  return true
}