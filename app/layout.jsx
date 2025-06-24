// This file is part of a starter template and is not used by the MeroSathi application.
// It has been made a valid layout to prevent build errors.
// The active layout is located at src/app/layout.tsx.
import React from 'react';
import '@/app/globals.css';
import { AuthProvider } from '@/components/auth-provider';
import { Toaster } from '@/components/ui/toaster';

// This is a minimal, valid layout to satisfy Next.js.
// It mirrors the providers from the real layout to ensure functionality.
export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </head>
            <body>
                <AuthProvider>
                    {children}
                    <Toaster />
                </AuthProvider>
            </body>
        </html>
    );
}
