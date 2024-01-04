import React, { useState, useEffect } from "react"

// Importing Intro and Quiz components from the components directory
import { Intro, Quiz } from "./components"

// Component that will fetch the "amount" of questions from an API and render the Quiz component.
export default function App() {
    // State variables to control the flow of the quiz and manage the number of questions
    const [start, setStart] = useState(false)
    const [amount, setAmount] = useState(5)

    // State variable to store API data (questions and answers)
    const [apiData, setApiData] = useState([])

    // useEffect to fetch API data when "start" state changes
    useEffect(() => {
        if (start) getApiData()
    }, [start])

    // Asynchronous function to fetch API data based on the selected number of questions
    const getApiData = async () => {
        const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=9&difficulty=easy&type=multiple`)
        const data = await res.json()
        setApiData(data.results)
    }

    // Function to start the quiz when the "Start quiz" button is clicked
    const startQuiz = () => {
        setStart(true)
    }

    // Function to handle changes in the input field for selecting the number of questions
    const handleChange = e => {
        const value = e.target.value
        // Ensure the number of questions is within the valid range (1-50)
        if (value < 1)
            setAmount(1)
        else if (value > 50)
            setAmount(50)
        else
            setAmount(value)
    }

    // Rendering the main content based on the "start" state
    return (
        <main>
            {
                // If the quiz has started, render the Quiz component with API data
                start ?
                    <Quiz apiData={apiData} /> :
                    // If the quiz has not started, render the Intro component with input and start button
                    <Intro
                        amount={amount}
                        handleChange={handleChange}
                        startQuiz={startQuiz}
                    />
            }
        </main>
    )
}
