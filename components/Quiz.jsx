import React, { useState, useEffect } from "react"
import Problem from "./Problem"
import { nanoid } from "nanoid"

export default function Quiz({ apiData }) {
    const [quiz, setQuiz] = useState([])
    const [score, setScore] = useState(0)
    const [check, setCheck] = useState(false)

    useEffect(() => {
        makeQuiz()
    }, [apiData])

    useEffect(() => {
        if (check)
            quiz.forEach(problem => {
                problem.answers.forEach(answer => {
                    if (answer.select && answer.choice === problem.correct_answer)
                        setScore(oldScore => oldScore + 1)
                })
            })
    }, [check])

    const makeQuiz = () => {
        setQuiz(apiData.map(data => (
            {
                id: nanoid(),
                question: data.question,
                answers: randomizeAnswers(
                    data.correct_answer,
                    data.incorrect_answers
                ),
                correct_answer: data.correct_answer
            }
        )))
    }

    const randomizeAnswers = (insert, answers) => {
        const ranNum = Math.floor(Math.random() * (answers.length + 1))
        answers.splice(ranNum, 0, insert)

        return answers.map(answer => (
            {
                id: nanoid(),
                choice: answer,
                select: false
            }
        ))
    }

    const selectAnswer = (problemId, answerId) => {
        if (check) return

        setQuiz(oldQuiz => (oldQuiz.map(problem => (
            {
                ...problem,
                answers:
                    problem.id === problemId ?
                        problem.answers.map(answer => (
                            {
                                ...answer,
                                select: answer.id === answerId
                            }
                        )) :
                        problem.answers
            }
        ))))
    }

    const checkAnswers = () => {
        setCheck(true)
    }

    const refreshPage = () => {
        window.location.reload(false)
    }

    const problems = quiz.map(problem => {
        return (
            <Problem
                key={problem.id}
                {...problem}
                selectAnswer={selectAnswer}
                check={check}
            />
        )
    })

    return (
        <div className="quiz">
            {problems}
            {
                check ?
                    <div className="play-again">
                        <p className="score">
                            You scored {score}/{quiz.length} correct answers
                        </p>
                        <button
                            className="play-btn"
                            onClick={refreshPage}
                        >
                            Play again
                        </button>
                    </div> :
                    <button
                        className="check-btn"
                        onClick={checkAnswers}
                    >
                        Check answers
                    </button>
            }
        </div>
    )
}
