import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import questions from "./Question_data";
import ScoreSection from "./ScoreSection";
import ScoreReveal from "./ScoreReveal";
import QuestionSection from "./QuestionSection";
import Start from "./start";

const Quiz = () => {

    const quiz_duration = 30000;

    const [timeLeft, setTimeLeft] = useState(quiz_duration / 1000); 

    const [started, setStarted] = useState(false);
    const [quizTimeOver, setQuizTimeOver] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectOption, setSelectOption] = useState({});
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null)



    // Auto-submit quiz when time is up


    useEffect(() => {
        let countdown;

        if (started && !showScore) {
            countdown = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(countdown);

                        // Auto-submit when timer hits 0
                        let newScore = 0;
                        questions.forEach((q, index) => {
                            if (selectOption[index] === q.answer) {
                                newScore++;
                            }
                        });

                        setScore(newScore);
                        setEndTime(new Date());
                        setShowScore(true);
                        setQuizTimeOver(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(countdown);
    }, [started, showScore, selectOption]); // include selectOption here



    // Save score + history to localStorage
    useEffect(() => {
        if (showScore && startTime && endTime) {
            const start = new Date(startTime);
            const end = new Date(endTime);
            const timeTakenSeconds = Math.round((end - start) / 1000); //  in seconds

            const newEntry = {
                score,
                total: questions.length,
                Date: end.toLocaleString(),
                timeTaken: `${timeTakenSeconds} seconds`
            };

            localStorage.setItem('score', JSON.stringify(newEntry));

            const previousResults = JSON.parse(localStorage.getItem("scoreHistory")) || [];
            localStorage.setItem("scoreHistory", JSON.stringify([...previousResults, newEntry]));
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
        setScore(newScore);
        setEndTime(new Date());
        setShowScore(true);
        alert("Do you want to submit Quiz")
    };

    const restartQuiz = () => {
        setStarted(false);
        setQuizTimeOver(false);
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setQuizFinished(false);
        setSelectOption({});
    };


    const attempt = () =>{
        results = [...questions]
    }

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
        <div className="container mt-4" >
            {!started ? (
                <Start startQuiz={() => {
                    setStarted(true);
                    setTimeLeft(quiz_duration / 1000); // Reset time ONCE when starting
                    setStartTime(new Date());
                }} />

            ) : showScore ? (
                <ScoreSection
                    score={score}
                    total={questions.length}
                    restartQuiz={restartQuiz}
                    timeTaken={endTime && startTime ? Math.round((endTime - startTime) / 1000) : null}
                />
            ) : (
                <>
                    <div
                        className="alert  text-center fw-bold"
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "25%",
                            zIndex: 1050,
                            backgroundColor: "#fff",
                            padding: "10px",

                        }}
                    >
                        Time Left: {timeLeft} second
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
