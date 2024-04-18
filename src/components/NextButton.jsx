import { useQuiz } from '../contexts/QuizContext'

/* eslint-disable react/prop-types */
const NextButton = () => {
  const { index, dispatch, answer, numberOfQuestions } = useQuiz()
  if (answer === null) return null

  if (index < numberOfQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    )

  if (index === numberOfQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'finish' })}
      >
        Finish
      </button>
    )
}

export default NextButton
