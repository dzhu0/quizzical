import React from "react"

export default function Intro(props) {
    return (
        <div className="intro">
            <h1 className="title">Quizzical</h1>
            <p className="description">
                Answer
                <input
                    className="amount"
                    type="number"
                    min={1}
                    max={50}
                    value={props.amount}
                    onChange={props.handleChange}
                />
                easy general knowledge questions.
                <br />
                <span>
                    Choose number of questions between 1-50.
                </span>
            </p>
            <button
                className="start-btn"
                onClick={props.toggleStart}
            >
                Start quiz
            </button>
        </div>
    )
}
