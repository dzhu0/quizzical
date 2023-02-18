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

    function checkAnswers() {
        setCheck(true)
    }

    function playAgain() {
        setCheck(false)
        setScore(0)
        props.newQuiz()
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
                setScore={setScore}
            />
        )
    })

    return (
        <div className="quiz">
            {problems}
            {
                check
                    ? <div className="check">
                        <p className="score">
                            You scored {score}/{quiz.length} correct answers
                        </p>
                        <button
                            className="play-btn"
                            onClick={playAgain}
                        >
                            Play again
                        </button>
                    </div>
                    : <button
                        className="check-btn"
                        onClick={checkAnswers}
                    >
                        Check answers
                    </button>
            }
        </div>
    )
}
