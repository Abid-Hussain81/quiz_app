import React from "react";
import './Question_data';

const QuestionSection = ({
     questions, selectedOptions, handleOptionClick,
    handleSubmit
}) => {
    return (
    <div className="container py-5">
      <h3 className="mb-4 text-center"> Answer These Questions</h3>
      <div className="row">
        {questions.map((q, index) => (
          <div className="col-12 mb-4" key={index}>
            <div className="card shadow-sm p-3">
              <h5 className="mb-3 text-start">
                <strong>Q{index + 1}:</strong> {q.question}
              </h5>
              <div className="d-flex flex-wrap gap-2">
                {q.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    className="btn btn-outline-primary"
                    onClick={() => handleOptionClick(index, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <button
          className="btn btn-lg btn-primary"
          onClick={handleSubmit}
          disabled={
            Object.keys(selectedOptions).length !== questions.length
          }
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
}
export default QuestionSection;
