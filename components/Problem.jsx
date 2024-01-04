import React from "react"

// Component that will display the question and choices for a problem
// If a choice is selected, the color will be "#D6DBF5"
// On check, if the choice is correct, the color will be "#94D7A2"
// On check, if the choice is incorrect, the color will be "#F8BCBC"
export default function Problem({ id, question, answers, correct_answer, selectAnswer, check }) {

    // Function to decode HTML entities in a string
    const decodeHtml = html => {
        const txt = document.createElement("textarea")
        txt.innerHTML = html
        return txt.value
    }

    // Mapping through the "answers" array to create choice elements with appropriate styles and onClick event
    const choices = answers.map(answer => {
        // Dynamic styling based on whether the answer is selected
        const styles = {
            backgroundColor:
                answer.select ?
                    "#D6DBF5" :
                    "transparent"
        }

        // If checking is enabled, adjust styles based on correctness of the answer
        if (check) {
            if (answer.choice === correct_answer)
                styles.backgroundColor = "#94D7A2" // Correct answer
            else if (answer.select)
                styles.backgroundColor = "#F8BCBC" // Incorrect answer
        }

        // Return a div representing a choice with appropriate styling and onClick event
        return (
            <div
                className="choice"
                key={answer.id}
                style={styles}
                onClick={() => (selectAnswer(id, answer.id))}
            >
                {decodeHtml(answer.choice)}
            </div>
        )
    })

    // Rendering the problem component with the question and choices
    return (
        <div className="problem">
            {/* Displaying the decoded HTML question */}
            <h1 className="question">
                {decodeHtml(question)}
            </h1>

            {/* Displaying the choices */}
            <div className="choices">
                {choices}
            </div>
            <hr />
        </div>
    )
}
