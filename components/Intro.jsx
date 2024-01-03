import React from "react"

export default function Intro({ amount, handleChange, startQuiz }) {
    return (
        <div className="intro">
            <h1 className="title">Quizzical</h1>

            <p className="description">
                Answer
                <input
                    className="amount"
                    type="number"
                    value={amount}
                    onChange={handleChange}
                />
                easy general knowledge questions.
                <br />
                <span>Choose number of questions between 1-50.</span>
            </p>
            
            <button
                className="start-btn"
                onClick={startQuiz}
            >
                Start quiz
            </button>
        </div>
    )
}
