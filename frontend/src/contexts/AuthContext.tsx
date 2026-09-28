import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Profile } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  loginAsDemoCitizen: () => Promise<void>;
  loginAsDemoAdmin: () => Promise<void>;
  register: (data: { email: string; password: string; full_name: string; phone?: string }) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState<boolean>(true);

  const refreshProfile = async () => {
    try {
      if (token) {
        const u = await api.getMe();
        setUser(u);
        const p = await api.getProfile();
        setProfile(p);
      }
    } catch (e) {
      console.warn('Profile fetch error', e);
    }
  };

  useEffect(() => {
    const init = async () => {
      if (token) {
        try {
          const u = await api.getMe();
          setUser(u);
          const p = await api.getProfile();
          setProfile(p);
        } catch (e) {
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
          setProfile(null);
        }
      }
      setLoading(false);
    };
    init();
  }, [token]);

  const login = async (email: string, pass: string) => {
    const res = await api.login(email, pass);
    localStorage.setItem('token', res.access_token);
    setToken(res.access_token);
    setUser({
      id: res.user_id,
      email: res.email,
      full_name: res.full_name,
      role: res.role as 'citizen' | 'admin'
    });
    try {
      const p = await api.getProfile();
      setProfile(p);
    } catch (e) {}
  };

  const loginAsDemoCitizen = async () => {
    await login('citizen@example.com', 'citizen123');
  };

  const loginAsDemoAdmin = async () => {
    await login('admin@sih2026.gov.in', 'admin123');
  };

  const register = async (data: { email: string; password: string; full_name: string; phone?: string }) => {
    const res = await api.register(data);
    localStorage.setItem('token', res.access_token);
    setToken(res.access_token);
    setUser({
      id: res.user_id,
      email: res.email,
      full_name: res.full_name,
      role: res.role as 'citizen' | 'admin'
    });
    const p = await api.getProfile();
    setProfile(p);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === 'admin',
        loading,
        login,
        loginAsDemoCitizen,
        loginAsDemoAdmin,
        register,
        logout,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
