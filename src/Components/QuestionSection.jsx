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

        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Quiz App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ "--bs-scroll-height": "100px" }}>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Link</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="d-flex justify-content-center">
                <div className="card mt-5 p-4" style={{ width: " 500px" }}>
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

                            >
                                Next
                            </button>
                        ) : (
                            <button
                                className="btn btn-success"
                                onClick={handleSubmit}
                            >
                                Submit Quiz
                            </button>
                        )}
                    </div>
                </div>
            </div>

        </div>


    );
};

export default QuestionSection;
