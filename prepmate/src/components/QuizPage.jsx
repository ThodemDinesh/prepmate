import React, { useState, useEffect } from 'react';
import '../styles/QuizPage.css';

const QuizPage = ({ user, onNavigate, onLogout }) => {
  const [currentView, setCurrentView] = useState('setup'); // 'setup', 'quiz', 'results'
  const [quizConfig, setQuizConfig] = useState({
    subject: '',
    numQuestions: 10,
    difficulty: 'medium'
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [quizResults, setQuizResults] = useState(null);

  const subjects = [
    { id: 'os', name: 'Operating Systems', icon: '💻' },
    { id: 'cn', name: 'Computer Networks', icon: '🌐' },
    { id: 'oops', name: 'Object Oriented Programming', icon: '🎯' },
    { id: 'dbms', name: 'Database Management', icon: '🗃️' },
    { id: 'system-design', name: 'System Design', icon: '🏗️' },
    { id: 'algorithms', name: 'Data Structures & Algorithms', icon: '🧮' },
    { id: 'javascript', name: 'JavaScript', icon: '🟨' },
    { id: 'react', name: 'React', icon: '⚛️' }
  ];

  const difficulties = [
    { id: 'easy', name: 'Easy', color: '#10b981' },
    { id: 'medium', name: 'Medium', color: '#f59e0b' },
    { id: 'hard', name: 'Hard', color: '#ef4444' }
  ];

  // Generate AI questions
  const generateQuestions = async () => {
    setIsLoading(true);
    setLoadingMessage('Generating AI-powered questions...');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/quiz/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          subject: quizConfig.subject,
          numQuestions: quizConfig.numQuestions,
          difficulty: quizConfig.difficulty
        })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log(`Generated ${data.questions.length} questions, expected ${quizConfig.numQuestions}`);
        setQuestions(data.questions);
        setCurrentView('quiz');
        setCurrentQuestionIndex(0);
        setUserAnswers([]);
        setSelectedAnswer('');
        setShowFeedback(false);
      } else {
        alert('Failed to generate questions. Please try again.');
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Error generating questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  // Submit answer and show feedback
  const submitAnswer = () => {
    if (!selectedAnswer) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    const answerData = {
      questionIndex: currentQuestionIndex,
      selectedAnswer,
      isCorrect,
      question: currentQuestion
    };
    
    // Add to userAnswers immediately and update state
    const updatedAnswers = [...userAnswers, answerData];
    setUserAnswers(updatedAnswers);
    setShowFeedback(true);
    
    console.log(`Question ${currentQuestionIndex + 1}: Selected "${selectedAnswer}", Correct: "${currentQuestion.correctAnswer}", Is Correct: ${isCorrect}`);
    console.log(`Total answers so far: ${updatedAnswers.length}`);
  };

  // Move to next question
  const nextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer('');
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed - calculate results
      calculateResults();
    }
  };

  // Calculate quiz results properly
  const calculateResults = () => {
    const totalQuestions = questions.length;
    
    // Count correct answers from userAnswers only (no double counting)
    const correctAnswersCount = userAnswers.filter(answer => answer.isCorrect).length;
    const wrongAnswersCount = totalQuestions - correctAnswersCount;
    
    // Calculate percentage (ensure it's between 0-100)
    const score = Math.round((correctAnswersCount / totalQuestions) * 100);
    
    console.log('=== QUIZ RESULTS CALCULATION ===');
    console.log(`Total Questions: ${totalQuestions}`);
    console.log(`User Answers Count: ${userAnswers.length}`);
    console.log(`Correct Answers: ${correctAnswersCount}`);
    console.log(`Wrong Answers: ${wrongAnswersCount}`);
    console.log(`Score: ${score}%`);
    
    // Detailed answer log for debugging
    userAnswers.forEach((answer, index) => {
      console.log(`Q${index + 1}: ${answer.isCorrect ? 'CORRECT' : 'WRONG'} - Selected: "${answer.selectedAnswer}", Correct: "${answer.question.correctAnswer}"`);
    });
    
    // Validation checks
    if (userAnswers.length !== totalQuestions) {
      console.error(`ERROR: Answer count mismatch! Expected ${totalQuestions}, got ${userAnswers.length}`);
    }
    
    if (correctAnswersCount > totalQuestions) {
      console.error(`ERROR: Correct answers (${correctAnswersCount}) cannot exceed total questions (${totalQuestions})`);
    }
    
    const results = {
      totalQuestions,
      correctAnswers: correctAnswersCount,
      wrongAnswers: wrongAnswersCount,
      score: Math.min(score, 100), // Ensure score never exceeds 100%
      answers: userAnswers // Use the existing userAnswers array
    };
    
    setQuizResults(results);
    setCurrentView('results');
    
    // Save quiz session
    saveQuizSession(results);
  };

  // Save quiz session to database
  const saveQuizSession = async (results) => {
    try {
      const token = localStorage.getItem('token');
      
      console.log('Saving quiz session:', {
        type: 'Quiz',
        topic: quizConfig.subject,
        score: results.score,
        metadata: {
          totalQuestions: results.totalQuestions,
          correctAnswers: results.correctAnswers,
          difficulty: quizConfig.difficulty,
          subject: quizConfig.subject
        }
      });
      
      await fetch('http://localhost:5000/api/session/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: 'Quiz',
          topic: quizConfig.subject,
          score: results.score,
          duration: 0, // You can track time if needed
          metadata: {
            totalQuestions: results.totalQuestions,
            correctAnswers: results.correctAnswers,
            difficulty: quizConfig.difficulty,
            subject: quizConfig.subject
          }
        })
      });
    } catch (error) {
      console.error('Error saving quiz session:', error);
    }
  };

  // Start new quiz
  const startNewQuiz = () => {
    setCurrentView('setup');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer('');
    setShowFeedback(false);
    setQuizResults(null);
  };

  // Handle leaving quiz with confirmation
  const handleLeaveQuiz = () => {
    const sure = window.confirm(
      "Are you sure you want to leave the quiz? Your progress will be lost and cannot be recovered."
    );
    if (sure) {
      startNewQuiz(); // Reset quiz state
      onNavigate('dashboard'); // Navigate back to dashboard
    }
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  return (
    <div className="quiz-page">
      {/* Header */}
      <header className="quiz-header">
        <div className="header-left">
          <h1>📝 <span className="gradient-text">AI Quiz Practice</span></h1>
          <p>Master your skills with intelligent questions</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              {user.firstName?.charAt(0) || 'U'}{user.lastName?.charAt(0) || 'S'}
            </div>
            <span>Hi, {user.firstName}!</span>
          </div>
          <button className="logout-btn" onClick={onLogout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12L16 7M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </header>

      <main className="quiz-main">
        {/* Loading State */}
        {isLoading && (
          <div className="loading-container">
            <div className="loader-animation">
              <div className="spinner"></div>
              <h2>{loadingMessage}</h2>
              <p>This might take a moment...</p>
            </div>
          </div>
        )}

        {/* Quiz Setup */}
        {currentView === 'setup' && !isLoading && (
          <div className="quiz-setup">
            <div className="setup-container">
              <h2>🎯 Configure Your Practice Quiz</h2>
              <p>Choose your subject, difficulty, and number of questions</p>

              {/* Subject Selection */}
              <div className="config-section">
                <h3>📚 Select Subject</h3>
                <div className="subjects-grid">
                  {subjects.map(subject => (
                    <div
                      key={subject.id}
                      className={`subject-card ${quizConfig.subject === subject.id ? 'selected' : ''}`}
                      onClick={() => setQuizConfig({...quizConfig, subject: subject.id})}
                    >
                      <div className="subject-icon">{subject.icon}</div>
                      <div className="subject-name">{subject.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Difficulty Selection */}
              <div className="config-section">
                <h3>⚡ Difficulty Level</h3>
                <div className="difficulty-options">
                  {difficulties.map(diff => (
                    <button
                      key={diff.id}
                      className={`difficulty-btn ${quizConfig.difficulty === diff.id ? 'selected' : ''}`}
                      style={{'--diff-color': diff.color}}
                      onClick={() => setQuizConfig({...quizConfig, difficulty: diff.id})}
                    >
                      {diff.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Questions */}
              <div className="config-section">
                <h3>🔢 Number of Questions</h3>
                <div className="question-count">
                  <button 
                    onClick={() => setQuizConfig({...quizConfig, numQuestions: Math.max(5, quizConfig.numQuestions - 5)})}
                    className="count-btn"
                  >
                    -
                  </button>
                  <span className="count-display">{quizConfig.numQuestions}</span>
                  <button 
                    onClick={() => setQuizConfig({...quizConfig, numQuestions: Math.min(50, quizConfig.numQuestions + 5)})}
                    className="count-btn"
                  >
                    +
                  </button>
                </div>
                <p className="count-info">Choose between 5-50 questions</p>
              </div>

              {/* Start Quiz Button */}
              <div className="setup-actions">
                <button 
                  className="start-quiz-btn"
                  onClick={generateQuestions}
                  disabled={!quizConfig.subject}
                >
                  🚀 Start Practice Quiz
                </button>
                <button 
                  className="back-btn"
                  onClick={() => onNavigate('dashboard')}
                >
                  ← Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Questions */}
        {currentView === 'quiz' && currentQuestion && (
          <div className="quiz-container">
            {/* Progress Bar */}
            <div className="quiz-progress">
              <div className="progress-info">
                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${progress}%`}}></div>
              </div>
            </div>

            {/* Leave Quiz Button */}
            <div className="quiz-navigation">
              <button
                className="leave-quiz-btn"
                onClick={handleLeaveQuiz}
                title="Leave quiz and return to dashboard"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Leave Quiz
              </button>
            </div>

            {/* Question Card */}
            <div className="question-card">
              <div className="question-header">
                <div className="question-subject">
                  {subjects.find(s => s.id === quizConfig.subject)?.icon} {subjects.find(s => s.id === quizConfig.subject)?.name}
                </div>
                <div className={`question-difficulty ${quizConfig.difficulty}`}>
                  {quizConfig.difficulty.toUpperCase()}
                </div>
              </div>

              <h3 className="question-text">{currentQuestion.question}</h3>

              {/* Answer Options */}
              <div className="answer-options">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className={`answer-option ${selectedAnswer === option ? 'selected' : ''} ${
                      showFeedback ? (option === currentQuestion.correctAnswer ? 'correct' : 
                      selectedAnswer === option ? 'wrong' : '') : ''
                    }`}
                    onClick={() => !showFeedback && handleAnswerSelect(option)}
                    disabled={showFeedback}
                  >
                    <div className="option-letter">{String.fromCharCode(65 + index)}</div>
                    <div className="option-text">{option}</div>
                    {showFeedback && option === currentQuestion.correctAnswer && (
                      <div className="option-icon">✓</div>
                    )}
                    {showFeedback && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                      <div className="option-icon">✗</div>
                    )}
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className="answer-feedback">
                  <div className={`feedback-header ${selectedAnswer === currentQuestion.correctAnswer ? 'correct' : 'wrong'}`}>
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <>🎉 Correct! Well done!</>
                    ) : (
                      <>❌ Incorrect. The correct answer is "{currentQuestion.correctAnswer}"</>
                    )}
                  </div>
                  <div className="feedback-explanation">
                    <strong>Explanation:</strong>
                    <p>{currentQuestion.explanation}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="question-actions">
                {!showFeedback ? (
                  <button 
                    className="submit-btn"
                    onClick={submitAnswer}
                    disabled={!selectedAnswer}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button 
                    className="next-btn"
                    onClick={nextQuestion}
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'View Results →'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quiz Results */}
        {currentView === 'results' && quizResults && (
          <div className="quiz-results">
            <div className="results-container">
              <div className="results-header">
                <h2>🎊 Quiz Completed!</h2>
                <div className="score-circle" style={{'--score': quizResults.score}}>
                  <div className="score-value">{quizResults.score}%</div>
                  <div className="score-label">Score</div>
                </div>
              </div>

              <div className="results-stats">
                <div className="stat-item">
                  <div className="stat-value">{quizResults.correctAnswers}</div>
                  <div className="stat-label">Correct</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{quizResults.wrongAnswers}</div>
                  <div className="stat-label">Wrong</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{quizResults.totalQuestions}</div>
                  <div className="stat-label">Total</div>
                </div>
              </div>

              <div className="results-actions">
                <button className="new-quiz-btn" onClick={startNewQuiz}>
                  📝 Take Another Quiz
                </button>
                <button className="dashboard-btn" onClick={() => onNavigate('dashboard')}>
                  📊 Back to Dashboard
                </button>
              </div>

              {/* Performance Message */}
              <div className="performance-message">
                {quizResults.score >= 80 ? (
                  <p>🏆 Excellent work! You have a strong grasp of {subjects.find(s => s.id === quizConfig.subject)?.name}.</p>
                ) : quizResults.score >= 60 ? (
                  <p>👍 Good job! Keep practicing to improve your {subjects.find(s => s.id === quizConfig.subject)?.name} skills.</p>
                ) : (
                  <p>📚 Keep studying! Focus on the fundamentals of {subjects.find(s => s.id === quizConfig.subject)?.name}.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizPage;
