import React from "react"
import Intro from "./components/Intro"
import Quiz from "./components/Quiz"

export default function App() {
    const [start, setStart] = React.useState(false)
    const [request, setRequest] = React.useState(1)
    const [apiData, setApiData] = React.useState([])

    React.useEffect(() => {
        async function getApiData() {
            const res = await fetch(
                "https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple"
            )
            const data = await res.json()
            setApiData(data.results)
        }
        getApiData()
    }, [request])

    function startQuiz() {
        setStart(oldStart => !oldStart)
    }

    function newQuiz() {
        setRequest(oldRequest => oldRequest + 1)
    }

    return (
        <main>
            {
                start
                    ? <Quiz
                        apiData={apiData}
                        newQuiz={newQuiz}
                    />
                    : <Intro
                        length={apiData.length}
                        startQuiz={startQuiz}
                    />
            }
        </main>
    )
}
