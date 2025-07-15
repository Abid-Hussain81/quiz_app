import React, { useState, useEffect, use } from "react";
import questions from "./Question_data";

const ScoreSection = ({score, totalScore, restartQuiz}) =>{


    const [previousScore, setPreviousScore] = useState(null);
    
    useEffect(() =>{
        const history = JSON.parse(localStorage.getItem("scoreHistory")) || []

        if (history.length >= 2) {
            setPreviousScore(history[history.length -2])
        }
    },[]);

 return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="card text-center shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
            <div className="card-body">
                <h2 className="card-title text-primary mb-3">
                     Your Score
                </h2>

                <h4 className="mb-3">
                    You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
                </h4>

                {previousScore ? (
                    <p className="text-muted">
                        Last attempt: <br />
                        {previousScore.score} / {previousScore.total} on <em>{previousScore.Date}</em>
                    </p>
                ) : (
                    <p className="text-warning">No previous data found</p>
                )}

                <button className="btn btn-success mt-3" onClick={restartQuiz}>
                     Restart Quiz
                </button>
            </div>
        </div>
    </div>
);

}
export default ScoreSection;