import { useState } from 'react'

const Button = (props) => {
  return (
    <div>
      <button onClick={props.goodRes}>good</button>
      <button onClick={props.neutralRes}>neutral</button>
      <button onClick={props.badRes}>bad</button>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>
          {text}
        </td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}
const Statistics = (props) => {
  let average = (props.good - props.bad) / props.all
  let positive = props.good / props.all * 100
  return (
    <div>
      <h1>give feedback</h1>
      <Button goodRes={props.goodRes} badRes={props.badRes} neutralRes={props.neutralRes}/>
      <h1>statistics</h1>
      {props.all === 0?"No feedback given":
      <table>
      
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={`${positive} %`} />
      
      </table>
      }
    </div>

  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodRes = () => {
    setGood(good + 1)
  }
  const badRes = () => {
    setBad(bad + 1)
  }
  const neutralRes = () => {
    setNeutral(neutral + 1)
  }
  let all = good + neutral + bad
  
  return (
    
    <Statistics
      good={good}
      neutral={neutral}
      bad={bad}
      all={all}
      goodRes={goodRes}
      badRes={badRes}
      neutralRes={neutralRes}
    />
  )
}

export default App