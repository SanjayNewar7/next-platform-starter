
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <ShieldAlert className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-headline text-foreground">Privacy Policy</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Last Updated: {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-foreground/80 leading-relaxed space-y-6 px-6 md:px-10 pb-10">
            <p>
              Welcome to BoundaryWise. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
            </p>

            <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
            <p>
              Currently, BoundaryWise is designed as a client-side application that primarily uses your browser's local storage to function. This means:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>Account Information (Mock):</strong> If you use our mock authentication (email/password or Google Sign-In), we store a mock user object in your browser's local storage. This includes your provided email, a mock user ID, and optionally a display name or photo URL (if signed in with Google mock). This information is not transmitted to any external server.
              </li>
              <li>
                <strong>Boundary Data:</strong> Details about boundaries you define with the AI assistant (type, situation, desired outcome, past attempts, AI recommendation, status) are stored in your browser's local storage. This allows the dashboard and logging features to work. This data is not sent to or stored on any external server.
              </li>
              <li>
                <strong>Usage Data (Local):</strong> We do not actively collect personal usage data or analytics that are transmitted off your device in this version.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">2. How We Use Your Information</h2>
            <p>
              The information stored locally is used solely for the functionality of the BoundaryWise application on your device, such as:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>To provide you with AI-generated boundary recommendations.</li>
              <li>To allow you to log your experiences with setting boundaries.</li>
              <li>To display your progress on your personal dashboard.</li>
              <li>To personalize your experience (e.g., display name).</li>
            </ul>
            <p>We do not use this locally stored information for any other purpose, such as advertising or selling to third parties, as it remains on your device.</p>

            <h2 className="text-xl font-semibold text-foreground">3. Data Storage and Security</h2>
            <p>
              All data specific to your use of BoundaryWise (mock user profile, boundary logs) is stored in your web browser's local storage.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>Security:</strong> Local storage is sandboxed by your browser, meaning other websites cannot access BoundaryWise's local storage data. However, anyone with access to your browser on your device could potentially access this data. Please ensure your device and browser are secured.
              </li>
              <li><strong>Data Retention:</strong> Data remains in your local storage until you clear your browser's cache/data for this site, or if you uninstall/remove the application context where it might be running.
              </li>
            </ul>


            <h2 className="text-xl font-semibold text-foreground">4. Third-Party Services</h2>
            <p>
              <strong>Google Sign-In (Mock):</strong> Our Google Sign-In feature is a mock implementation. It does not actually communicate with Google's servers or authenticate you with a real Google account. It simulates the process for demonstration purposes.
            </p>
            <p>
              <strong>Generative AI:</strong> The AI features in BoundaryWise (e.g., Genkit, Google AI) involve sending the input you provide (situation, desired outcome, etc.) to Google's AI models to generate recommendations. Please be mindful of the information you share in these inputs. Google's use of this data is governed by their respective privacy policies and terms of service.
            </p>

            <h2 className="text-xl font-semibold text-foreground">5. Your Rights</h2>
            <p>
              Since all your data is stored locally in your browser:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>Access and Deletion:</strong> You have full control to access or delete your data by clearing your browser's local storage for the BoundaryWise site.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">6. Children's Privacy</h2>
            <p>BoundaryWise is not intended for use by children under the age of 13 (or a higher age threshold as required by applicable law). We do not knowingly collect personal information from children.</p>

            <h2 className="text-xl font-semibold text-foreground">7. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-xl font-semibold text-foreground">8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through the methods provided on our <Link href="/contact-support" className="text-primary hover:underline">Contact Support page</Link>.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
