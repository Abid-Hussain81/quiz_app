import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import questions from "./Question_data";
import ScoreSection from "./ScoreSection";
import QuestionSection from "./QuestionSection";
import Start from "./start";

const Quiz = () => {
    const questionDuration = 10;

    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectOption, setSelectOption] = useState({});
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [questionExpired, setQuestionExpired] = useState(false);
    const [shuffledQuestions, setShuffledQuestions] = useState([]);
    const [questionTimers, setQuestionTimers] = useState({}); // 💡 time left per question
    const [timeLeft, setTimeLeft] = useState(questionDuration);

    const shuffleArray = (arr) => {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const startQuiz = () => {
        const shuffled = questions.map(q => ({
            ...q,
            options: shuffleArray(q.options),
        }));
        setShuffledQuestions(shuffled);

        const initialTimers = {};
        for (let i = 0; i < shuffled.length; i++) {
            initialTimers[i] = questionDuration;
        }
        setQuestionTimers(initialTimers);

        setStarted(true);
        setStartTime(new Date());
    };

    useEffect(() => {
        if (!started || showScore) return;

        setTimeLeft(questionTimers[currentQuestion]);
        setQuestionExpired(false);

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setQuestionExpired(true);
                    return 0;
                }

                // ⏱️ update the timer only for this question
                setQuestionTimers(timers => ({
                    ...timers,
                    [currentQuestion]: prev - 1
                }));
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestion, started, showScore]);

    useEffect(() => {
        if (questionExpired) {
            if (currentQuestion < shuffledQuestions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
            } else {
                handleSubmit();
            }
        }
    }, [questionExpired]);

    useEffect(() => {
        if (showScore && startTime && endTime) {
            const timeTaken = Math.round((endTime - startTime) / 1000);
            const result = {
                score,
                total: shuffledQuestions.length,
                Date: endTime.toLocaleString(),
                timeTaken: `${timeTaken} seconds`
            };

            localStorage.setItem("score", JSON.stringify(result));
            const history = JSON.parse(localStorage.getItem("scoreHistory")) || [];
            localStorage.setItem("scoreHistory", JSON.stringify([...history, result]));
        }
    }, [showScore, score, endTime]);

    const handleOptionClick = (questionIndex, option) => {
        setSelectOption(prev => ({ ...prev, [questionIndex]: option }));
    };

    const handleSubmit = () => {
        let newScore = 0;
        shuffledQuestions.forEach((q, index) => {
            if (selectOption[index] === q.answer) {
                newScore++;
            }
        });

        localStorage.setItem("selectedOption", JSON.stringify(selectOption));
        setScore(newScore);
        setEndTime(new Date());
        setShowScore(true);
    };

    const restartQuiz = () => {
        setStarted(false);
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setSelectOption({});
        setTimeLeft(questionDuration);
        setStartTime(null);
        setEndTime(null);
        setQuestionTimers({});
    };

    const handleNext = () => {
        if (currentQuestion < shuffledQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <div className="container mt-4">
            {!started ? (
                <Start startQuiz={startQuiz} call="Ready to Start The Quiz" />
            ) : showScore ? (
                <ScoreSection
                    score={score}
                    totalScore={shuffledQuestions.length}
                    restartQuiz={restartQuiz}
                    timeTaken={endTime && startTime ? Math.round((endTime - startTime) / 1000) : null}
                />
            ) : (
                <>
                    <div
                        className="alert text-center fw-bold"
                        style={{
                            backgroundColor: "#e9f5ff",
                            color: "#000",
                        }}
                    >
                        Time Left: {timeLeft} seconds
                    </div>

                    <QuestionSection
                        currentQuestion={currentQuestion}
                        questions={shuffledQuestions}
                        selectedOptions={selectOption}
                        handleOptionClick={handleOptionClick}
                        handleSubmit={handleSubmit}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                    />
                </>
            )}
        </div>
    );
};

export default Quiz;
