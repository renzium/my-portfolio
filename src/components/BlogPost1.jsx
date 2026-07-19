import React from 'react';
import { Link } from 'react-router-dom';

function BlogPost1() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-foreground transition-colors duration-300">
      <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[--secondary] font-semibold mb-10 transition-transform duration-300 hover:-translate-x-1"
            >
              ← Back to Blog
            </Link>

      <header className="mb-12">
        {/* FIX: text-foreground → text-foreground */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 text-foreground">
          Building Cross-Platform Mobile Apps with React Native
        </h1>
        {/* FIX: text-foreground → text-muted-foreground */}
        <div className="flex gap-4 items-center text-muted-foreground text-sm mb-8">
          <span>15th Dec 2024</span>
          <span>•</span>
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-full text-xs font-semibold">
            React Native Development
          </span>
        </div>
      </header>

      <div className="text-base md:text-lg leading-relaxed text-muted-foreground space-y-8">
        <section className="mb-8">
          <p>
            React Native has revolutionized mobile app development by enabling developers to build truly native mobile applications for iOS and Android from a single codebase. As a React Native engineer with experience building production apps like Paka, SQE, and various client projects, I've seen firsthand how this framework transforms the development process.
          </p>
        </section>

        <section className="mb-8 space-y-6">
          {/* FIX: text-foreground → text-foreground throughout */}
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Why React Native?</h2>
          <p>
            React Native enables developers to write code once and deploy to both iOS and Android platforms. This approach significantly reduces development time and costs while maintaining the performance and feel of native applications.
          </p>

          {/* FIX: bg-[--light2]/40 now adapts via CSS variable */}
          <div className="bg-[--light2]/40 border-l-4 border-[#667eea] p-6 rounded-r-lg my-8">
            <strong className="text-[#667eea] font-semibold">Key Benefit:</strong> With React Native, you can share up to 90% of your codebase between platforms, dramatically reducing development time and maintenance overhead.
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">1. Single Codebase, Multiple Platforms</h3>
          <p>
            The biggest advantage of React Native is the ability to maintain one codebase for multiple platforms. During my work on the Paka app at NYXIDIOM, I developed features once and they worked seamlessly on both iOS and Android devices.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">2. Near-Native Performance</h3>
          <p>
            React Native apps compile to native code, which means they perform just as well as native apps. In the SQE app, we achieved smooth 60fps animations and real-time WebSocket connections that rival native implementations.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">3. Large Ecosystem</h3>
          <p>The React Native ecosystem is vast and growing:</p>
          <ul className="list-disc pl-8 space-y-3">
            <li>Expo for rapid development and built-in modules</li>
            <li>React Navigation for smooth, native-feeling navigation</li>
            <li>Native modules for advanced platform-specific features</li>
            <li>Libraries for everything from payments to AI integration</li>
          </ul>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Key Technologies in My Stack</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">Expo Framework</h3>
          <p>Expo has been instrumental in my recent projects. For the Paka app, Expo provided:</p>
          <ul className="list-disc pl-8 space-y-3">
            <li>Built-in authentication providers</li>
            <li>Push notification handling out of the box</li>
            <li>Easy integration with services like Supabase and Stripe</li>
            <li>Simple deployment via EAS (Expo Application Services)</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">TypeScript for Type Safety</h3>
          <p>Using TypeScript in React Native projects has been a game-changer:</p>
          <ul className="list-disc pl-8 space-y-3">
            <li>Catch errors before runtime</li>
            <li>Better IDE autocomplete and IntelliSense</li>
            <li>Self-documenting code through type definitions</li>
            <li>Easier refactoring and maintenance</li>
          </ul>

          {/* FIX: bg-[--light2]/60 → bg-[--light2]/60 so it adapts in dark mode */}
          <pre className="bg-[--light2]/60 border border-border/60 text-foreground p-6 rounded-xl overflow-x-auto my-8 font-mono text-sm">
            <code>{`// Example: Type-safe navigation
interface Props {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
  route: {
    params: {
      userId: string;
    };
  };
}`}</code>
          </pre>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Real-World Challenges and Solutions</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">iOS-Specific Issues</h3>
          <p>During development of the Paka app, I encountered and fixed several iOS-specific issues:</p>

          <p><strong className="font-semibold text-foreground">Memory Management:</strong></p>
          <p>Images were randomly disappearing on iOS devices. The solution was implementing a robust image loading system with preloading and fallback mechanisms.</p>

          <p><strong className="font-semibold text-foreground">Keyboard Handling:</strong></p>
          <p>iOS keyboard behavior differs from Android. I implemented auto-focus on form inputs with proper timing to ensure users could see what they were typing.</p>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">Native Module Integration</h3>
          <p>In the SQE app, I integrated C++ native modules for:</p>
          <ul className="list-disc pl-8 space-y-3">
            <li>Cryptographic operations</li>
            <li>Performance-critical computations</li>
            <li>Secure transaction handling</li>
          </ul>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Best Practices for React Native Development</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">1. Performance Optimization</h3>
          <ul className="list-disc pl-8 space-y-3">
            <li>Use <code>React.memo</code> to prevent unnecessary re-renders</li>
            <li>Implement lazy loading for images and heavy components</li>
            <li>Optimize bundle size with code splitting</li>
            <li>Use <code>FlatList</code> instead of <code>ScrollView</code> for large lists</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">2. State Management</h3>
          <p>Choose the right state management solution:</p>
          <ul className="list-disc pl-8 space-y-3">
            <li><strong className="font-semibold text-foreground">Context API:</strong> For simple, shared state</li>
            <li><strong className="font-semibold text-foreground">Redux:</strong> For complex, global state management</li>
            <li><strong className="font-semibold text-foreground">Zustand:</strong> Lightweight alternative (used in SQE)</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">3. Testing Strategy</h3>
          <ul className="list-disc pl-8 space-y-3">
            <li>Unit tests for business logic</li>
            <li>Integration tests for critical user flows</li>
            <li>E2E tests with Detox or Appium</li>
          </ul>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Looking Ahead: What's Next for React Native</h2>
          <p>The React Native ecosystem continues to evolve:</p>
          <ul className="list-disc pl-8 space-y-3">
            <li><strong className="font-semibold text-foreground">New Architecture:</strong> Improved performance and interoperability</li>
            <li><strong className="font-semibold text-foreground">Fabric Renderer:</strong> Better UI performance</li>
            <li><strong className="font-semibold text-foreground">TurboModules:</strong> Faster bridge between JS and native code</li>
            <li><strong className="font-semibold text-foreground">Improved CLI:</strong> Better developer experience</li>
          </ul>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Conclusion</h2>
          <p>
            React Native continues to be the go-to framework for cross-platform mobile development. With proper architecture, testing, and performance optimization, you can build apps that users love while maintaining development efficiency.
          </p>
          <p>
            If you're interested in seeing my React Native projects in action, check out the portfolio works section for live demonstrations of the Paka and SQE applications.
          </p>
        </section>
      </div>
    </article>
  );
}

export default BlogPost1;
