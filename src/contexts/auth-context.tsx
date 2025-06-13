
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
  signInWithEmail: (email: string, pass: string) => Promise<void>; // Promise<UserCredential>
  signUpWithEmail: (email: string, pass: string) => Promise<void>; // Promise<UserCredential>
  signInWithGoogle: () => Promise<void>; // Promise<UserCredential>
  signOut: () => Promise<void>;
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
    // Mock initial auth check
    const mockUserJson = localStorage.getItem('mockUser');
    if (mockUserJson) {
      setUser(JSON.parse(mockUserJson));
    }
    setLoading(false);

    // Real Firebase auth state listener:
    // const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
    //   if (firebaseUser) {
    //     setUser({ id: firebaseUser.uid, email: firebaseUser.email, displayName: firebaseUser.displayName, photoURL: firebaseUser.photoURL });
    //   } else {
    //     setUser(null);
    //   }
    //   setLoading(false);
    // });
    // return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, _pass: string) => {
    setLoading(true);
    setError(null);
    // Mock login
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
    // Mock signup
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
    // Mock Google Sign-In
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = { id: 'mock-user-id-google', email: 'googleuser@example.com', displayName: 'Google User', photoURL: 'https://placehold.co/100x100' };
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setLoading(false);
    router.push('/dashboard');
    // Real Google Sign-In
    // const provider = new GoogleAuthProvider();
    // try {
    //   await signInWithPopup(auth, provider);
    //   router.push('/dashboard');
    // } catch (e: any) {
    //   setError(e.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    // Mock sign out
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('mockUser');
    setLoading(false);
    router.push('/login');
    // Real sign out
    // try {
    //   await firebaseSignOut(auth);
    //   router.push('/login');
    // } catch (e: any) {
    //   setError(e.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  const value = {
    user,
    loading,
    error,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
