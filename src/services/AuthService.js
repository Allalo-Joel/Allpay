import { supabase } from '../lib/supabase';

// Sign up and insert into 'users' table
export const signUp = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error || !data.user) return { data: null, error };

  const userId = data.user.id;

  const { error: insertError } = await supabase
    .from('users')
    .insert([{ id: userId, email, password,name, user_type: 'client'}]);

  if (insertError) return { data: null, error: insertError };

  return { data, error: null };
};

// Sign in with email and password, and fetch user name from 'users' table
export const signIn = async (email: string, password: string) => {
  const { data: signInData, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !signInData.session?.user) return { data: null, error };

  const userId = signInData.session.user.id;

  // Fetch user name from 'users' table
  const { data: userProfile, error: profileError } = await supabase
    .from('users')
    .select('name')
    .eq('id', userId)
    .single();

  if (profileError) return { data: null, error: profileError };

  // ✅ You can now save this data in app storage or context
  const sessionInfo = {
    user: {
      id: userId,
      email,
      name: userProfile.name,
    },
    session: signInData.session,
  };

  return { data: sessionInfo, error: null };
};


// Sign out current user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Get current session
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
};

// Fetch user profile from 'users' table
export const getUserProfileAndBalance = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session?.user) return null;

  const userId = session.user.id;

  const { data, error: userError } = await supabase
    .from('users')
    .select('name')
    .eq('id', userId)
    .single();

  if (userError) return null;

  return data;
};
