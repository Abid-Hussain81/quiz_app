import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import questions from "./Question_data";
import ScoreSection from "./ScoreSection";
import QuestionSection from "./QuestionSection";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
    const questionDuration = 10;

    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedOptions, setSelectOption] = useState({});
    const [timeLeft, setTimeLeft] = useState(questionDuration);
    const [questionExpired, setQuestionExpired] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [questionTimers, setQuestionTimers] = useState({});

    const navigate = useNavigate();

    // Start quiz by shuffling questions and setting start time
    const startQuiz = () => {
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        setShuffledQuestions(shuffled);
        setStartTime(new Date());
    };

    // Track time for each question
    useEffect(() => {
        if (showScore) return;

        setTimeLeft(questionTimers[currentQuestion] || questionDuration);
        setQuestionExpired(false);

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setQuestionExpired(true);
                    return 0;
                }

                setQuestionTimers(timers => ({
                    ...timers,
                    [currentQuestion]: prev - 1
                }));
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestion, showScore]);

    // Handle answer selection
    const handleOptionClick = (questionIndex, option) => {
        if (selectedOptions[questionIndex]) return;

        const correct = shuffledQuestions[questionIndex].answer;
        if (option === correct) setScore(score + 1);

        setSelectOption({ ...selectedOptions, [questionIndex]: option });
    };

    // Go to next question
    const handleNext = () => {
        if (currentQuestion < shuffledQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    // Go to previous question
    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    // Submit quiz
    const handleSubmit = () => {
        setEndTime(new Date());
        setShowScore(true);
    };

    // Restart quiz
    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectOption({});
        setTimeLeft(questionDuration);
        setStartTime(null);
        setEndTime(null);
        setQuestionTimers({});
        startQuiz(); // restart logic
    };

    useEffect(() => {
        startQuiz();
    }, []);

    return (
        <div className="mb-5">
            {showScore ? (
                <ScoreSection
                    score={score}
                    totalQuestions={shuffledQuestions.length}
                    restartQuiz={restartQuiz}
                    startTime={startTime}
                    endTime={endTime}
                />
            ) : (
                shuffledQuestions.length > 0 && (
                    <QuestionSection
                        currentQuestion={currentQuestion}
                        questions={shuffledQuestions}
                        selectedOptions={selectedOptions}
                        handleOptionClick={handleOptionClick}
                        handleSubmit={handleSubmit}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        timeLeft={timeLeft}
                        questionExpired={questionExpired}
                    />
                )
            )}
        </div>
    );
};

export default Quiz;
