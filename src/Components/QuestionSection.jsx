import React from "react";

const QuestionSection = ({
  questions,
  currentQuestion,
  selectedOptions,
  handleOptionClick,
  handleSubmit,
  handleNext,
  handlePrev
}) => {
  const q = questions[currentQuestion];
  const isAnswered = selectedOptions[currentQuestion] !== undefined;

  return (
    <div className="container py-5">
      <h3 className="mb-4 text-center">Answer This Question</h3>
      <div className="card shadow-sm p-3">
        <h5 className="mb-3 text-start">
          <strong>Q{currentQuestion + 1}:</strong> {q.question}
        </h5>
        <div className="d-flex flex-wrap gap-2">
          {q.options.map((option, optIndex) => (
            <button
              key={optIndex}
              className={`btn ${
                selectedOptions[currentQuestion] === option
                  ? "btn-success"
                  : "btn-outline-primary"
              }`}
              onClick={() => handleOptionClick(currentQuestion, option)}
              disabled={isAnswered} // 👈 Lock after selection
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button
          className="btn btn-secondary"
          onClick={handlePrev}
          disabled={currentQuestion === 0 || isAnswered} // 👈 Disable if already answered
        >
          Previous
        </button>

        {currentQuestion === questions.length - 1 ? (
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!isAnswered}
          >
            Submit Quiz
          </button>
        ) : (
          <button
            className="btn btn-primary"
            onClick={handleNext}
            // 👈 Force answering before moving on
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionSection;
