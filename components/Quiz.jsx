import React from "react"
import Problem from "./Problem"
import { nanoid } from "nanoid"

export default function Quiz(props) {
    const [quiz, setQuiz] = React.useState([])
    const [score, setScore] = React.useState(0)
    const [check, setCheck] = React.useState(false)

    React.useEffect(() => {
        setQuiz(makeQuiz())
    }, [props.apiData])

    React.useEffect(() => {
        if (check)
            for (let i = 0; i < quiz.length; i++) {
                const problem = quiz[i]
                for (let j = 0; j < problem.answers.length; j++) {
                    const answer = problem.answers[j]
                    if (answer.select && answer.choice === problem.correct_answer)
                        setScore(oldScore => oldScore + 1)
                }
            }
    }, [check])

    function makeQuiz() {
        return props.apiData.map(data => {
            return {
                id: nanoid(),
                question: data.question,
                answers: randomizeAnswers(
                    data.correct_answer,
                    data.incorrect_answers
                ),
                correct_answer: data.correct_answer
            }
        })
    }

    function randomizeAnswers(insert, answers) {
        const ranNum = Math.floor(Math.random() * (answers.length + 1))
        answers.splice(ranNum, 0, insert)

        return answers.map(answer => {
            return {
                id: nanoid(),
                choice: answer,
                select: false
            }
        })
    }

    function selectAnswer(problemId, answerId) {
        if (check) return

        setQuiz(oldQuiz => {
            return oldQuiz.map(problem => {
                return {
                    ...problem,
                    answers:
                        problem.id === problemId
                            ? problem.answers.map(answer => {
                                return {
                                    ...answer,
                                    select: answer.id === answerId
                                }
                            })
                            : problem.answers
                }
            })
        })
    }

    function toggleCheck() {
        setCheck(oldCheck => !oldCheck)
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const problems = quiz.map(problem => {
        return (
            <Problem
                key={problem.id}
                id={problem.id}
                question={problem.question}
                answers={problem.answers}
                correct_answer={problem.correct_answer}
                selectAnswer={selectAnswer}
                check={check}
            />
        )
    })

    return (
        <div className="quiz">
            {problems}
            {
                check
                    ? <div className="play-again">
                        <p className="score">
                            You scored {score}/{quiz.length} correct answers
                        </p>
                        <button
                            className="play-btn"
                            onClick={refreshPage}
                        >
                            Play again
                        </button>
                    </div>
                    : <button
                        className="check-btn"
                        onClick={toggleCheck}
                    >
                        Check answers
                    </button>
            }
        </div>
    )
}
