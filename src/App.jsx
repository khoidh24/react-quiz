import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import Start from './components/Start'
import Questions from './components/Questions'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import Finished from './components/Finished'
import Footer from './components/Footer'
import Timer from './components/Timer'

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaining: null
}

const SECOND_PER_QUESTION = 30

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

const App = () => {
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
    fetch(
      'https://cdn.jsdelivr.net/gh/khoidh24/react-quiz/blob/main/data/questions.json'
    )
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <Start numberOfQuestions={numberOfQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numberOfQuestions={numberOfQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Questions
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondRemaining={secondRemaining} />
              <NextButton
                dispatch={dispatch}
                index={index}
                numberOfQuestions={numberOfQuestions}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <Finished
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}

export default App
