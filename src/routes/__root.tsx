import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/project-error-reporting";

function NotFoundComponent() {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-background px-4"
      aria-labelledby="not-found-title"
    >
      <div className="max-w-md text-center">
        <h1 id="not-found-title" className="text-7xl font-bold text-foreground">
          404
        </h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-background px-4"
      aria-labelledby="error-title"
    >
      <div className="max-w-md text-center">
        <h1 id="error-title" className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Try again
          </button>

          {/* Mengubah <a> menjadi <Link> TanStack agar transisi kembali ke home tetap smooth & super cepat */}
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-300 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-input focus:ring-offset-2"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      { title: "M. Maulana Malik Ibrahim — Autonomous Frontend Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Muhammad Maulana Malik Ibrahim. An autonomous frontend engineer pioneering high-fidelity digital spaces, cinematic motion, and strict architecture.",
      },

      { name: "author", content: "Muhammad Maulana Malik Ibrahim" },

      { property: "og:title", content: "M. Maulana Malik Ibrahim — Autonomous Frontend Engineer" },
      {
        property: "og:description",
        content:
          "Pioneering high-fidelity digital spaces. Obsessed with strict architecture, cinematic motion, and uncompromising pixel execution.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "M. Maulana Malik Ibrahim Portfolio" },

      {
        property: "og:image",
        content: "https://maulanamalik.dev/og-image.jpg",
      },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "M. Maulana Malik Ibrahim — Autonomous Frontend Engineer" },
      {
        name: "twitter:description",
        content:
          "Pioneering high-fidelity digital spaces. Obsessed with strict architecture, cinematic motion, and uncompromising pixel execution.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
