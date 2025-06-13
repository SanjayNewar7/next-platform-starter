
import Link from 'next/link';
import SignupForm from '@/components/auth/SignupForm';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/30">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Create your BoundaryWise Account</CardTitle>
            <CardDescription>Start your journey to healthier boundaries today.</CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
            <Separator className="my-6" />
            <GoogleSignInButton />
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button variant="link" asChild className="p-0 h-auto text-primary">
                <Link href="/login">
                  Log in
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

