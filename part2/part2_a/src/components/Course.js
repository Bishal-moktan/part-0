import React from 'react'
import Content from './Content'
import Header from './Header'

const Course = (props) => {

  return (
    <div>
      <h1>Web development curriculum</h1>
      {props.courses.map(course => {
        return (
          <div key={course.id}>
            <Header courses={course} />
            <Content courses={course} />
          </div>
        )
      })}
    </div>
  )
}

export default Course