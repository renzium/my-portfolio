import Hero from "./Hero.jsx";
import FeaturedWorks from "./FeaturedWorks.jsx";
import About from "./About.jsx";
import TechStack from "./TechStack.jsx";
import RecentPosts from "./RecentPosts.jsx";
import Contact from "./Contact.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWorks />
      <About />
      <TechStack />
      <RecentPosts />
      <Contact />
    </>
  );
}