import { supabase } from '../supabaseClient';

export async function checkDevice(userId, currentDeviceId) {
  const { data, error } = await supabase
    .from('users')
    .select('device_id')
    .eq('id', userId)
    .single();

  if (error) return { error };
  if (data.device_id && data.device_id !== currentDeviceId) {
    return { error: 'This account is already registered on another device.' };
  }

  await supabase
    .from('users')
    .update({ device_id: currentDeviceId })
    .eq('id', userId);

  return { success: true };
}