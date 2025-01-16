import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabaseClient';

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setProfile(data.session?.user.user_metadata.avatar_url);
      setLoading(false);
    };

    checkSession();
  }, []);

  return { session, loading, profile };
};
