import React from "react"

export default function Problem(props) {
    function decodeHtml(html) {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const choices = props.answers.map(answer => {
        const styles = {
            backgroundColor:
                answer.select
                    ? "#D6DBF5"
                    : "transparent"
        }

        if (props.check) {
            if (answer.select) {
                styles.backgroundColor = "#F8BCBC"
            }
            if (answer.choice === props.correct_answer) {
                styles.backgroundColor = "#94D7A2"
            }
        }

        React.useEffect(() => {
            if (props.check
                && answer.select
                && answer.choice === props.correct_answer) {
                props.setScore(oldScore => oldScore + 1)
            }
        }, [props.check])

        return (
            <div
                className="choice"
                key={answer.id}
                style={styles}
                onClick={() => (
                    props.selectAnswer(props.id, answer.id)
                )}
            >
                {decodeHtml(answer.choice)}
            </div>
        )
    })

    return (
        <div className="problem">
            <h1 className="question">
                {decodeHtml(props.question)}
            </h1>
            <div className="choices">
                {choices}
            </div>
            <hr />
        </div>
    )
}
