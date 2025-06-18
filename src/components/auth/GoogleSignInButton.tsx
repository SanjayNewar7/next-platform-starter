
"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { useToast } from "@/hooks/use-toast";
import { Loader2 }
from 'lucide-react';

// A simple SVG Google icon. In a real app, you might use a more official one.
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="20px" height="20px">
    <path fill="#EA4335" d="M24 9.5c3.9 0 6.9 1.5 9.1 3.6l6.5-6.5C35.3 2.5 30.1 0 24 0 14.9 0 7.3 5.5 3 13.4l7.6 5.9C12.7 13.2 18 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.2 24.9c0-1.6-.1-3.2-.4-4.7H24v9h12.5c-.5 2.9-2.2 5.4-4.7 7.1l7.4 5.7c4.3-4 6.9-10 6.9-17.1z"/>
    <path fill="#FBBC05" d="M10.6 29.3c-.6-1.8-.9-3.7-.9-5.7s.3-3.9.9-5.7l-7.6-6C1.2 15.5 0 19.6 0 24s1.2 8.5 3.1 12.1l7.5-6.1z"/>
    <path fill="#34A853" d="M24 48c6.3 0 11.7-2.1 15.6-5.6l-7.4-5.7c-2.1 1.4-4.8 2.3-7.9 2.3-6.2 0-11.5-3.9-13.4-9.2L3 34.6C7.3 42.5 14.9 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
);


export default function GoogleSignInButton() {
  const { signInWithGoogle, loading } = useAuth();
  const { toast } = useToast();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: "Signed in with Google",
        description: "Welcome to MeroSathi!",
      });
    } catch (error: any) {
      toast({
        title: "Google Sign-In Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button variant="outline" className="w-full" onClick={handleSignIn} disabled={loading}>
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <GoogleIcon />
      )}
      <span className="ml-2">Sign in with Google</span>
    </Button>
  );
}
