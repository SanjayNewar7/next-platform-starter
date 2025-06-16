
"use client";

import type { User as FirebaseUser } from 'firebase/auth';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
// import { auth } from '@/lib/firebase'; // Actual Firebase auth
// import { onAuthStateChanged, signOut as firebaseSignOut, UserCredential, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Mock User type
export interface User extends Partial<FirebaseUser> {
  id: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithEmail: (email: string, pass: string) => Promise<void>; 
  signUpWithEmail: (email: string, pass: string) => Promise<void>; 
  signInWithGoogle: () => Promise<void>; 
  signOut: () => Promise<void>;
  updateUserProfile: (newDetails: Partial<Pick<User, 'displayName' | 'photoURL'>>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock implementation
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const mockUserJson = localStorage.getItem('mockUser');
    if (mockUserJson) {
      setUser(JSON.parse(mockUserJson));
    }
    setLoading(false);
  }, []);

  const updateUserProfile = async (newDetails: Partial<Pick<User, 'displayName' | 'photoURL'>>) => {
    if (!user) {
      setError("User not logged in to update profile.");
      return;
    }
    setLoading(true);
    setError(null);
    // Mock profile update
    await new Promise(resolve => setTimeout(resolve, 500));
    const updatedUser = { ...user, ...newDetails };
    setUser(updatedUser);
    localStorage.setItem('mockUser', JSON.stringify(updatedUser));
    setLoading(false);
  };

  const signInWithEmail = async (email: string, _pass: string) => {
    setLoading(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = { id: 'mock-user-id-email', email: email, displayName: email.split('@')[0] };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setLoading(false);
    router.push('/dashboard');
  };

  const signUpWithEmail = async (email: string, _pass: string) => {
    setLoading(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = { id: 'mock-user-id-signup', email: email, displayName: email.split('@')[0] };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setLoading(false);
    router.push('/dashboard');
  };
  
  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = { id: 'mock-user-id-google', email: 'googleuser@example.com', displayName: 'Google User', photoURL: 'https://placehold.co/100x100.png' };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setLoading(false);
    router.push('/dashboard');
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('mockUser');
    setLoading(false);
    router.push('/login');
  };

  const value = {
    user,
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
