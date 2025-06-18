
import Link from 'next/link';
import LoginForm from '@/components/auth/LoginForm';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Log In to MeroSathi</CardTitle>
            <CardDescription>Access your dashboard and boundary assistant.</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <Separator className="my-6" />
            <GoogleSignInButton />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Button variant="link" asChild className="p-0 h-auto text-primary">
                <Link href="/signup">
                  Sign up
                </Link>
              </Button>
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
