import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { AuthService } from "../services/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerification: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const wrappedFunctions = {
    signUp: async (email: string, password: string) => {
      setLoading(true);
      const { user, error } = await AuthService.signUp(email, password);
      setUser(user);
      setError(error);
      setLoading(false);
    },
    login: async (email: string, password: string) => {
      setLoading(true);
      const { user, error } = await AuthService.login(email, password);
      setUser(user);
      setError(error);
      setLoading(false);
    },
    googleLogin: async () => {
      setLoading(true);
      const { user, error } = await AuthService.googleLogin();
      setUser(user);
      setError(error);
      setLoading(false);
    },
    logout: async () => {
      setLoading(true);
      const { error } = await AuthService.logout();
      setUser(null);
      setError(error);
      setLoading(false);
    },
    resetPassword: async (email: string) => {
      setLoading(true);
      const { error } = await AuthService.resetPassword(email);
      setError(error);
      setLoading(false);
    },
    resendVerification: async () => {
      setLoading(true);
      const { error } = await AuthService.resendVerification();
      setError(error);
      setLoading(false);
    },
  };

  const value = { user, loading, error, ...wrappedFunctions };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
