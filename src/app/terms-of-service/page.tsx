
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-headline text-foreground">Terms of Service</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Last Updated: {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-foreground/80 leading-relaxed space-y-6 px-6 md:px-10 pb-10">
            <p>
              Welcome to MeroSathi ("the Application"). These Terms of Service ("Terms") govern your use of the Application. By accessing or using MeroSathi, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Application.
            </p>

            <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By using MeroSathi, you affirm that you are of legal age to enter into these Terms, or, if you are not, that you have obtained parental or guardian consent to enter into these Terms.
            </p>

            <h2 className="text-xl font-semibold text-foreground">2. Use of the Service</h2>
            <p>
              MeroSathi provides tools and AI-powered assistance to help users understand, establish, and maintain personal boundaries. You agree to use the Application only for lawful purposes and in accordance with these Terms.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>User Conduct:</strong> You agree not to use the Application in any way that is unlawful, harmful, or infringes on the rights of others. You are responsible for the content you input into the AI assistant.
              </li>
              <li>
                <strong>Mock Features:</strong> Certain features, such as user authentication and data storage, are currently implemented as mock, client-side functionalities. Data is stored in your browser's local storage and is not transmitted to external servers for these mock features.
              </li>
               <li>
                <strong>AI-Generated Content:</strong> The advice and suggestions provided by the AI assistant are for informational purposes only and should not be considered professional advice (e.g., legal, medical, psychological). You are responsible for your own decisions and actions based on such content. MeroSathi does not guarantee the accuracy, completeness, or usefulness of any AI-generated content.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">3. Intellectual Property</h2>
            <p>
              The Application and its original content (excluding user-provided input to the AI), features, and functionality are and will remain the exclusive property of Sanjaya Rajbhandari and MeroSathi. The Application is protected by copyright, trademark, and other laws.
            </p>

            <h2 className="text-xl font-semibold text-foreground">4. User Data and Privacy</h2>
            <p>
              Your use of MeroSathi is also governed by our <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>, which explains how we handle your data. As stated, current data handling is primarily client-side using local storage.
            </p>
            
            <h2 className="text-xl font-semibold text-foreground">5. Disclaimers</h2>
            <p>
              THE APPLICATION IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. MEROSATHI MAKES NO WARRANTIES, EXPRESS OR IMPLIED, REGARDING THE APPLICATION, INCLUDING BUT NOT LIMITED TO ITS ACCURACY, RELIABILITY, OR FITNESS FOR A PARTICULAR PURPOSE. WE DO NOT WARRANT THAT THE APPLICATION WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL COMPONENTS.
            </p>

            <h2 className="text-xl font-semibold text-foreground">6. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL MEROSATHI OR SANJAYA RAJBHANDARI BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE APPLICATION; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE APPLICATION; OR (III) UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT.
            </p>
            
            <h2 className="text-xl font-semibold text-foreground">7. Termination</h2>
            <p>
                We may terminate or suspend your access to the Application immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
            </p>

            <h2 className="text-xl font-semibold text-foreground">8. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of Nepal, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-semibold text-foreground">9. Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Application after those revisions become effective, you agree to be bound by the revised terms.
            </p>

            <h2 className="text-xl font-semibold text-foreground">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us through the methods provided on our <Link href="/contact-support" className="text-primary hover:underline">Contact Support page</Link>.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
