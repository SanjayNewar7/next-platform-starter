
"use client";

import Link from 'next/link';
import { LogIn, UserPlus, LogOut, LayoutDashboard, Sparkles, Edit3, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/components/auth-provider'; // Removed User import as it's not directly used here
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';

export default function Header() {
  const { user, signOut, loading } = useAuth();

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 text-xl font-semibold text-primary">
          <Image src="/images/merosathi_logo.png" alt="MeroSathi Logo" width={32} height={32} data-ai-hint="logo abstract" />
          <span className="font-headline">MeroSathi</span>
        </Link>
        <nav className="flex items-center gap-2 md:gap-4">
          {user && (
            <>
              <Button variant="ghost" asChild className="text-xs sm:text-sm px-2 sm:px-3">
                <Link href="/dashboard" className="flex items-center gap-1">
                  <LayoutDashboard className="h-4 w-4" /> 
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
              </Button>
              <Button variant="ghost" asChild className="text-xs sm:text-sm px-2 sm:px-3">
                <Link href="/assistant" className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4" /> 
                  <span className="hidden sm:inline">Assistant</span>
                </Link>
              </Button>
              <Button variant="ghost" asChild className="text-xs sm:text-sm px-2 sm:px-3">
                <Link href="/log-experience" className="flex items-center gap-1">
                  <Edit3 className="h-4 w-4" /> 
                  <span className="hidden sm:inline">My Experience</span>
                </Link>
              </Button>
            </>
          )}
          {loading ? (
            <div className="h-8 w-20 bg-muted rounded animate-pulse"></div>
          ) : user ? (
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} data-ai-hint="user avatar" />
                    <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || user.email}</p>
                    {user.displayName && <p className="text-xs leading-none text-muted-foreground">{user.email}</p>}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/profile">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4" /> Login
                </Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/signup" className="flex items-center gap-1">
                  <UserPlus className="h-4 w-4" /> Sign Up
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
