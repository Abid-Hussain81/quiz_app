import React, { useState, useEffect } from "react";
import questions from "./Question_data";
import { useNavigate } from "react-router-dom";


const AttemptResult = () => {
    const navigate = useNavigate()
    const [selectedOptions, setSelectedOptions] = useState({});

    const BackToStart = () =>{
        navigate("/")
    }

    useEffect(() => {
        const storedOptions = JSON.parse(localStorage.getItem("selectedOption"));
        if (storedOptions) {
            setSelectedOptions(storedOptions);
        }
    }, []);

    return (
        <div className="container my-5">
            <h2 className="text-center fw-semibold mb-4">Check Your Marked Questions</h2>
            {questions.map((q, index) => {
                const userAnswer = selectedOptions[index];
                const isCorrect = userAnswer === q.answer;

                return (
                    <div
                        key={index}
                        className={`card mb-3 ${userAnswer ? (isCorrect ? "border-success" : "border-danger") : "border-warning"}`}
                    >
                        <div className="card-body">
                            <h5 className="card-title">{index + 1}. {q.question}</h5>
                            <ul className="list-group">
                                {q.options.map((opt, i) => {
                                    const isCorrectOption = opt === q.answer;
                                    const isUserAnswer = opt === userAnswer;

                                    return (
                                        <li
                                            key={i}
                                            className={`list-group-item d-flex justify-content-between align-items-center
                                                ${isCorrectOption ? "list-group-item-success" : ""}
                                                ${isUserAnswer && !isCorrectOption ? "list-group-item-danger" : ""}
                                            `}
                                        >
                                            {opt}
                                            <div>
                                                {isCorrectOption && <span className="badge bg-success ms-2">Correct</span>}
                                                {isUserAnswer && !isCorrectOption && (
                                                    <span className="badge bg-danger ms-2">Your Answer</span>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}

                                {userAnswer === undefined && (
                                    <li className="list-group-item text-warning">
                                        You did not answer this question
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                );
            })}
            <button className="btn btn-primary" onClick={BackToStart}>ReTake Quiz</button>

        </div>
    );
};

export default AttemptResult;
