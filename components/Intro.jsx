import React from "react"

export default function Intro(props) {
    return (
        <div className="intro">
            <h1 className="title">Quizzical</h1>
            <p className="description">
                Answer {props.length} easy general knowledge questions.
            </p>
            <button className="start-btn" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}
