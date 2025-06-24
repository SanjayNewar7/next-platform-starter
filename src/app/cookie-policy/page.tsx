
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cookie } from 'lucide-react';
import Link from 'next/link';

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <Header />
      <main className="flex-grow max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <Cookie className="h-12 w-12 text-primary mx-auto mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-headline text-foreground">Cookie Policy</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Last Updated: {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-foreground/80 leading-relaxed space-y-6 px-6 md:px-10 pb-10">
            <p>
              This Cookie Policy explains how MeroSathi ("we," "us," or "our") uses cookies and similar technologies when you visit our application. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </p>

            <h2 className="text-xl font-semibold text-foreground">1. What Are Cookies?</h2>
            <p>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website or use an application. Cookies are widely used by website and application owners in order to make their services work, or to work more efficiently, as well as to provide reporting information.
            </p>
            <p>
              Cookies set by the application owner (in this case, MeroSathi) are called "first-party cookies." Cookies set by parties other than the application owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website/application (e.g., advertising, interactive content, and analytics).
            </p>

            <h2 className="text-xl font-semibold text-foreground">2. How We Use Cookies (Current Mock Implementation)</h2>
            <p>
              In the current version of MeroSathi, our use of traditional cookies is minimal as the application primarily relies on your browser's <strong>local storage</strong> for its core functionality (like mock authentication and storing your boundary data).
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>Local Storage:</strong> This is the primary mechanism we use. It's similar to cookies but allows for larger storage capacity and the data is not sent with every HTTP request. This is used for:
                <ul className="list-disc list-inside space-y-1 pl-6 mt-1">
                    <li>Storing your mock user session details after "logging in".</li>
                    <li>Saving the boundary definitions, recommendations, and your logged experiences.</li>
                </ul>
              </li>
              <li>
                <strong>Essential Cookies (Potentially by Framework/Platform):</strong> While MeroSathi itself doesn't actively set many cookies for its core logic in this version, the underlying web framework (Next.js) or hosting platform might use essential cookies for session management, security, or basic functionality. These are typically necessary for the site to operate.
              </li>
            </ul>
            <p>
              Future versions of MeroSathi, especially if a full backend and real authentication are implemented, may use cookies more extensively for purposes such as:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Authentication:</strong> To keep you logged in and manage your session securely.</li>
                <li><strong>Preferences:</strong> To remember your settings and preferences.</li>
                <li><strong>Analytics:</strong> To understand how users interact with the application (though we would seek consent for non-essential analytics cookies).</li>
            </ul>


            <h2 className="text-xl font-semibold text-foreground">3. Types of Cookies We Might Use in the Future</h2>
             <ul className="list-disc list-inside space-y-2 pl-4">
                <li><strong>Strictly Necessary Cookies:</strong> These cookies are essential for you to browse the application and use its features, such as accessing secure areas of the site.</li>
                <li><strong>Performance Cookies:</strong> These cookies collect information about how you use our application, like which pages you visited and which links you clicked on. None of this information can be used to identify you. It is all aggregated and, therefore, anonymized. Their sole purpose is to improve application functions.</li>
                <li><strong>Functionality Cookies:</strong> These cookies allow our application to remember choices you have made in the past, like what language you prefer or your user name and password so you can automatically log in.</li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">4. Your Choices Regarding Cookies and Local Storage</h2>
            <p>
              You have the right to decide whether to accept or reject cookies and how to manage your local storage.
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li>
                <strong>Browser Controls:</strong> Most web browsers allow some control of most cookies through the browser settings. You can set your browser to block cookies or to alert you when cookies are being sent. If you disable cookies, you may still use our application, though some functionalities might be impaired.
              </li>
              <li>
                <strong>Local Storage:</strong> You can clear MeroSathi's local storage data through your browser settings (usually found under "Clear browsing data," "Site settings," or similar options). Doing so will log you out of the mock authentication and remove all saved boundary data.
              </li>
            </ul>

            <h2 className="text-xl font-semibold text-foreground">5. Changes to This Cookie Policy</h2>
            <p>
              We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
            </p>

            <h2 className="text-xl font-semibold text-foreground">6. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies or other technologies, please contact us through the methods provided on our <Link href="/contact-support" className="text-primary hover:underline">Contact Support page</Link>.
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
