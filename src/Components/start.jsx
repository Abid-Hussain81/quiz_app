import React from "react"


const Start = ({ startQuiz }) => {
    return (
        <div className="text-center mt-5">
            <h2 className="fw-bold">Ready to start the Quiz?</h2>
            <button className="btn btn-primary mt-3" onClick={startQuiz}>Start Quiz</button>
        </div>
    )
}

export default Start;