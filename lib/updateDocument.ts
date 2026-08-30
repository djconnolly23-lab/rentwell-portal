import { SupabaseClient } from '@supabase/supabase-js'

export async function updateDocument(
  supabase: SupabaseClient, 
  userId: string, 
  userRole: string, 
  recordId: string, 
  updates: Record<string, any>
) {
  if (userRole === 'renter') {
    const allowedKeys = ['sig_status', 'signed_at', 'ip_address']
    const isEditingRestrictedFields = Object.keys(updates).some(key => !allowedKeys.includes(key))
    
    if (isEditingRestrictedFields) {
      throw new Error('Access Denied: Renters cannot alter document contents or metadata.')
    }
  }

  if (updates.sig_status === 'signed') {
    updates.signed_at = new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('profile_documents')
    .update(updates)
    .eq('id', recordId)
    .eq('profile_id', userId) 
    .select()
    .single()

  if (error) throw new Error(`Update failed: ${error.message}`)

  return data
}