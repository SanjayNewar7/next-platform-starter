
"use client";

import React from 'react';
import AppLayout from '@/components/AppLayout';
import { useAuth } from '@/components/auth-provider';
import ProfileForm from '@/components/profile/ProfileForm';
import MiniDashboard from '@/components/profile/MiniDashboard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    // This should ideally be handled by AppLayout, but as a fallback:
    return (
      <AppLayout>
        <p>Loading user profile...</p>
      </AppLayout>
    );
  }

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold font-headline text-foreground">Your Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <UserCircle2 className="h-6 w-6 text-primary" /> Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-3">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} data-ai-hint="profile picture" />
                    <AvatarFallback className="text-3xl">{getInitials(user.displayName)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-semibold text-center">{user.displayName || 'No Name Set'}</p>
                    <p className="text-sm text-muted-foreground text-center">{user.email}</p>
                  </div>
                </div>
                <Separator />
                <ProfileForm />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <MiniDashboard />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
