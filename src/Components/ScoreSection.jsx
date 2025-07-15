import React, { useState, useEffect, use } from "react";
import questions from "./Question_data";

const ScoreSection = ({score, totalScore, restartQuiz}) =>{


    const [previousScore, setPreviousScore] = useState(null);
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('score'));
        if(stored) {
            setPreviousScore(stored); }
    }, []);

    return(
        <div className="scoreSection">
            <h2>Your marks are {score} out of {questions.length}</h2>
            {previousScore ? (
                <h3>Your Previous marks were {previousScore.score} out of {previousScore.total} on{previousScore.Date}</h3>
            ) : (<p>No previous data found</p>)}
            
            <button onClick={restartQuiz}>Restart Quiz</button>
        </div>
    )
}
export default ScoreSection;