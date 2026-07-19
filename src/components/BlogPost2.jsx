import React from 'react';
import { Link } from 'react-router-dom';

function BlogPost2() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-16 md:py-24 text-foreground transition-colors duration-300">
      {/* Back Link styling */}
      <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[--secondary] font-semibold mb-10 transition-transform duration-300 hover:-translate-x-1"
            >
              ← Back to Blog
            </Link>
      
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 text-foreground">
          Integrating AI Voice Features into Mobile Apps
        </h1>
        <div className="flex gap-4 items-center text-muted-foreground text-sm mb-8">
          <span>10th Dec 2024</span>
          <span>•</span>
          <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-full text-xs font-semibold">
            AI Integration
          </span>
        </div>
      </header>

      <div className="text-base md:text-lg leading-relaxed text-muted-foreground space-y-8">
        <section className="mb-8">
          <p>
            Voice interfaces are rapidly becoming an essential feature in modern mobile applications. With the integration of AI-powered voice recognition, text-to-speech, and conversational AI, we can create more accessible, engaging, and intuitive user experiences. As a developer exploring AI voice features for an upcoming React Native project, I've researched the best approaches and technologies for implementing voice interfaces.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Why Voice Features Matter</h2>
          <p className="mb-6">
            Voice interfaces offer several compelling advantages for mobile applications:
          </p>

          {/* Grid setup utilizing Tailwind grid properties - dynamically styles in dark mode using bg-[--light2]/20 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-[--light2]/40 border border-border/60 p-6 rounded-xl shadow-xs transition-colors duration-300">
              <h4 className="text-[#667eea] font-semibold text-lg mb-2">🌐 Accessibility</h4>
              <p className="text-sm m-0">Voice input makes apps usable for people with disabilities or in hands-free situations.</p>
            </div>
            <div className="bg-[--light2]/40 border border-border/60 p-6 rounded-xl shadow-xs transition-colors duration-300">
              <h4 className="text-[#667eea] font-semibold text-lg mb-2">⚡ Speed</h4>
              <p className="text-sm m-0">Speaking is faster than typing, especially for longer messages or commands.</p>
            </div>
            <div className="bg-[--light2]/40 border border-border/60 p-6 rounded-xl shadow-xs transition-colors duration-300">
              <h4 className="text-[#667eea] font-semibold text-lg mb-2">🎯 Intuitive</h4>
              <p className="text-sm m-0">Natural language is easier than learning complex UI patterns.</p>
            </div>
            <div className="bg-[--light2]/40 border border-border/60 p-6 rounded-xl shadow-xs transition-colors duration-300">
              <h4 className="text-[#667eea] font-semibold text-lg mb-2">🚀 Modern</h4>
              <p className="text-sm m-0">Users expect voice features in sophisticated applications.</p>
            </div>
          </div>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Core Voice Features</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">1. Speech-to-Text (STT)</h3>
          <p>
            Converting spoken words into text is the foundation of voice interfaces. In React Native, you can implement STT using:
          </p>
          <ul className="list-disc pl-8 space-y-3">
            <li><strong className="font-semibold text-foreground">@react-native-voice/voice:</strong> Cross-platform speech recognition</li>
            <li><strong className="font-semibold text-foreground">expo-speech:</strong> Built-in Expo module for iOS and Android</li>
            <li><strong className="font-semibold text-foreground">Web Speech API:</strong> For web-based implementations</li>
            <li><strong className="font-semibold text-foreground">Cloud APIs:</strong> Google Speech-to-Text, AWS Transcribe, Azure Speech</li>
          </ul>

          <pre className="bg-[--light2]/60 border border-border/60 text-foreground p-6 rounded-xl overflow-x-auto font-mono text-sm">
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

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">2. Text-to-Speech (TTS)</h3>
          <p>
            Converting text back to speech for feedback and responses:
          </p>
          <ul className="list-disc pl-8 space-y-3">
            <li><strong className="font-semibold text-foreground">expo-speech:</strong> Simple, built-in solution for Expo</li>
            <li><strong className="font-semibold text-foreground">react-native-tts:</strong> Feature-rich TTS library</li>
            <li><strong className="font-semibold text-foreground">Amazon Polly:</strong> High-quality cloud-based voices</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">3. Conversational AI</h3>
          <p>
            Making the voice interaction intelligent:
          </p>
          <ul className="list-disc pl-8 space-y-3">
            <li><strong className="font-semibold text-foreground">OpenAI API:</strong> GPT models for natural conversations</li>
            <li><strong className="font-semibold text-foreground">Dialogflow:</strong> Google's conversational AI platform</li>
            <li><strong className="font-semibold text-foreground">Rasa:</strong> Open-source conversational AI</li>
            <li><strong className="font-semibold text-foreground">Custom NLU:</strong> Build your own understanding logic</li>
          </ul>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Implementation Strategy for Voice Features</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">Step 1: Speech Recognition Setup</h3>
          <p>
            First, you need to set up voice recognition in your React Native app:
          </p>

          <div className="bg-[--light2]/40 border-l-4 border-[#667eea] p-6 rounded-r-lg my-8">
            <strong className="text-[#667eea] font-semibold">Key Consideration:</strong> Handle permissions carefully. Users must grant microphone permissions for voice features to work.
          </div>

          <pre className="bg-[--light2]/60 border border-border/60 text-foreground p-6 rounded-xl overflow-x-auto font-mono text-sm">
            <code>{`// Request microphone permission
import { request, PERMISSIONS } from 'react-native-permissions';

const requestMicrophonePermission = async () => {
  const result = await request(PERMISSIONS.IOS.MICROPHONE);
  if (result === 'granted') {
    startVoiceRecognition();
  }
};`}</code>
          </pre>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">Step 2: Real-Time Voice Streaming</h3>
          <p>
            For production-ready voice features, implement streaming audio to your backend:
          </p>
          <ul className="list-disc pl-8 space-y-3">
            <li>Capture audio in chunks</li>
            <li>Stream to your API endpoint</li>
            <li>Process with OpenAI Whisper or similar</li>
            <li>Return transcription in real-time</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">Step 3: AI Processing</h3>
          <p>
            Once you have the transcript, send it to your AI service:
          </p>

          <pre className="bg-[--light2]/60 border border-border/60 text-foreground p-6 rounded-xl overflow-x-auto font-mono text-sm">
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

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">Step 4: Voice Response</h3>
          <p>
            Play back the AI response using TTS:
          </p>

          <pre className="bg-[--light2]/60 border border-border/60 text-foreground p-6 rounded-xl overflow-x-auto font-mono text-sm">
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
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Best Practices for Voice Features</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">1. Error Handling</h3>
          <p>
            Voice recognition isn't always perfect. Implement:
          </p>
          <ul className="list-disc pl-8 space-y-3">
            <li>Confidence thresholds for results</li>
            <li>Fallback mechanisms when recognition fails</li>
            <li>Visual feedback during listening</li>
            <li>Manual correction options</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">2. Performance Optimization</h3>
          <ul className="list-disc pl-8 space-y-3">
            <li>Minimize latency with local processing when possible</li>
            <li>Implement audio compression for streaming</li>
            <li>Cache frequently used responses</li>
            <li>Optimize AI API calls</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">3. User Experience</h3>
          <ul className="list-disc pl-8 space-y-3">
            <li>Provide visual feedback during voice capture</li>
            <li>Show what the app "heard"</li>
            <li>Allow users to stop/restart listening</li>
            <li>Include keyboard fallback</li>
          </ul>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">4. Privacy and Security</h3>
          <ul className="list-disc pl-8 space-y-3">
            <li>Ask for explicit permission before recording</li>
            <li>Encrypt audio data in transit</li>
            <li>Don't store audio recordings without consent</li>
            <li>Comply with GDPR and data protection laws</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Use Cases for Voice Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-[--light2]/40 border border-border/60 p-6 rounded-xl shadow-xs transition-colors duration-300">
              <h4 className="text-[#667eea] font-semibold text-lg mb-2">🗣️ Voice Commands</h4>
              <p className="text-sm m-0">Control app functions with natural language commands.</p>
            </div>
            <div className="bg-[--light2]/40 border border-border/60 p-6 rounded-xl shadow-xs transition-colors duration-300">
              <h4 className="text-[#667eea] font-semibold text-lg mb-2">💬 Voice Messaging</h4>
              <p className="text-sm m-0">Send voice messages in chat applications.</p>
            </div>
            <div className="bg-[--light2]/40 border border-border/60 p-6 rounded-xl shadow-xs transition-colors duration-300">
              <h4 className="text-[#667eea] font-semibold text-lg mb-2">🤖 AI Assistant</h4>
              <p className="text-sm m-0">Interactive chatbot with voice interaction.</p>
            </div>
            <div className="bg-[--light2]/40 border border-border/60 p-6 rounded-xl shadow-xs transition-colors duration-300">
              <h4 className="text-[#667eea] font-semibold text-lg mb-2">🔍 Voice Search</h4>
              <p className="text-sm m-0">Search functionality using spoken queries.</p>
            </div>
            <div className="bg-[--light2]/40 border border-border/60 p-6 rounded-xl shadow-xs transition-colors duration-300">
              <h4 className="text-[#667eea] font-semibold text-lg mb-2">📝 Dictation</h4>
              <p className="text-sm m-0">Convert speech to text for notes and messages.</p>
            </div>
            <div className="bg-[--light2]/40 border border-border/60 p-6 rounded-xl shadow-xs transition-colors duration-300">
              <h4 className="text-[#667eea] font-semibold text-lg mb-2">🌍 Translation</h4>
              <p className="text-sm m-0">Real-time translation with voice input/output.</p>
            </div>
          </div>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Technical Architecture</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">Recommended Stack</h3>
          <p>
            For implementing voice features in React Native:
          </p>

          <div className="bg-[--light2]/40 border-l-4 border-[#667eea] p-6 rounded-r-lg my-8 text-sm space-y-1">
            <strong className="text-[#667eea] font-semibold block text-base mb-2">My Recommendation:</strong>
            <p>• Voice Recognition: @react-native-voice/voice</p>
            <p>• Text-to-Speech: expo-speech or react-native-tts</p>
            <p>• AI Processing: OpenAI API (GPT-4 or Whisper)</p>
            <p>• Backend: Node.js with Express/FastAPI</p>
            <p>• Real-time: WebSocket for streaming audio</p>
          </div>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">Flow Diagram</h3>
          <pre className="bg-[--light2]/60 border border-border/60 text-foreground p-6 rounded-xl overflow-x-auto font-mono text-sm leading-relaxed">
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
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Challenges and Solutions</h2>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">Challenge 1: Background Audio</h3>
          <p>
            <strong className="font-semibold text-foreground">Problem:</strong> Apps lose audio focus when backgrounded.<br/>
            <strong className="font-semibold text-foreground">Solution:</strong> Implement foreground service for continuous recording.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">Challenge 2: Network Latency</h3>
          <p>
            <strong className="font-semibold text-foreground">Problem:</strong> Cloud processing adds noticeable delay.<br/>
            <strong className="font-semibold text-foreground">Solution:</strong> Use optimistic UI updates and streaming responses.
          </p>

          <h3 className="text-2xl font-semibold mt-8 mb-3 text-foreground">Challenge 3: Accuracy</h3>
          <p>
            <strong className="font-semibold text-foreground">Problem:</strong> Voice recognition isn't 100% accurate.<br/>
            <strong className="font-semibold text-foreground">Solution:</strong> Show transcription for user confirmation, implement correction flow.
          </p>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">The Future of Voice in Mobile Apps</h2>
          <p>
            Voice interfaces are becoming increasingly sophisticated:
          </p>
          <ul className="list-disc pl-8 space-y-3">
            <li>Multi-language support with automatic detection</li>
            <li>Emotion recognition from voice tone</li>
            <li>Offline voice processing capabilities</li>
            <li>Advanced wake-word detection</li>
            <li>Better handling of accents and dialects</li>
          </ul>
        </section>

        <section className="mb-8 space-y-6">
          <h2 className="text-3xl font-bold mt-12 mb-4 text-foreground">Conclusion</h2>
          <p>
            Integrating voice features into mobile applications opens up a world of possibilities for user interaction. By combining speech recognition, AI processing, and text-to-speech, we can create more natural, accessible, and engaging experiences.
          </p>
          <p>
            The key to success is choosing the right tools, handling edge cases gracefully, and always keeping the user experience at the forefront of design decisions.
          </p>
          <p>
            As voice technology continues to evolve, staying up-to-date with the latest APIs and best practices will be crucial for building modern, competitive applications.
          </p>
        </section>
      </div>
    </article>
  );
}

export default BlogPost2;