
export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border py-6 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} BoundaryWise. All rights reserved.</p>
        <p className="mt-1">Empowering you to set healthy personal boundaries.</p>
      </div>
    </footer>
  );
}
