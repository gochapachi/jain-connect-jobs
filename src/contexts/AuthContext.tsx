
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signUp: (email: string, password: string, userType: 'candidate' | 'employer', firstName?: string, lastName?: string, companyName?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (
    email: string, 
    password: string, 
    userType: 'candidate' | 'employer',
    firstName?: string,
    lastName?: string,
    companyName?: string
  ) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_type: userType
        }
      }
    });

    if (authError) throw authError;

    if (authData.user) {
      if (userType === 'candidate') {
        const { error: profileError } = await supabase.from('candidates').insert([
          {
            auth_id: authData.user.id,
            first_name: firstName || '',
            last_name: lastName || '',
            email: email,
            phone: '', // Required but will be updated later
            status: 'Active'
          }
        ]);
        if (profileError) throw profileError;
      } else {
        const { error: profileError } = await supabase.from('employers').insert([
          {
            auth_id: authData.user.id,
            company_name: companyName || '',
            industry: 'Technology', // Default value
            contact_person: firstName || '',
            email: email,
            phone: '', // Required but will be updated later
            status: 'Active'
          }
        ]);
        if (profileError) throw profileError;
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signUp, 
      signIn, 
      signOut,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
