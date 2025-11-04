'use client';

import { useState, useRef, useEffect } from 'react';
import SignLanguageAvatar from './components/SignLanguageAvatar';

export default function Home() {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            setText((prev) => prev + finalTranscript);
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const clearText = () => {
    setText('');
    setCurrentWord('');
  };

  const animateSignLanguage = () => {
    if (!text.trim()) return;

    const words = text.toLowerCase().trim().split(/\s+/);
    let index = 0;

    setCurrentWord(words[0]);

    const interval = setInterval(() => {
      index++;
      if (index < words.length) {
        setCurrentWord(words[index]);
      } else {
        clearInterval(interval);
        setTimeout(() => setCurrentWord(''), 1000);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-2 mt-8">
          Voice to Sign Language
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Speak or type to see animated sign language
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Input</h2>

            <div className="mb-4">
              <button
                onClick={toggleListening}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all transform hover:scale-105 ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isListening ? '🎤 Listening... (Click to Stop)' : '🎤 Start Voice Input'}
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or type your message:
              </label>
              <textarea
                value={text}
                onChange={handleTextChange}
                placeholder="Type your message here..."
                className="w-full h-40 p-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={animateSignLanguage}
                disabled={!text.trim()}
                className="flex-1 py-3 px-6 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all transform hover:scale-105"
              >
                ✨ Show Sign Language
              </button>
              <button
                onClick={clearText}
                className="py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all transform hover:scale-105"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Avatar Section */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sign Language Avatar</h2>
            <div className="flex items-center justify-center h-[400px] bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
              <SignLanguageAvatar word={currentWord} />
            </div>
            {currentWord && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Currently signing:</p>
                <p className="text-2xl font-bold text-indigo-600">{currentWord}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">How to Use:</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Click "Start Voice Input" to speak (works in Chrome/Edge browsers)</li>
            <li>• Or type your message in the text area</li>
            <li>• Click "Show Sign Language" to see the animated avatar perform signs</li>
            <li>• The avatar will sign each word sequentially with animated gestures</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
