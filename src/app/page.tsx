
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShieldCheck, MessageSquareHeart, BarChart3 } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-28 md:py-44">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ShieldCheck className="h-20 w-20 text-primary mx-auto mb-8" />
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-foreground mb-8">
              Welcome to <span className="text-primary">MeroSathi</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Tapailai swagat cha! Understand, create, and maintain healthy personal boundaries for a more fulfilling life in Nepal.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href="/signup">
                  Start Your Journey (सुरु गर्नुहोस्) <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
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
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-center text-foreground mb-16">
              Discover Your Path to Stronger Boundaries
            </h2>
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <FeatureCard
                icon={<MessageSquareHeart className="h-12 w-12 text-primary mb-5" />}
                title="AI Boundary Assistant (Nepali Context)"
                description="Receive personalized, AI-powered suggestions for various boundaries (Financial, Social, etc.), considering Nepali cultural nuances."
                link="/assistant"
                linkText="Try the Assistant"
              />
              <FeatureCard
                icon={<BarChart3 className="h-12 w-12 text-primary mb-5" />}
                title="Progress Dashboard"
                description="Visualize your journey, track your growth, and celebrate milestones in establishing personal boundaries."
                link="/dashboard"
                linkText="View Dashboard"
              />
              <FeatureCard
                icon={<ShieldCheck className="h-12 w-12 text-primary mb-5" />}
                title="Secure & Easy Access"
                description="Your personal journey is safe. Easy sign-up and login with email or Google."
                link="/signup"
                linkText="Create Account"
              />
            </div>
          </div>
        </section>
        
        {/* Call to Action Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <h2 className="text-3xl md:text-4xl font-headline font-semibold text-foreground mb-8">
              Ready to Build Healthier Relationships in Your Life?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Join MeroSathi today and start your journey towards personal empowerment and well-being, with support tailored for you.
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
    <div className="bg-background p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center">
      {icon}
      <h3 className="text-2xl font-headline font-semibold text-foreground mb-4">{title}</h3>
      <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">{description}</p>
      <Button variant="link" size="lg" asChild className="text-primary font-medium">
        <Link href={link}>
          {linkText} <ArrowRight className="ml-1.5 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
