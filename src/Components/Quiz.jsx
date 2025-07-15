import { useState, useEffect, use } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import questions from "./Question_data";
import ScoreSection from "./ScoreSection";
import ScoreReveal from "./ScoreReveal";
import QuestionSection from "./QuestionSection";


const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectOption, setSelectOption] = useState({});
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false)
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        if (showScore) {
            localStorage.setItem('score', JSON.stringify({ score, total: questions.length, Date: new Date().toLocaleString() }));
        }
    }, [showScore, score]);


   useEffect(() => {
  if (showScore) {
    const previousResults = JSON.parse(localStorage.getItem("scoreHistory")) || [];

    const newEntry = {
      score,
      total: questions.length,
      Date: new Date().toLocaleString(),
    };

    localStorage.setItem("scoreHistory", JSON.stringify([...previousResults, newEntry]));
  }
}, [showScore, score]);



    const handleOptionClick = (questionIndex, option) => {
        setSelectOption(prev => ({ ...prev, [questionIndex]: option }));
    }

    const handleSubmit = () => {
        let newScore = 0
        questions.forEach((q, index) => {
            if (selectOption[index] === q.answer) {
                newScore++;
            }
        })
        setScore(newScore);
        setShowScore(true)
    }
    const restartQuiz = ({ }) => {
        setCurrentQuestion(0);
        setScore(0)
        setShowScore(false);
        setQuizFinished(false);
        setSelectOption('');
    }
    return (
        <div className="container">
            {showScore ?
                (<ScoreSection score={score} total={questions.length} restartQuiz={restartQuiz} />) : quizFinished ? (<ScoreReveal handleShowScore={handleShowScore} />) :
                    (
                        <QuestionSection currentQuestion={currentQuestion}
                            questions={questions}
                            selectedOptions={selectOption}
                            handleOptionClick={handleOptionClick}
                            handleSubmit={handleSubmit}

                        />
                    )}
        </div>
    )
}
export default Quiz;