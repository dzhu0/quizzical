import React from "react"

export default function Problem({ id, question, answers, correct_answer, selectAnswer, check }) {
    const decodeHtml = html => {
        const txt = document.createElement("textarea")
        txt.innerHTML = html
        return txt.value
    }

    const choices = answers.map(answer => {
        const styles = {
            backgroundColor:
                answer.select ?
                    "#D6DBF5" :
                    "transparent"
        }

        if (check) {
            if (answer.choice === correct_answer)
                styles.backgroundColor = "#94D7A2"
            else if (answer.select)
                styles.backgroundColor = "#F8BCBC"
        }

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

    return (
        <div className="problem">
            <h1 className="question">
                {decodeHtml(question)}
            </h1>
            <div className="choices">
                {choices}
            </div>
            <hr />
        </div>
    )
}
