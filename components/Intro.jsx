import React from "react"

// Component about the quiz with a number of questions input and a start button
export default function Intro({ amount, handleChange, startQuiz }) {
    return (
        <div className="intro">
            <h1 className="title">Quizzical</h1>

            {/* Description paragraph with an input field, providing number of quiz questions */}
            <p className="description">
                Answer
                {/* Input field for selecting the number of questions, controlled by the "amount" prop */}
                <input
                    className="amount"
                    type="number"
                    value={amount}
                    onChange={handleChange}
                />
                easy general knowledge questions.
                <br />
                {/* Additional information about the number range for questions */}
                <span>Choose number of questions between 1-50.</span>
            </p>

            {/* Button to start the quiz, onClick event triggers the "startQuiz" function */}
            <button
                className="start-btn"
                onClick={startQuiz}
            >
                Start quiz
            </button>
        </div>
    )
}
