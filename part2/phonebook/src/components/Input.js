import React from 'react'

const Input = (props) => {
  return (
   <>
    <div>
      {props.text}: <input type={props.type} value={props.value} onChange={props.onChange}/>
    </div>
   
   </>
  )
}

export default Input