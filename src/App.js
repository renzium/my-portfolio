import { Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import Blog from "./components/Blog";
import BlogPost1 from "./components/BlogPost1";
import BlogPost2 from "./components/BlogPost2";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import WorkDetail from "./components/WorkDetail";
import Works from "./components/Works";
import CVList from "./components/CVList";
import CVViewer from "./components/CVViewer";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  const location = useLocation();
  
  // Hide Header and Footer on CV routes to prevent print overflow
  const isCVRoute = location.pathname.startsWith('/cvs');

  return (
    <AppContainer>
      {!isCVRoute && <Header />}
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/works" element={<Works />}/>
          <Route path="/blog" element={<Blog />}/>
          <Route path="/blog/react-native-development" element={<BlogPost1 />}/>
          <Route path="/blog/ai-voice-features" element={<BlogPost2 />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/works/detail" element={<WorkDetail />}/>
          {/* CV Management Routes */}
          <Route path="/cvs" element={<CVList />}/>
          <Route path="/cvs/:cvId" element={<CVViewer />}/>
        </Routes>
      </MainContent>
      {!isCVRoute && <Footer/>}
    </AppContainer>
  );
}

export default App;