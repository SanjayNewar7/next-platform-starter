
export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm">
        <div className="mb-4">
          <h4 className="font-semibold text-foreground">About the Creator</h4>
          <p className="mt-1 text-xs max-w-xl mx-auto">
            BoundaryWise is a project by Sanjaya Rajbhandari, a final-year BCA student and passionate Graphics Designer. 
            This app blends his creative vision for intuitive user experiences with his growing technical expertise, 
            aiming to empower individuals in their journey towards healthier personal boundaries.
          </p>
        </div>
        <div className="border-t border-border/50 pt-4">
            <p>&copy; {new Date().getFullYear()} BoundaryWise. All rights reserved.</p>
            <p className="mt-1">Empowering you to set healthy personal boundaries.</p>
        </div>
      </div>
    </footer>
  );
}
