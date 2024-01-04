import React, { useState, useEffect } from "react"

// Importing the Problem component for rendering individual quiz problems
import Problem from "./Problem"

// Importing the nanoid function for generating unique IDs
import { nanoid } from "nanoid"

// Component that will format the "apiData", create quiz using Problem component, check the answers, and display the score
export default function Quiz({ apiData }) {
    // State variables for quiz, score, and check (to determine if answers are checked)
    const [quiz, setQuiz] = useState([])
    const [score, setScore] = useState(0)
    const [check, setCheck] = useState(false)

    // useEffect to initialize the quiz when "apiData" prop changes
    useEffect(() => {
        makeQuiz()
    }, [apiData])

    // useEffect to calculate and update the score when "check" state changes
    useEffect(() => {
        if (check) {
            let newScore = 0
            // Loop through the quiz problems and answers to check correctness and update the "newScore"
            quiz.forEach(problem => {
                problem.answers.forEach(answer => {
                    if (answer.select && answer.choice === problem.correct_answer)
                        newScore++
                })
            })
            // Update the score to be the "newScore"
            setScore(newScore)
        }
    }, [check])

    // Function to format the quiz array based on the provided "apiData"
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

    // Function to randomize the order of answers and create answer objects with unique IDs and a "select" property
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

    // Function to handle the selection of an answer
    const selectAnswer = (problemId, answerId) => {
        // If answers are already checked, do nothing
        if (check) return

        // Update the quiz state to reflect the selected answer
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

    // Function to check the answers and trigger the display of the score
    const checkAnswers = () => {
        setCheck(true)
    }

    // Function to refresh the page and play the quiz again
    const refreshPage = () => {
        window.location.reload(false)
    }

    // Mapping through the quiz array to create Problem components for each quiz problem
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

    // Rendering the quiz component with quiz problems and appropriate buttons based on the check state
    return (
        <div className="quiz">
            {problems}
            {
                // Displaying score and play again button when answers are checked
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
                    // Displaying the check answers button when answers are not checked
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
