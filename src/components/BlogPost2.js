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

const Section = styled.section`
  margin-bottom: 2rem;
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

const FeatureList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);

  h4 {
    color: #667eea;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    margin: 0;
  }
`;

function BlogPost2() {
  return (
    <PostContainer>
      <BackLink to="/">← Back to Home</BackLink>
      
      <Header>
        <Title>Integrating AI Voice Features into Mobile Apps</Title>
        <Meta>
          <span>10th Dec 2024</span>
          <span>•</span>
          <Tag>AI Integration</Tag>
        </Meta>
      </Header>

      <Content>
        <Section>
          <p>
            Voice interfaces are rapidly becoming an essential feature in modern mobile applications. With the integration of AI-powered voice recognition, text-to-speech, and conversational AI, we can create more accessible, engaging, and intuitive user experiences. As a developer exploring AI voice features for an upcoming React Native project, I've researched the best approaches and technologies for implementing voice interfaces.
          </p>
        </Section>

        <Section>
          <h2>Why Voice Features Matter</h2>
          <p>
            Voice interfaces offer several compelling advantages for mobile applications:
          </p>

          <FeatureList>
            <FeatureCard>
              <h4>🌐 Accessibility</h4>
              <p>Voice input makes apps usable for people with disabilities or in hands-free situations.</p>
            </FeatureCard>
            <FeatureCard>
              <h4>⚡ Speed</h4>
              <p>Speaking is faster than typing, especially for longer messages or commands.</p>
            </FeatureCard>
            <FeatureCard>
              <h4>🎯 Intuitive</h4>
              <p>Natural language is easier than learning complex UI patterns.</p>
            </FeatureCard>
            <FeatureCard>
              <h4>🚀 Modern</h4>
              <p>Users expect voice features in sophisticated applications.</p>
            </FeatureCard>
          </FeatureList>
        </Section>

        <Section>
          <h2>Core Voice Features</h2>

          <h3>1. Speech-to-Text (STT)</h3>
          <p>
            Converting spoken words into text is the foundation of voice interfaces. In React Native, you can implement STT using:
          </p>
          <ul>
            <li><strong>@react-native-voice/voice:</strong> Cross-platform speech recognition</li>
            <li><strong>expo-speech:</strong> Built-in Expo module for iOS and Android</li>
            <li><strong>Web Speech API:</strong> For web-based implementations</li>
            <li><strong>Cloud APIs:</strong> Google Speech-to-Text, AWS Transcribe, Azure Speech</li>
          </ul>

          <pre>
            <code>{`// Example: Basic speech recognition
import Voice from '@react-native-voice/voice';

const startListening = async () => {
  try {
    await Voice.start('en-US');
    Voice.onSpeechResults = (e) => {
      const transcript = e.value[0];
      setText(transcript);
    };
  } catch (error) {
    console.error('Error starting voice recognition:', error);
  }
};`}</code>
          </pre>

          <h3>2. Text-to-Speech (TTS)</h3>
          <p>
            Converting text back to speech for feedback and responses:
          </p>
          <ul>
            <li><strong>expo-speech:</strong> Simple, built-in solution for Expo</li>
            <li><strong>react-native-tts:</strong> Feature-rich TTS library</li>
            <li><strong>Amazon Polly:</strong> High-quality cloud-based voices</li>
          </ul>

          <h3>3. Conversational AI</h3>
          <p>
            Making the voice interaction intelligent:
          </p>
          <ul>
            <li><strong>OpenAI API:</strong> GPT models for natural conversations</li>
            <li><strong>Dialogflow:</strong> Google's conversational AI platform</li>
            <li><strong>Rasa:</strong> Open-source conversational AI</li>
            <li><strong>Custom NLU:</strong> Build your own understanding logic</li>
          </ul>
        </Section>

        <Section>
          <h2>Implementation Strategy for Voice Features</h2>

          <h3>Step 1: Speech Recognition Setup</h3>
          <p>
            First, you need to set up voice recognition in your React Native app:
          </p>

          <Callout>
            <strong>Key Consideration:</strong> Handle permissions carefully. Users must grant microphone permissions for voice features to work.
          </Callout>

          <pre>
            <code>{`// Request microphone permission
import { request, PERMISSIONS } from 'react-native-permissions';

const requestMicrophonePermission = async () => {
  const result = await request(PERMISSIONS.IOS.MICROPHONE);
  if (result === 'granted') {
    startVoiceRecognition();
  }
};`}</code>
          </pre>

          <h3>Step 2: Real-Time Voice Streaming</h3>
          <p>
            For production-ready voice features, implement streaming audio to your backend:
          </p>
          <ul>
            <li>Capture audio in chunks</li>
            <li>Stream to your API endpoint</li>
            <li>Process with OpenAI Whisper or similar</li>
            <li>Return transcription in real-time</li>
          </ul>

          <h3>Step 3: AI Processing</h3>
          <p>
            Once you have the transcript, send it to your AI service:
          </p>

          <pre>
            <code>{`// Example: Using OpenAI for conversational AI
const processVoiceInput = async (transcript) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'user', content: transcript }
      ],
      max_tokens: 150
    })
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
};`}</code>
          </pre>

          <h3>Step 4: Voice Response</h3>
          <p>
            Play back the AI response using TTS:
          </p>

          <pre>
            <code>{`// Play AI response as speech
import * as Speech from 'expo-speech';

const speakResponse = (text) => {
  Speech.speak(text, {
    language: 'en-US',
    pitch: 1.0,
    rate: 1.0,
  });
};`}</code>
          </pre>
        </Section>

        <Section>
          <h2>Best Practices for Voice Features</h2>

          <h3>1. Error Handling</h3>
          <p>
            Voice recognition isn't always perfect. Implement:
          </p>
          <ul>
            <li>Confidence thresholds for results</li>
            <li>Fallback mechanisms when recognition fails</li>
            <li>Visual feedback during listening</li>
            <li>Manual correction options</li>
          </ul>

          <h3>2. Performance Optimization</h3>
          <ul>
            <li>Minimize latency with local processing when possible</li>
            <li>Implement audio compression for streaming</li>
            <li>Cache frequently used responses</li>
            <li>Optimize AI API calls</li>
          </ul>

          <h3>3. User Experience</h3>
          <ul>
            <li>Provide visual feedback during voice capture</li>
            <li>Show what the app "heard"</li>
            <li>Allow users to stop/restart listening</li>
            <li>Include keyboard fallback</li>
          </ul>

          <h3>4. Privacy and Security</h3>
          <ul>
            <li>Ask for explicit permission before recording</li>
            <li>Encrypt audio data in transit</li>
            <li>Don't store audio recordings without consent</li>
            <li>Comply with GDPR and data protection laws</li>
          </ul>
        </Section>

        <Section>
          <h2>Use Cases for Voice Features</h2>

          <FeatureList>
            <FeatureCard>
              <h4>🗣️ Voice Commands</h4>
              <p>Control app functions with natural language commands.</p>
            </FeatureCard>
            <FeatureCard>
              <h4>💬 Voice Messaging</h4>
              <p>Send voice messages in chat applications.</p>
            </FeatureCard>
            <FeatureCard>
              <h4>🤖 AI Assistant</h4>
              <p>Interactive chatbot with voice interaction.</p>
            </FeatureCard>
            <FeatureCard>
              <h4>🔍 Voice Search</h4>
              <p>Search functionality using spoken queries.</p>
            </FeatureCard>
            <FeatureCard>
              <h4>📝 Dictation</h4>
              <p>Convert speech to text for notes and messages.</p>
            </FeatureCard>
            <FeatureCard>
              <h4>🌍 Translation</h4>
              <p>Real-time translation with voice input/output.</p>
            </FeatureCard>
          </FeatureList>
        </Section>

        <Section>
          <h2>Technical Architecture</h2>

          <h3>Recommended Stack</h3>
          <p>
            For implementing voice features in React Native:
          </p>

          <Callout>
            <strong>My Recommendation:</strong><br/><br/>
            • Voice Recognition: @react-native-voice/voice<br/>
            • Text-to-Speech: expo-speech or react-native-tts<br/>
            • AI Processing: OpenAI API (GPT-4 or Whisper)<br/>
            • Backend: Node.js with Express/FastAPI<br/>
            • Real-time: WebSocket for streaming audio
          </Callout>

          <h3>Flow Diagram</h3>
          <pre>
            <code>{`User Speaks
    ↓
Microphone Capture
    ↓
Speech-to-Text (Local/Cloud)
    ↓
Text Processing
    ↓
AI Understanding (OpenAI)
    ↓
Intent Recognition
    ↓
Generate Response
    ↓
Text-to-Speech
    ↓
Audio Output`}</code>
          </pre>
        </Section>

        <Section>
          <h2>Challenges and Solutions</h2>

          <h3>Challenge 1: Background Audio</h3>
          <p>
            <strong>Problem:</strong> Apps lose audio focus when backgrounded.<br/>
            <strong>Solution:</strong> Implement foreground service for continuous recording.
          </p>

          <h3>Challenge 2: Network Latency</h3>
          <p>
            <strong>Problem:</strong> Cloud processing adds noticeable delay.<br/>
            <strong>Solution:</strong> Use optimistic UI updates and streaming responses.
          </p>

          <h3>Challenge 3: Accuracy</h3>
          <p>
            <strong>Problem:</strong> Voice recognition isn't 100% accurate.<br/>
            <strong>Solution:</strong> Show transcription for user confirmation, implement correction flow.
          </p>
        </Section>

        <Section>
          <h2>The Future of Voice in Mobile Apps</h2>
          <p>
            Voice interfaces are becoming increasingly sophisticated:
          </p>
          <ul>
            <li>Multi-language support with automatic detection</li>
            <li>Emotion recognition from voice tone</li>
            <li>Offline voice processing capabilities</li>
            <li>Advanced wake-word detection</li>
            <li>Better handling of accents and dialects</li>
          </ul>
        </Section>

        <Section>
          <h2>Conclusion</h2>
          <p>
            Integrating voice features into mobile applications opens up a world of possibilities for user interaction. By combining speech recognition, AI processing, and text-to-speech, we can create more natural, accessible, and engaging experiences.
          </p>
          <p>
            The key to success is choosing the right tools, handling edge cases gracefully, and always keeping the user experience at the forefront of design decisions.
          </p>
          <p>
            As voice technology continues to evolve, staying up-to-date with the latest APIs and best practices will be crucial for building modern, competitive applications.
          </p>
        </Section>
      </Content>
    </PostContainer>
  );
}

export default BlogPost2;

