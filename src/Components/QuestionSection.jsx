import React, { useState, useEffect } from "react";
import './Question_data';

const QuestionSection = ({
    currentQuestion,
    questions,
    selectedOptions,
    handleOptionClick,
    handleSubmit,
    handlePrev,
    handleNext
}) => {
    const question = questions[currentQuestion];
    const selected = selectedOptions[currentQuestion];
    const isWrong = selected && selected !== question.answer;

    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        setShowAnswer(false);
    }, [currentQuestion]);

    return (
        <div className="card p-4">
            <h5>Q{currentQuestion + 1}: {question.question}</h5>
            <div className="d-grid gap-2 mt-3">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleOptionClick(currentQuestion, option)}
                        className={`btn ${selected === option
                            ? selected === question.answer
                                ? "btn-success"
                                : "btn-danger"
                            : "btn-outline-primary"
                        }`}
                        disabled={!!selected}
                    >
                        {option}
                    </button>
                ))}
            </div>

 
            {isWrong && !showAnswer && (
                <button
                    className="btn mt-3"
                    onClick={() => setShowAnswer(true)}
                >
                    Show Correct Answer
                </button>
            )}

  
            {showAnswer && (
                <div className="alert alert-info mt-3 fw-bold">
                     Correct Answer: {question.answer}
                </div>
            )}

            <div className="d-flex justify-content-between mt-4">
                <button
                    className="btn btn-secondary"
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                >
                    Previous
                </button>
                {currentQuestion < questions.length - 1 ? (
                    <button
                        className="btn btn-primary"
                        onClick={handleNext}
                        // disabled={!selected}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        className="btn btn-success"
                        onClick={handleSubmit}
                        // disabled={!selected}
                    >
                        Submit Quiz
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuestionSection;
