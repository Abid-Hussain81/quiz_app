import React, { useState, useEffect, use } from "react";
import questions from "./Question_data";
import attemptResult from "./attemptResult";

const ScoreSection = ({ score, totalScore, restartQuiz, timeTaken, attempt }) => {


    const [previousScore, setPreviousScore] = useState(null);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem("scoreHistory")) || []

        if (history.length >= 2) {
            setPreviousScore(history[history.length - 2])
        }
    }, []);

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
            <div className="card text-center shadow p-4" style={{ maxWidth: "500px", width: "100%" }}>
                <div className="card-body">
                    <h2 className="card-title text-primary mb-3">
                        Your Score
                    </h2>

                    {timeTaken !== null && (<h4 className="text-muted"> You took {timeTaken} seconds</h4>)}


                    <h4 className="mb-3">
                        You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
                    </h4>

                    {previousScore ? (
                        <p className="text-muted">
                            Last attempt: <br />
                            {previousScore.score}  Out of {previousScore.total} on {previousScore.Date}<br />
                            Previous Time Taken {previousScore.timeTaken}
                        </p>
                    ) : (
                        <p className="text-warning">No previous data found</p>
                    )}

                    <div className="d-flex align-items-center justify-content-between">
                        <button className="btn btn-success mt-3" onClick={restartQuiz}>
                            Restart Quiz
                        </button>
                        <button className="btn btn-danger mt-3" onClick={attemptResult}>
                            View Results
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default ScoreSection;