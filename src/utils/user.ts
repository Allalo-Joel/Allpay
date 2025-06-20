import { supabase } from '../lib/supabase';

export const getUserProfileAndBalance = async () => {
  // Step 1: Get authenticated user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const userId = user.id;

  // Step 2: Get user's name from profile
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('name')
    .eq('id', userId)
    .single();

  if (profileError) return null;

  // Step 3: Get user's wallet transactions
  const { data: transactions, error: txError } = await supabase
    .from('wallet_transactions')
    .select('amount, type')
    .eq('user_id', userId);

  if (txError) return null;

  // Step 4: Calculate balance from transactions
  const balance = transactions?.reduce((total, tx) => {
    if (tx.type === 'deposit') return total + tx.amount;
    if (['withdraw', 'payment', 'transfer'].includes(tx.type)) return total - tx.amount;
    return total;
  }, 0) ?? 0;

  // Optional: fallback to stored balance if needed
  // const { data: stored, error: storedErr } = await supabase
  //   .from('users')
  //   .select('balance')
  //   .eq('id', userId)
  //   .single();

  return {
    name: profile?.name || 'User',
    balance: balance.toFixed(2), // true real-time balance
    // fallbackBalance: stored?.balance ?? null, // optional: show stored value
  };
};
