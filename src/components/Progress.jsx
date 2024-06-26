import { useQuiz } from '../contexts/QuizContext'

/* eslint-disable react/prop-types */
const Progress = () => {
  const { index, numberOfQuestions, points, maxPossiblePoints, answer } =
    useQuiz()
  return (
    <header className='progress'>
      <progress
        max={numberOfQuestions}
        value={index + Number(answer !== null)}
      />
      <p>
        Question <strong>{index + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  )
}

export default Progress
