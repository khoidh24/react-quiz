import { useReducer } from 'react'

function DateCounter() {
  // For useState
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'increase':
        return { ...state, count: state.count + state.step }
      case 'decrease':
        return { ...state, count: state.count - state.step }
      case 'setCount':
        return { ...state, count: action.payload }
      case 'setStep':
        return { ...state, step: action.payload }
      case 'reset':
        return initialState
      default:
        throw new Error('Unknown action type: ' + action.type)
    }
  }

  const initialState = { count: 0, step: 1 }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { count, step } = state

  // This mutates the date object.
  const date = new Date('june 21 2027')
  date.setDate(date.getDate() + count)

  const inc = function () {
    // setCount((count) => count + 1);
    //setCount((count) => count + step);
    dispatch({ type: 'increase' })
  }

  const dec = function () {
    // setCount((count) => count - 1);
    //setCount((count) => count - step);
    dispatch({ type: 'decrease' })
  }

  const defineCount = function (e) {
    //setCount(Number(e.target.value));
    dispatch({ type: 'setCount', payload: Number(e.target.value) })
  }

  const defineStep = function (e) {
    //setStep(Number(e.target.value));
    dispatch({ type: 'setStep', payload: Number(e.target.value) })
  }

  const reset = function () {
    //setCount(0);
    //setStep(1);
    dispatch({ type: 'reset' })
  }

  return (
    <div className='counter'>
      <div>
        <input type='range' min='0' max='10' value={step} onChange={defineStep} />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
export default DateCounter
