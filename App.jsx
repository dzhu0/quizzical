import React from "react"
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"

export default function App() {
    const [start, setStart] = React.useState(false)
    const [amount, setAmount] = React.useState(5)
    const [apiData, setApiData] = React.useState([])

    React.useEffect(() => {
        async function getApiData() {
            const res = await fetch(
                `https://opentdb.com/api.php?amount=${amount}&category=9&difficulty=easy&type=multiple`
            )
            const data = await res.json()
            setApiData(data.results)
        }
        getApiData()
    }, [amount])

    function toggleStart() {
        setStart(oldStart => !oldStart)
    }

    function handleChange(event) {
        const value = event.target.value
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
                start
                    ? <Quiz
                        apiData={apiData}
                    />
                    : <Intro
                        length={apiData.length}
                        toggleStart={toggleStart}
                        amount={amount}
                        handleChange={handleChange}
                    />
            }
        </main>
    )
}
