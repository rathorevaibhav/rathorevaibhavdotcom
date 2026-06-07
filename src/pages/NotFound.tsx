import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <section className="mx-auto w-full max-w-5xl px-5 sm:px-8 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">404</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted-foreground">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block text-sm font-medium text-primary hover:text-primary/80"
      >
        ← Back home
      </Link>
    </section>
  );
};

export default NotFound;
