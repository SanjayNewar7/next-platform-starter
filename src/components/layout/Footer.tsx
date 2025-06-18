
export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
        <div className="mb-6">
          <h4 className="font-semibold text-foreground">About the Creator</h4>
          <p className="mt-1 text-xs max-w-xl mx-auto">
            BoundaryWise is a side project I’ve been working on as a BCA student and Graphics Designer. Through this app, I aim to help individuals better understand and maintain healthy personal boundaries with thoughtful, user-focused design.
            <br />
            – Sanjaya Rajbhandari
          </p>
        </div>

        <div className="mb-6">
          <p className="max-w-2xl mx-auto leading-relaxed">
            Setting healthy boundaries is a journey of self-discovery and empowerment. Be kind to yourself, celebrate every step, and remember BoundaryWise is here to support you. You&apos;re not alone in this.
          </p>
        </div>

        <div className="border-t border-border/50 pt-6">
            <p>&copy; {new Date().getFullYear()} BoundaryWise. All rights reserved.</p>
            <p className="mt-1">Empowering you to set healthy personal boundaries.</p>
        </div>
      </div>
    </footer>
  );
}
