
const ScoreReveal = ({ handleShowScore }) => {
    return (
        <div className="score-reveal-section">
            <h2>You have completed the quiz!!!</h2>
            <button onClick={handleShowScore}>Show Score</button>
        </div>
    );
};
export default ScoreReveal;