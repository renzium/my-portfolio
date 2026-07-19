import React from 'react';
import { Link } from 'react-router-dom';

function BlogPost4() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-foreground transition-colors duration-300">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-[--secondary] font-semibold mb-10 transition-transform duration-300 hover:-translate-x-1"
      >
        ← Back to Blog
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 text-foreground">
          Building Production Pipelines with Vite and Custom Assets
        </h1>
        <div className="flex gap-4 items-center text-muted-foreground text-sm mb-8 flex-wrap">
          <span>28 Jan 2026</span>
          <span>•</span>
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white rounded-full text-xs font-semibold">
            Vite
          </span>
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#ef4444] to-[#ec4899] text-white rounded-full text-xs font-semibold">
            Architecture
          </span>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-[--emerald] pl-5">
          Vite is fast out of the box — but production pipelines are rarely out-of-the-box problems. 
          This is a walkthrough of the configuration patterns I have settled on after migrating 
          several large React applications to Vite, including this portfolio.
        </p>
      </header>

      <div className="text-base md:text-lg leading-relaxed text-muted-foreground space-y-10">

        {/* Section 1 */}
        <section className="space-y-5">
          <h2 className="text-3xl font-bold text-foreground">Why Vite in Production Deserves Attention</h2>
          <p>
            Most engineers discover Vite through its development server — the near-instant 
            cold starts and sub-millisecond HMR are genuinely impressive. What gets less 
            attention is the production build, which is powered by Rollup under the hood. 
            The two environments use fundamentally different module systems: native ESM in 
            development, Rollup bundles in production. This split is intentional, but it 
            means bugs that only appear in production builds are a real category of problem 
            you need to plan for.
          </p>

          <div className="bg-[--light2]/40 border-l-4 border-[--emerald] p-6 rounded-r-lg">
            <strong className="text-[--emerald] font-semibold">Rule of thumb:</strong> Never assume 
            your development build behaviour will match production. Always run <code className="bg-[--light2]/60 px-2 py-0.5 rounded text-sm font-mono text-foreground">vite build && vite preview</code> before 
            every release. The preview server serves your actual Rollup output — it is the 
            only faithful representation of what users will see.
          </div>
        </section>

        {/* Section 2 */}
        <section className="space-y-5">
          <h2 className="text-3xl font-bold text-foreground">Configuration Paradigms That Scale</h2>
          <p>
            The default <code className="bg-[--light2]/60 px-2 py-0.5 rounded text-sm font-mono text-foreground">vite.config.ts</code> gets 
            you started, but a production-ready pipeline needs deliberate decisions in four areas: 
            chunking strategy, asset handling, environment variables, and plugin ordering.
          </p>

          <h3 className="text-2xl font-semibold text-foreground">Chunking Strategy</h3>
          <p>
            Vite's default chunking algorithm is good for small applications. On larger codebases 
            it tends to produce either one enormous bundle or hundreds of tiny chunks — both 
            of which hurt load performance. The fix is a manual chunks configuration in 
            your Rollup options:
          </p>

          <pre className="bg-[--light2]/60 border border-border/60 text-foreground p-6 rounded-xl overflow-x-auto font-mono text-sm leading-relaxed">
            <code>{`// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunk — changes rarely, caches well
          vendor: ['react', 'react-dom', 'react-router-dom'],

          // UI chunk — isolate large component libraries
          ui: ['lucide-react', '@radix-ui/react-dialog'],

          // Utils chunk — shared across features
          utils: ['date-fns', 'clsx', 'tailwind-merge'],
        },
      },
    },
    // Warn when a single chunk exceeds 500kb
    chunkSizeWarningLimit: 500,
  },
});`}</code>
          </pre>

          <p>
            The principle is cache-friendliness. Your vendor chunk (React, router) changes 
            only when you upgrade dependencies. Your UI chunk changes when you update 
            component libraries. Your application code changes on every deploy. By separating 
            them, returning users cache the stable chunks and only re-download the part that 
            actually changed.
          </p>

          <h3 className="text-2xl font-semibold text-foreground">Asset Handling</h3>
          <p>
            Vite handles static assets differently from Webpack, and the behaviour catches 
            engineers who are migrating. Assets imported directly in JavaScript get a 
            content-hashed filename and are co-located with your bundle. Assets in the 
            <code className="bg-[--light2]/60 px-2 py-0.5 rounded text-sm font-mono text-foreground"> /public</code> directory are copied 
            as-is with no hashing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
            <div className="bg-[--light2]/40 border border-border/60 p-6 rounded-xl">
              <h4 className="text-foreground font-semibold mb-3 text-base">Import in JS (hashed)</h4>
              <pre className="font-mono text-xs text-foreground leading-relaxed overflow-x-auto">
                <code>{`// Gets filename like:
// logo.a3f9b2c1.svg
import logo from './logo.svg';

// Use for: icons, images
// used inside components`}</code>
              </pre>
            </div>
            <div className="bg-[--light2]/40 border border-border/60 p-6 rounded-xl">
              <h4 className="text-foreground font-semibold mb-3 text-base">Public dir (no hash)</h4>
              <pre className="font-mono text-xs text-foreground leading-relaxed overflow-x-auto">
                <code>{`// Stays as: /robots.txt
// Reference with absolute path:
// '/robots.txt'

// Use for: robots.txt,
// favicons, OG images`}</code>
              </pre>
            </div>
          </div>

          <p>
            For custom font loading — a common production requirement — I have settled on 
            declaring fonts in CSS using <code className="bg-[--light2]/60 px-2 py-0.5 rounded text-sm font-mono text-foreground">@font-face</code> with 
            relative paths. Vite resolves these during the CSS build and produces hashed 
            font file references automatically, giving you cache-busting without any extra plugin.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-5">
          <h2 className="text-3xl font-bold text-foreground">Environment Variables Done Right</h2>
          <p>
            Vite exposes environment variables through <code className="bg-[--light2]/60 px-2 py-0.5 rounded text-sm font-mono text-foreground">import.meta.env</code> rather 
            than <code className="bg-[--light2]/60 px-2 py-0.5 rounded text-sm font-mono text-foreground">process.env</code>. Only variables 
            prefixed with <code className="bg-[--light2]/60 px-2 py-0.5 rounded text-sm font-mono text-foreground">VITE_</code> are exposed 
            to the client bundle — everything else stays server-side. This is the correct 
            behaviour, but it creates a migration footgun: any <code className="bg-[--light2]/60 px-2 py-0.5 rounded text-sm font-mono text-foreground">process.env.REACT_APP_*</code> references 
            from a Create React App migration will silently be <code className="bg-[--light2]/60 px-2 py-0.5 rounded text-sm font-mono text-foreground">undefined</code> in production.
          </p>

          <pre className="bg-[--light2]/60 border border-border/60 text-foreground p-6 rounded-xl overflow-x-auto font-mono text-sm leading-relaxed">
            <code>{`# .env.production
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_FIREBASE_PROJECT_ID=your-project-id

# Never prefix secrets — they end up in the bundle
STRIPE_SECRET_KEY=sk_live_...  # ✅ NOT exposed to client
VITE_STRIPE_PUBLIC_KEY=pk_live_... # ✅ Safe to expose`}</code>
          </pre>

          <p>
            I also recommend a <code className="bg-[--light2]/60 px-2 py-0.5 rounded text-sm font-mono text-foreground">src/env.ts</code> file 
            that validates and types your environment variables at startup. If a required 
            variable is missing in production, you want a loud error at boot — not a silent 
            undefined that surfaces as a broken feature three screens deep.
          </p>

          <pre className="bg-[--light2]/60 border border-border/60 text-foreground p-6 rounded-xl overflow-x-auto font-mono text-sm leading-relaxed">
            <code>{`// src/env.ts — validated, typed env access
const required = (key: string): string => {
  const value = import.meta.env[key];
  if (!value) throw new Error(\`Missing env variable: \${key}\`);
  return value;
};

export const env = {
  apiBaseUrl: required('VITE_API_BASE_URL'),
  firebaseProjectId: required('VITE_FIREBASE_PROJECT_ID'),
  stripePublicKey: required('VITE_STRIPE_PUBLIC_KEY'),
} as const;`}</code>
          </pre>
        </section>

        {/* Section 4 */}
        <section className="space-y-5">
          <h2 className="text-3xl font-bold text-foreground">Plugin Ordering and the Mistakes I Made</h2>
          <p>
            Vite plugins run in a specific order, and getting it wrong produces errors that 
            are genuinely confusing because they often look like unrelated TypeScript or 
            import errors. The rule is:
          </p>

          <ul className="list-disc pl-8 space-y-3">
            <li>
              <strong className="text-foreground">Vite-specific plugins first</strong> — 
              <code className="bg-[--light2]/60 px-2 py-0.5 rounded text-sm font-mono text-sm"> @vitejs/plugin-react</code>, 
              <code className="bg-[--light2]/60 px-2 py-0.5 rounded text-sm font-mono text-sm"> vite-plugin-svgr</code>
            </li>
            <li>
              <strong className="text-foreground">Transform plugins second</strong> — anything that 
              modifies source code before bundling
            </li>
            <li>
              <strong className="text-foreground">Post-process plugins last</strong> — compression, 
              manifest generation, bundle analysis
            </li>
          </ul>

          <pre className="bg-[--light2]/60 border border-border/60 text-foreground p-6 rounded-xl overflow-x-auto font-mono text-sm leading-relaxed">
            <code>{`import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),              // 1. Framework transform
    svgr(),               // 2. SVG → React components
    tsconfigPaths(),      // 2. Path alias resolution
    visualizer({          // 3. Post-build analysis
      open: false,
      filename: 'dist/bundle-stats.html',
      gzipSize: true,
    }),
  ],
});`}</code>
          </pre>

          <p>
            The <code className="bg-[--light2]/60 px-2 py-0.5 rounded text-sm font-mono text-foreground">rollup-plugin-visualizer</code> entry 
            at the end is one I add to every production project. It generates an interactive 
            treemap of your bundle after every build — an invaluable tool for catching 
            accidentally-imported large dependencies before they ship.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-5">
          <h2 className="text-3xl font-bold text-foreground">Modular Component Trees and Code Splitting</h2>
          <p>
            The last major pillar of a production Vite pipeline is ensuring your component 
            tree is structured for effective code splitting. Vite splits code at dynamic 
            import boundaries — so the question is where to put those boundaries.
          </p>
          <p>
            My rule: every route is a dynamic import. Everything below a route boundary 
            that is not needed for the initial render is a dynamic import. Modals, drawers, 
            heavy chart components, and anything behind a user interaction should be lazy.
          </p>

          <pre className="bg-[--light2]/60 border border-border/60 text-foreground p-6 rounded-xl overflow-x-auto font-mono text-sm leading-relaxed">
            <code>{`import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Routes are always lazy
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Heavy components behind interactions
const TransactionChart = lazy(
  () => import('./components/TransactionChart')
);

export function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
      </Routes>
    </Suspense>
  );
}`}</code>
          </pre>

          <p>
            Combined with the manual chunks configuration above, this produces a bundle 
            structure where the initial page load is a small entry file plus the vendor 
            chunk — typically under 80kb gzipped for most applications. Everything else 
            loads on demand, in parallel, and is cached independently.
          </p>
        </section>

        {/* Results */}
        <section className="space-y-5">
          <h2 className="text-3xl font-bold text-foreground">What This Looks Like in Practice</h2>
          <p>
            When I migrated this portfolio from Create React App to the pipeline described 
            above, the production build metrics shifted significantly:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
            {[
              { before: "14.2s", after: "0.8s", label: "Cold build time" },
              { before: "312kb", after: "68kb", label: "Initial JS (gzip)" },
              { before: "4.1s", after: "1.1s", label: "First Contentful Paint" },
              { before: "1", after: "6", label: "Cache-friendly chunks" },
            ].map((s) => (
              <div key={s.label} className="bg-[--light2]/40 border border-border/60 rounded-xl p-4 text-center">
                <div className="text-xs text-muted-foreground line-through mb-1">{s.before}</div>
                <div className="text-2xl font-bold text-[--emerald]">{s.after}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion */}
        <section className="space-y-5">
          <h2 className="text-3xl font-bold text-foreground">Conclusion</h2>
          <p>
            Vite rewards engineers who understand its architecture. The split between 
            ESM-native development and Rollup-based production is not a quirk to work 
            around — it is the deliberate design that makes both environments fast at 
            what they are optimised for. Lean into it rather than fighting it.
          </p>
          <p>
            The four areas that deliver the most consistent production improvements are 
            manual chunk configuration, a deliberate asset strategy, validated environment 
            variables, and lazy-loaded routes. Get those right and you have a pipeline that 
            scales cleanly from a portfolio project to a production application handling 
            real user traffic.
          </p>
        </section>

      </div>
    </article>
  );
}

export default BlogPost4;