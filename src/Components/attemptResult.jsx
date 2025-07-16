import React from "react";
import { useState, useEffect } from "react";
import questions from "./Question_data";

const AttemptResult = () => {


    const [selectedOptions, setSelectOption] = useState({})

    useEffect(() => {
        const storedOptions = JSON.parse(localStorage.getItem("selectedOptions")) || {};
        setSelectOption(storedOptions)
    }, []);


    const AttemptResult = () => {
    const [selectedOptions, setSelectedOptions] = useState({});
    const navigate = useNavigate();

    return (
        <div className="container my-5">
            <h2 className="text-center fw-semibold">Check your marked question</h2>

            {questions.map((q, index) => {
                const userAnswer = selectedOptions[index];
                const isCorrect = userAnswer === q.answer;
                return (
                    <div key={index} className={`card mb-3 ${isCorrect ? "border-success" : "border-danger"}`}>
                        <div className="card-body">
                            <h5 className="card-title"> {index + 1}. {q.question}</h5>
                            <ul className="list-group">
                                {q.options.map((opt, i) => (
                                    <li
                                        key={i}
                                        className={`list-group-item 
                                            ${opt === q.answer ? 'list-group-item-success' : ''}
                                            ${opt === userAnswer && opt !== q.answer ? 'list-group-item-danger' : ''}
                                        `}
                                    >
                                        {opt}
                                        {opt === q.answer && <span className="badge bg-success ms-2">Correct</span>}
                                        {opt === userAnswer && opt !== q.answer && <span className="badge bg-danger ms-2">Your Answer</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )
            })}
            <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={() => navigate("/")}>
                    Back to Quiz
                </button>
            </div>

        </div>
    )
}
export default AttemptResult;