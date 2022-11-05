import React from 'react'

const Result = (props) => {
  return (
    <>
    {props.persons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => window.confirm(`Delete ${person.name} ?`) && props.onClick(person.id)}>Delete</button></p>)}
    </>
  )
}

export default Result