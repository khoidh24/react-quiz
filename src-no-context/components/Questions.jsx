/* eslint-disable react/prop-types */
import Answers from './Answers'

const Questions = ({ questions, dispatch, answer }) => {
  console.table(questions)
  return (
    <div>
      <h4>{questions.question}</h4>
      <Answers question={questions} dispatch={dispatch} answer={answer} />
    </div>
  )
}

export default Questions
