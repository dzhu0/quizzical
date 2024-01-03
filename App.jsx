import React, { useState, useEffect } from "react"
import { Intro, Quiz } from "./components"

export default function App() {
    const [start, setStart] = useState(false)
    const [amount, setAmount] = useState(5)
    const [apiData, setApiData] = useState([])

    useEffect(() => {
        if (start) getApiData()
    }, [start])

    const getApiData = async () => {
        const res = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=9&difficulty=easy&type=multiple`)
        const data = await res.json()
        setApiData(data.results)
    }

    const startQuiz = () => {
        setStart(true)
    }

    const handleChange = e => {
        const value = e.target.value
        if (value < 1)
            setAmount(1)
        else if (value > 50)
            setAmount(50)
        else
            setAmount(value)
    }

    return (
        <main>
            {
                start ?
                    <Quiz apiData={apiData} /> :
                    <Intro
                        amount={amount}
                        handleChange={handleChange}
                        startQuiz={startQuiz}
                    />
            }
        </main>
    )
}
