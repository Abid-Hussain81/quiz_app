import 'bootstrap/dist/css/bootstrap.min.css';
const ScoreReveal = ({ handleShowScore }) => {
    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-light rounded shadow p-5">
            <h2 className="mb-4 text-success fw-bold"> You have completed the quiz!</h2>
            <button onClick={handleShowScore} className="btn btn-primary btn-lg">
                Show Your Score
            </button>
        </div>
    );
};

export default ScoreReveal;
