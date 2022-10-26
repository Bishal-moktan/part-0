import React from 'react'

const Result = (props) => {
  return (
    <>
    {props.persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </>
  )
}

export default Result