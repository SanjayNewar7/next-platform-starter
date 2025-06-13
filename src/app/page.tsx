
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, MessageSquareHeart, BarChart3 } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ShieldCheck className="h-20 w-20 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground mb-6">
              Welcome to <span className="text-primary">BoundaryWise</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Empowering you to understand, create, and maintain healthy personal boundaries for a more fulfilling life.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">
                  Log In
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-headline font-semibold text-center text-foreground mb-12">
              Discover Your Path to Stronger Boundaries
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<MessageSquareHeart className="h-10 w-10 text-primary mb-4" />}
                title="AI Boundary Assistant"
                description="Receive personalized, AI-powered suggestions for setting boundaries in challenging situations."
                link="/assistant"
                linkText="Try the Assistant"
              />
              <FeatureCard
                icon={<BarChart3 className="h-10 w-10 text-primary mb-4" />}
                title="Progress Dashboard"
                description="Visualize your journey, track your growth, and celebrate milestones in establishing personal boundaries."
                link="/dashboard"
                linkText="View Dashboard"
              />
              <FeatureCard
                icon={<ShieldCheck className="h-10 w-10 text-primary mb-4" />}
                title="Secure Authentication"
                description="Your personal journey is safe with us. Easy sign-up and login with email or Google."
                link="/signup"
                linkText="Create Account"
              />
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h2 className="text-3xl font-headline font-semibold text-foreground mb-6">
              Ready to Build Healthier Relationships?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Join BoundaryWise today and start your journey towards personal empowerment and well-being.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">
                Sign Up Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
        
      </main>
      <Footer />
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

function FeatureCard({ icon, title, description, link, linkText }: FeatureCardProps) {
  return (
    <div className="bg-background p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
      {icon}
      <h3 className="text-xl font-headline font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
      <Button variant="link" asChild className="text-primary">
        <Link href={link}>
          {linkText} <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

