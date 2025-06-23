import { supabase } from '../lib/supabase';

/**
 * Sign Up
 */
export const signUp = async (phone, password, { name, dob, job }) => {
  const fakeEmail = `${phone}@allpay.app`;

  const { data, error } = await supabase.auth.signUp({ email: fakeEmail, password });
  if (error || !data?.user) {
    return { data: null, error };
  }

  const userId = data.user.id;

  const { error: insertError } = await supabase
    .from('users')
    .insert([
      {
        id: userId,
        email: fakeEmail,
        password,
        name,
        phone,
        dob,
        job,
        user_type: 'client',
        balance: 0,
      },
    ]);

  if (insertError) {
    return { data: null, error: insertError };
  }

  return { data, error: null };
};

/**
 * Sign In
 */
export const signIn = async (phone, password) => {
  const fakeEmail = `${phone}@allpay.app`;

  const { data: signInData, error } = await supabase.auth.signInWithPassword({ email: fakeEmail, password });
  if (error || !signInData.session?.user) {
    return { data: null, error };
  }

  const userId = signInData.session.user.id;

  const { data: userProfile, error: profileError } = await supabase
    .from('users')
    .select('name, phone, dob, job, user_type, balance')
    .eq('id', userId)
    .single();

  if (profileError) {
    return { data: null, error: profileError };
  }

  const sessionInfo = {
    user: {
      id: userId,
      phone: userProfile.phone,
      name: userProfile.name,
      dob: userProfile.dob,
      job: userProfile.job,
      user_type: userProfile.user_type,
      balance: userProfile.balance,
    },
    session: signInData.session,
  };
  return { data: sessionInfo, error: null };
};

/**
 * Sign Out
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

/**
 * Get Session
 */
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
};

/**
 * Get User Profile
 */
export const getUserProfileAndBalance = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) return null;

  const userId = session.user.id;

  const { data, error: userError } = await supabase
    .from('users')
    .select('name, phone, dob, job, balance, user_type')
    .eq('id', userId)
    .single();

  if (userError) return null;

  return data;
};
