import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import questions from "./Question_data";
import ScoreSection from "./ScoreSection";
import QuestionSection from "./QuestionSection";
import Start from "./start";

const Quiz = () => {
    const questionDuration = 10; // seconds per question

    const [timeLeft, setTimeLeft] = useState(questionDuration);
    const [started, setStarted] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectOption, setSelectOption] = useState({});
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    // Separate flag to avoid double auto next
    const [questionExpired, setQuestionExpired] = useState(false);

    // ⏳ Timer logic
    useEffect(() => {
        if (!started || showScore) return;

        setTimeLeft(questionDuration);
        setQuestionExpired(false);

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setQuestionExpired(true); // trigger next step
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestion, started, showScore]);

    // Auto move to next question on timeout
    useEffect(() => {
        if (questionExpired) {
            if (currentQuestion < questions.length - 1) {
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
                total: questions.length,
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
        questions.forEach((q, index) => {
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
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
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
                <Start startQuiz={() => {
                    setStarted(true);
                    setStartTime(new Date());
                }} call ="Ready to Start The Quiz"/>
            ) : showScore ? (
                <ScoreSection
                    score={score}
                    totalScore={questions.length}
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
                        questions={questions}
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
