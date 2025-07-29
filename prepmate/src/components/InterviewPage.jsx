
import React, { useState, useEffect, useRef } from 'react';
import '../styles/InterviewPage.css';

const InterviewPage = ({ user, onNavigate, onLogout }) => {
  const [isListening, setIsListening] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [userResponse, setUserResponse] = useState('');
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(3); // Default to a shorter interview
  const [transcript, setTranscript] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTopicSelection, setShowTopicSelection] = useState(true);
  const [showQuestionSettings, setShowQuestionSettings] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isRecognitionSupported, setIsRecognitionSupported] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [interviewDifficulty, setInterviewDifficulty] = useState('mixed');

  const recognitionRef = useRef(null);
  const synthRef = useRef(null);
  const questionTimeoutRef = useRef(null);

  const topics = [
    { id: 'algorithms', name: 'Data Structures & Algorithms', icon: '🧮', description: 'Arrays, trees, graphs, sorting, searching algorithms', color: '#FF6B6B' },
    { id: 'system-design', name: 'System Design', icon: '🏗️', description: 'Scalability, databases, microservices, architecture', color: '#4ECDC4' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨', description: 'ES6+, closures, async/await, event handling', color: '#45B7D1' },
    { id: 'react', name: 'React', icon: '⚛️', description: 'Hooks, state management, performance optimization', color: '#96CEB4' },
    { id: 'database', name: 'Database Design', icon: '🗃️', description: 'SQL, NoSQL, indexing, query optimization', color: '#FECA57' },
    { id: 'resume', name: 'Resume Based', icon: '📄', description: 'Experience-based questions about your projects', color: '#FF9FF3' },
    { id: 'behavioral', name: 'Behavioral Questions', icon: '🤝', description: 'Teamwork, leadership, problem-solving scenarios', color: '#54A0FF' },
    { id: 'networking', name: 'Computer Networks', icon: '🌐', description: 'Protocols, OSI model, security, performance', color: '#5F27CD' }
  ];

  const questionOptions = [
    { value: 3, label: '3 Questions', duration: '~10 mins', icon: '⚡' },
    { value: 5, label: '5 Questions', duration: '~15 mins', icon: '🎯' },
    { value: 7, label: '7 Questions', duration: '~20 mins', icon: '🚀' },
    { value: 10, label: '10 Questions', duration: '~30 mins', icon: '💪' }
  ];

  const difficultyOptions = [
    { value: 'easy', label: 'Easy', description: 'Perfect for beginners', icon: '🟢' },
    { value: 'medium', label: 'Medium', description: 'Good for mid-level developers', icon: '🟡' },
    { value: 'hard', label: 'Hard', description: 'Challenging for experts', icon: '🔴' },
    { value: 'mixed', label: 'Mixed', description: 'Progressive difficulty (Recommended)', icon: '🎨' }
  ];

  const getAIQuestionFromAPI = async () => {
    try {
      const previousQuestions = transcript
        .filter(item => item.type === 'question')
        .map(item => item.content);

      const response = await fetch('http://localhost:5000/api/interview/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic,
          questionNumber: questionNumber + 1, // Send the upcoming question number
          difficulty: interviewDifficulty,
          previousQuestions: previousQuestions
        })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log(`✅ AI Generated: ${data.difficulty} level question for ${data.topic}`);
        return data.question;
      } else {
        console.error('❌ API Error, using fallback:', data.error);
        return data.fallback || getFallbackQuestion(selectedTopic, questionNumber + 1);
      }
      
    } catch (error) {
      console.error('❌ Network Error, using fallback:', error);
      return getFallbackQuestion(selectedTopic, questionNumber + 1);
    }
  };

  const getFallbackQuestion = (topic, qNumber) => {
    const fallbackQuestions = {
      algorithms: "Can you explain how a binary search algorithm works and analyze its time complexity?",
      'system-design': "How would you design a URL shortening service like bit.ly?",
      javascript: "What is the difference between 'let', 'const', and 'var' in JavaScript?",
      react: "What are React Hooks and why were they introduced?",
      database: "What's the difference between SQL and NoSQL databases?",
      resume: "Tell me about a challenging project you've worked on recently.",
      behavioral: "Tell me about a time when you had to learn something completely new.",
      networking: "Explain the OSI model and its layers."
    };
    return fallbackQuestions[topic] || "Tell me about your experience with software development.";
  };

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsRecognitionSupported(true);
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      recognitionRef.current.onerror = (event) => console.error('Speech recognition error:', event.error);

      recognitionRef.current.onresult = (event) => {
        let finalTranscript = '';
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptPart;
          } else {
            interim += transcriptPart;
          }
        }
        setInterimTranscript(interim);
        if (finalTranscript) {
          setUserResponse(prev => prev + finalTranscript);
        }
      };
    } else {
      setIsRecognitionSupported(false);
    }

    synthRef.current = window.speechSynthesis;

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
      if (synthRef.current) synthRef.current.cancel();
      clearTimeout(questionTimeoutRef.current);
    };
  }, []);

  const proceedToSettings = () => {
    if (!selectedTopic) return;
    setShowTopicSelection(false);
    setShowQuestionSettings(true);
  };

  const startInterview = async () => {
    if (!selectedTopic || isResetting) return;
    
    setShowQuestionSettings(false);
    setInterviewStarted(true);
    
    const firstQuestion = await getAIQuestionFromAPI();
    setCurrentQuestion(firstQuestion);
    setQuestionNumber(1);
    speak(firstQuestion);
  };

  const speak = (text) => {
    if (isResetting || !synthRef.current) return;
    
    synthRef.current.cancel(); // Clear any previous speech
    setIsAISpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    
    utterance.onend = () => {
      setIsAISpeaking(false);
      if (!isResetting && interviewStarted && !interviewComplete) {
        startListening();
      }
    };
    
    synthRef.current.speak(utterance);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening && isRecognitionSupported && !isResetting) {
      setUserResponse('');
      setInterimTranscript('');
      try {
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  };

  const handleUserResponse = async () => {
    if (isResetting || isProcessing) return;
    
    stopListening();
    setIsProcessing(true);
    
    const finalResponse = userResponse || interimTranscript || "No response provided";

    const updatedTranscript = [
      ...transcript,
      { type: 'question', content: currentQuestion },
      { type: 'answer', content: finalResponse }
    ];
    setTranscript(updatedTranscript);
    setUserResponse('');
    setInterimTranscript('');
    
    if (questionNumber < totalQuestions) {
      const nextQuestion = await getAIQuestionFromAPI();
      setCurrentQuestion(nextQuestion);
      setQuestionNumber(prev => prev + 1);
      setIsProcessing(false);
      speak(nextQuestion);
    } else {
      completeInterview(updatedTranscript);
    }
  };

  const completeInterview = (finalTranscript) => {
    if (isResetting) return;
    
    setInterviewComplete(true);
    setIsProcessing(false);
    speak("Congratulations, you have completed the interview. You will now be taken to your detailed performance report.");
    
    const reportData = { transcript: finalTranscript, topic: selectedTopic };

    // Store data in sessionStorage to survive a page refresh
    try {
      sessionStorage.setItem('latestInterviewReport', JSON.stringify(reportData));
    } catch (e) {
      console.error("Could not save report to sessionStorage", e);
    }

    // Navigate to reports page after speech
    setTimeout(() => {
      onNavigate('reports', reportData);
    }, 4000);
  };

  const resetInterview = () => {
    console.log('🔄 Resetting interview...');
    setIsResetting(true);
    
    if (synthRef.current) synthRef.current.cancel();
    if (recognitionRef.current) recognitionRef.current.stop();
    clearTimeout(questionTimeoutRef.current);
    
    // Reset all state variables
    setShowTopicSelection(true);
    setShowQuestionSettings(false);
    setInterviewStarted(false);
    setInterviewComplete(false);
    setCurrentQuestion('');
    setUserResponse('');
    setInterimTranscript('');   
    setQuestionNumber(0);
    setTranscript([]);
    setSelectedTopic('');
    setFeedback('');
    setIsProcessing(false);
    setIsListening(false);
    setIsAISpeaking(false);
    setTotalQuestions(3);
    setInterviewDifficulty('mixed');
    
    setTimeout(() => {
      setIsResetting(false);
      console.log('✅ Interview reset complete');
    }, 100);
  };

  const skipQuestion = () => {
    if (!isResetting) {
      setUserResponse("Question skipped by user");
      handleUserResponse();
    }
  };

  // Topic Selection Screen
  if (showTopicSelection) {
    return (
      <div className="interview-container">
        <div className="interview-header">
          <button onClick={() => onNavigate('dashboard')} className="back-btn">← Back to Dashboard</button>
          <div className="header-content">
            <h1>AI Interview Practice</h1>
            <p>Choose your interview topic and customize your experience</p>
          </div>
          <div className="user-info"><span>👋 Hi, {user?.firstName || 'Guest'}!</span></div>
        </div>
        <div className="topic-selection">
          <div className="step-indicator">
            <div className="step active"><div className="step-number">1</div><span>Choose Topic</span></div>
            <div className="step-line"></div>
            <div className="step"><div className="step-number">2</div><span>Customize</span></div>
            <div className="step-line"></div>
            <div className="step"><div className="step-number">3</div><span>Interview</span></div>
          </div>
          <h2>Select Your Interview Topic</h2>
          <div className="topics-grid">
            {topics.map(topic => (
              <div key={topic.id} className={`topic-card ${selectedTopic === topic.id ? 'selected' : ''}`} onClick={() => setSelectedTopic(topic.id)} style={{ '--topic-color': topic.color }}>
                <div className="topic-header"><div className="topic-icon">{topic.icon}</div><div className="topic-badge">Popular</div></div>
                <div className="topic-content"><h3 className="topic-name">{topic.name}</h3><p className="topic-description">{topic.description}</p></div>
                <div className="topic-footer"><div className="difficulty-indicators"><span className="difficulty-dot easy"></span><span className="difficulty-dot medium"></span><span className="difficulty-dot hard"></span></div></div>
              </div>
            ))}
          </div>
          <div className="action-section">
            <button className={`next-step-btn ${!selectedTopic ? 'disabled' : ''}`} onClick={proceedToSettings} disabled={!selectedTopic}>Customize Interview →</button>
          </div>
        </div>
      </div>
    );
  }

  // Question Settings Screen
  if (showQuestionSettings) {
    const selectedTopicData = topics.find(t => t.id === selectedTopic);
    return (
      <div className="interview-container">
        <div className="interview-header">
          <button onClick={() => { setShowTopicSelection(true); setShowQuestionSettings(false); }} className="back-btn">← Back to Topics</button>
          <div className="header-content"><h1>🎛️ Customize Your Interview</h1><p>Tailor the experience to your preferences</p></div>
        </div>
        <div className="settings-container">
          <div className="step-indicator">
            <div className="step completed"><div className="step-number">✓</div><span>Choose Topic</span></div>
            <div className="step-line active"></div>
            <div className="step active"><div className="step-number">2</div><span>Customize</span></div>
            <div className="step-line"></div>
            <div className="step"><div className="step-number">3</div><span>Interview</span></div>
          </div>
          <div className="selected-topic-preview">
            <div className="topic-preview-card" style={{ '--topic-color': selectedTopicData?.color }}>
              <span className="topic-icon-large">{selectedTopicData?.icon}</span><h3>{selectedTopicData?.name}</h3><p>{selectedTopicData?.description}</p>
            </div>
          </div>
          <div className="settings-grid">
            <div className="setting-section">
              <h3>📊 Number of Questions</h3><p>Choose how many questions you want to practice</p>
              <div className="question-options">
                {questionOptions.map(option => (<div key={option.value} className={`question-option ${totalQuestions === option.value ? 'selected' : ''}`} onClick={() => setTotalQuestions(option.value)}><div className="option-icon">{option.icon}</div><div className="option-content"><span className="option-label">{option.label}</span><span className="option-duration">{option.duration}</span></div></div>))}
              </div>
            </div>
            <div className="setting-section">
              <h3>🎯 Difficulty Level</h3><p>Select the challenge level that matches your experience</p>
              <div className="difficulty-options">
                {difficultyOptions.map(option => (<div key={option.value} className={`difficulty-option ${interviewDifficulty === option.value ? 'selected' : ''}`} onClick={() => setInterviewDifficulty(option.value)}><div className="option-icon">{option.icon}</div><div className="option-content"><span className="option-label">{option.label}</span><span className="option-description">{option.description}</span></div></div>))}
              </div>
            </div>
          </div>
          <div className="settings-summary">
            <div className="summary-card">
              <h4>📋 Interview Summary</h4>
              <div className="summary-details">
                <div className="summary-item"><span className="summary-label">Topic:</span><span className="summary-value">{selectedTopicData?.name}</span></div>
                <div className="summary-item"><span className="summary-label">Questions:</span><span className="summary-value">{totalQuestions} questions</span></div>
                <div className="summary-item"><span className="summary-label">Difficulty:</span><span className="summary-value">{difficultyOptions.find(d => d.value === interviewDifficulty)?.label}</span></div>
                <div className="summary-item"><span className="summary-label">Duration:</span><span className="summary-value">{questionOptions.find(q => q.value === totalQuestions)?.duration}</span></div>
              </div>
            </div>
          </div>
          <div className="action-section">
            <button className="start-interview-btn" onClick={startInterview}>Start Interview 🚀</button>
          </div>
        </div>
      </div>
    );
  }

  // Main Interview Screen
  return (
    <div className="interview-container">
      <div className="interview-header">
        <button onClick={resetInterview} className="back-btn" disabled={isResetting}>{isResetting ? '🔄 Resetting...' : '← End & Change Settings'}</button>
        <div className="interview-progress">
          <div className="progress-text"><span>Question {questionNumber} of {totalQuestions}</span><span className="progress-percentage">{Math.round((questionNumber / totalQuestions) * 100)}%</span></div>
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}></div></div>
        </div>
        <div className="interview-timer"><span className="timer-label">Topic:</span><span className="timer-value">{topics.find(t => t.id === selectedTopic)?.name}</span></div>
      </div>
      <div className="interview-main">
        <div className="ai-section">
          <div className={`ai-avatar ${isAISpeaking ? 'speaking' : ''}`}><div className="avatar-face">🤖</div><div className="avatar-status">{isAISpeaking && (<div className="sound-waves"><div className="wave"></div><div className="wave"></div><div className="wave"></div></div>)}</div></div>
          <div className="question-display">
            <div className="question-header"><h3>AI Interviewer</h3><div className="question-meta"><span className="question-difficulty">{interviewDifficulty}</span><span className="question-topic">{selectedTopic}</span></div></div>
            <div className="question-content"><p className="current-question">{currentQuestion}</p>{isAISpeaking && (<div className="ai-status"><div className="typing-indicator"><span></span><span></span><span></span></div><span>AI is speaking...</span></div>)}</div>
          </div>
        </div>
        <div className="user-section">
          <div className="response-area">
            <div className="response-header"><h3>Your Response</h3><div className="response-tips"><span className="tip">💡 Tip: Explain your thinking process</span></div></div>
            {!isRecognitionSupported && (<div className="warning-message"><span className="warning-icon">⚠️</span> Speech recognition not supported. Please type your response.</div>)}
            <div className="microphone-container">
              <button className={`mic-button ${isListening ? 'listening' : ''} ${isProcessing ? 'processing' : ''}`} onClick={isListening ? stopListening : startListening} disabled={isAISpeaking || isProcessing || !isRecognitionSupported || isResetting}><div className="mic-icon">{isProcessing ? '⏳' : isListening ? '🔴' : '🎤'}</div><div className="mic-pulse"></div></button>
              <div className="mic-status"><div className="status-text">{isResetting ? 'Resetting...' : isProcessing ? 'Processing...' : isListening ? 'Listening...' : isAISpeaking ? 'AI is speaking...' : 'Click to speak'}</div>{isListening && (<div className="listening-animation"><div className="sound-bar"></div><div className="sound-bar"></div><div className="sound-bar"></div><div className="sound-bar"></div></div>)}</div>
            </div>
            <div className="user-response-display">
              <div className="response-content">
                <span className="response-text">{userResponse}</span>
                {interimTranscript && (<span className="interim-text">{interimTranscript}</span>)}
              </div>
            </div>
            <div className="manual-controls">
              <button onClick={handleUserResponse} className="control-btn primary" disabled={isProcessing || isAISpeaking || isResetting}>→ Submit & Next</button>
              <button onClick={skipQuestion} className="control-btn secondary" disabled={isProcessing || isAISpeaking || isResetting}>⏭️ Skip Question</button>
            </div>
            <div className="manual-input">
              <textarea value={userResponse} onChange={(e) => setUserResponse(e.target.value)} placeholder="Or, type your response here..." rows={4} disabled={isProcessing || isResetting || isListening} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPage;