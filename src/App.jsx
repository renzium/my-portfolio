// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import Works from "./components/Works.jsx";
import WorkDetail from "./components/WorkDetail.jsx";
import Blog from "./components/Blog.jsx";
import CVList from "./components/CVList.jsx"; // Active in background
import CVViewer from "./components/CVViewer.jsx"; // Active in background
import { ThemeProvider } from "./components/use-theme.jsx";
import BlogPost1 from "./components/BlogPost1.jsx";
import BlogPost2 from "./components/BlogPost2.jsx"
import BlogPost3 from "./components/BlogPost3.jsx"
import BlogPost4 from "./components/BlogPost4.jsx"

export default function App() {
  const list = [
    {
  id: 1,
  slug: "building-cross-platform-mobile-apps-react-native",
  title: "Building Cross-Platform Mobile Apps with React Native",
  date: "15 Dec 2024",
  tags: ["React Native", "Mobile", "TypeScript", "Expo"],
  excerpt: "A practical deep-dive into building production-grade iOS and Android applications from a single codebase — covering Expo, TypeScript, native modules, and lessons learned from shipping the Paka and SQE apps.",
  component: "BlogPost1",
},
{
  id: 2,
  slug: "integrating-ai-voice-features-mobile-apps",
  title: "Integrating AI Voice Features into Mobile Apps",
  date: "10 Dec 2024",
  tags: ["AI Integration", "React Native", "OpenAI", "Speech"],
  excerpt: "How to combine speech-to-text, conversational AI, and text-to-speech into a cohesive voice interface in React Native — covering OpenAI Whisper, expo-speech, permission handling, and real-time audio streaming.",
  component: "BlogPost2",
},{
  id: 3,
  slug: "optimizing-react-19-hydration",
  title: "Optimizing Client-Side Hydration on React 19 Engine Hooks",
  date: "12 Feb 2026",
  tags: ["React", "DevOps", "Performance"],
  component: "BlogPost3",
},
{
  id: 4,
  slug: "vite-production-pipelines",
  title: "Building Production Pipelines with Vite and Custom Assets",
  date: "28 Jan 2026",
  tags: ["Vite", "Architecture", "Bundling"],
  component: "BlogPost4",
},
  ];
  return (
    <ThemeProvider>
      <main className="relative min-h-screen bg-background text-foreground selection:bg-[--emerald]/20 selection:text-[--emerald]">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/works/:id" element={<WorkDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/blogpost1" element={<BlogPost1 />} />
          <Route path="/blog/blogpost2" element={<BlogPost2 />} />
          <Route path="/blog/blogpost3" element={<BlogPost3 />} />
          <Route path="/blog/blogpost4" element={<BlogPost4 />} />
          
          {/* Kept routes fully operational, just not listed on main navigation */}
          <Route path="/cvs" element={<CVList />} />
          <Route path="/cvs/:id" element={<CVViewer />} />
        </Routes>
        <Footer />
      </main>
    </ThemeProvider>
  );
}