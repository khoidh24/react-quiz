/* eslint-disable react/prop-types */
import { useQuiz } from '../contexts/QuizContext'
import Answers from './Answers'

const Questions = () => {
  const { questions, index } = useQuiz()
  const question = questions.at(index)
  return (
    <div>
      <h4>{question.question}</h4>
      <Answers question={question} />
    </div>
  )
}

export default Questions
