import { createContext, useContext, useReducer, useEffect } from 'react'

const QuizContext = createContext()

const SECOND_PER_QUESTION = 30

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaining: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return {
        ...state,
        status: 'active',
        secondRemaining: state.questions.length * SECOND_PER_QUESTION
      }
    case 'newAnswer':
      const currentQuestion = state.questions.at(state.index)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points
      }
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore
      }
    case 'restart':
      return { ...initialState, questions: state.questions, status: 'ready' }
    case 'timeout':
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? 'finished' : state.status
      }
    default:
      throw new Error('Uknown action: ' + action.type)
  }
}

const QuizProvider = ({ children }) => {
  const [
    { questions, status, index, answer, points, highscore, secondRemaining },
    dispatch
  ] = useReducer(reducer, initialState)

  const numberOfQuestions = questions.length
  const maxPossiblePoints = questions.reduce(
    (prev, curr) => prev + curr.points,
    0
  )

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/gh/khoidh24/sample-json/quiz.json')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondRemaining,
        numberOfQuestions,
        maxPossiblePoints,
        dispatch
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

const useQuiz = () => {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}

export { QuizProvider, useQuiz }
