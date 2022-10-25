import React from 'react'

const Content = (props) => {
  const total = props.courses.parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)
  return (
    <div>
      {props.courses.parts.map(course => <p key={course.id}>{course.name} {course.exercises}</p>)}
      <h3>total of {total} exercises</h3>

    </div>
  )
}

export default Content