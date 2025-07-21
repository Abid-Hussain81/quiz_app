import React from "react"
import { useNavigate } from "react-router-dom";

const Start = ({ startQuiz,call }) => {


    const navigate = useNavigate();

    const handleStart = () =>{
        navigate("/quiz")
    }
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


            <div className="row g-5">
                <div className="col-6">
                    <div className="container mt-4">
                        <h1 className="fw-semibold " style={{ marginTop: "150px", marginLeft: "100px" }}>The Best Way to ShowCase Your Project</h1>

                        <p style={{ marginLeft: "100px" }}><strong>Here you can test your knowledge</strong></p>

                        <div className="text-center mt-5">
                            <h2 className="fw-bold" >{call}</h2>
                            <button className="btn btn-primary mt-3" onClick={handleStart}>Start Quiz</button>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx3IZ6itqYVoTPF2BMGVvZJC12nGUi4p-2CA&s" className="mt-5 ms-5" alt="Quiz Image" style={{ width: "500px" }} />
                </div>
            </div>

        </div>

    )
}

export default Start;