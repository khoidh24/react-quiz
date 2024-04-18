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
import { useQuiz } from './contexts/QuizContext'

const App = () => {
  const { status } = useQuiz()

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <Start />}
        {status === 'active' && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'finished' && <Finished />}
      </Main>
    </div>
  )
}

export default App
