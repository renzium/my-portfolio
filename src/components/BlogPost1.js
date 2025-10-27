import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
  
  @media (min-width: 56.25rem) {
    padding: 6rem 4rem;
  }
`;

const Header = styled.header`
  margin-bottom: 3rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(-4px);
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--dark);
  
  @media (min-width: 56.25rem) {
    font-size: 3.5rem;
  }
`;

const Meta = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  color: var(--light);
  margin-bottom: 2rem;
  font-size: 0.875rem;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const Content = styled.div`
  line-height: 1.8;
  font-size: 1.125rem;
  color: #4a5568;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 3rem;
    margin-bottom: 1rem;
    color: var(--dark);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    color: var(--dark);
  }

  p {
    margin-bottom: 1.5rem;
  }

  ul, ol {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }

  li {
    margin-bottom: 0.75rem;
  }

  code {
    background: #f7fafc;
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }

  pre {
    background: #1a202c;
    color: #e2e8f0;
    padding: 1.5rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin-bottom: 1.5rem;

    code {
      background: transparent;
      color: inherit;
      padding: 0;
    }
  }

  blockquote {
    border-left: 4px solid #667eea;
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #718096;
  }

  strong {
    font-weight: 600;
    color: var(--dark);
  }
`;

const Callout = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #ffffff 100%);
  border-left: 4px solid #667eea;
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin: 2rem 0;

  strong {
    color: #667eea;
  }
`;

function BlogPost1() {
  return (
    <PostContainer>
      <BackLink to="/">← Back to Home</BackLink>
      
      <Header>
        <Title>Building Cross-Platform Mobile Apps with React Native</Title>
        <Meta>
          <span>15th Dec 2024</span>
          <span>•</span>
          <Tag>React Native Development</Tag>
        </Meta>
      </Header>

      <Content>
        <Section>
          <p>
            React Native has revolutionized mobile app development by enabling developers to build truly native mobile applications for iOS and Android from a single codebase. As a React Native engineer with experience building production apps like Paka, SQE, and various client projects, I've seen firsthand how this framework transforms the development process.
          </p>
        </Section>

        <Section>
          <h2>Why React Native?</h2>
          <p>
            React Native enables developers to write code once and deploy to both iOS and Android platforms. This approach significantly reduces development time and costs while maintaining the performance and feel of native applications.
          </p>

          <Callout>
            <strong>Key Benefit:</strong> With React Native, you can share up to 90% of your codebase between platforms, dramatically reducing development time and maintenance overhead.
          </Callout>

          <h3>1. Single Codebase, Multiple Platforms</h3>
          <p>
            The biggest advantage of React Native is the ability to maintain one codebase for multiple platforms. During my work on the Paka app at NYXIDIOM, I developed features once and they worked seamlessly on both iOS and Android devices.
          </p>

          <h3>2. Near-Native Performance</h3>
          <p>
            React Native apps compile to native code, which means they perform just as well as native apps. In the SQE app, we achieved smooth 60fps animations and real-time WebSocket connections that rival native implementations.
          </p>

          <h3>3. Large Ecosystem</h3>
          <p>
            The React Native ecosystem is vast and growing:
          </p>
          <ul>
            <li>Expo for rapid development and built-in modules</li>
            <li>React Navigation for smooth, native-feeling navigation</li>
            <li>Native modules for advanced platform-specific features</li>
            <li>Libraries for everything from payments to AI integration</li>
          </ul>
        </Section>

        <Section>
          <h2>Key Technologies in My Stack</h2>
          
          <h3>Expo Framework</h3>
          <p>
            Expo has been instrumental in my recent projects. For the Paka app, Expo provided:
          </p>
          <ul>
            <li>Built-in authentication providers</li>
            <li>Push notification handling out of the box</li>
            <li>Easy integration with services like Supabase and Stripe</li>
            <li>Simple deployment via EAS (Expo Application Services)</li>
          </ul>

          <h3>TypeScript for Type Safety</h3>
          <p>
            Using TypeScript in React Native projects has been a game-changer:
          </p>
          <ul>
            <li>Catch errors before runtime</li>
            <li>Better IDE autocomplete and IntelliSense</li>
            <li>Self-documenting code through type definitions</li>
            <li>Easier refactoring and maintenance</li>
          </ul>

          <pre>
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
        </Section>

        <Section>
          <h2>Real-World Challenges and Solutions</h2>

          <h3>iOS-Specific Issues</h3>
          <p>
            During development of the Paka app, I encountered and fixed several iOS-specific issues:
          </p>

          <p><strong>Memory Management:</strong></p>
          <p>
            Images were randomly disappearing on iOS devices. The solution was implementing a robust image loading system with preloading and fallback mechanisms.
          </p>

          <p><strong>Keyboard Handling:</strong></p>
          <p>
            iOS keyboard behavior differs from Android. I implemented auto-focus on form inputs with proper timing to ensure users could see what they were typing.
          </p>

          <h3>Native Module Integration</h3>
          <p>
            In the SQE app, I integrated C++ native modules for:
          </p>
          <ul>
            <li>Cryptographic operations</li>
            <li>Performance-critical computations</li>
            <li>Secure transaction handling</li>
          </ul>
        </Section>

        <Section>
          <h2>Best Practices for React Native Development</h2>

          <h3>1. Performance Optimization</h3>
          <ul>
            <li>Use <code>React.memo</code> to prevent unnecessary re-renders</li>
            <li>Implement lazy loading for images and heavy components</li>
            <li>Optimize bundle size with code splitting</li>
            <li>Use <code>FlatList</code> instead of <code>ScrollView</code> for large lists</li>
          </ul>

          <h3>2. State Management</h3>
          <p>
            Choose the right state management solution:
          </p>
          <ul>
            <li><strong>Context API:</strong> For simple, shared state</li>
            <li><strong>Redux:</strong> For complex, global state management</li>
            <li><strong>Zustand:</strong> Lightweight alternative (used in SQE)</li>
          </ul>

          <h3>3. Testing Strategy</h3>
          <ul>
            <li>Unit tests for business logic</li>
            <li>Integration tests for critical user flows</li>
            <li>E2E tests with Detox or Appium</li>
          </ul>
        </Section>

        <Section>
          <h2>Looking Ahead: What's Next for React Native</h2>
          <p>
            The React Native ecosystem continues to evolve:
          </p>
          <ul>
            <li><strong>New Architecture:</strong> Improved performance and interoperability</li>
            <li><strong>Fabric Renderer:</strong> Better UI performance</li>
            <li><strong>TurboModules:</strong> Faster bridge between JS and native code</li>
            <li><strong>Improved CLI:</strong> Better developer experience</li>
          </ul>
        </Section>

        <Section>
          <h2>Conclusion</h2>
          <p>
            React Native continues to be the go-to framework for cross-platform mobile development. With proper architecture, testing, and performance optimization, you can build apps that users love while maintaining development efficiency.
          </p>
          <p>
            If you're interested in seeing my React Native projects in action, check out the portfolio works section for live demonstrations of the Paka and SQE applications.
          </p>
        </Section>
      </Content>
    </PostContainer>
  );
}

export default BlogPost1;

