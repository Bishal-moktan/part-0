import React from 'react'

const Notification = ({message}) => {
    if(message === null){
        return null
    }
    const errorStyle = {
        color: "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
    }
  return (
    <div className="error" style={errorStyle}>
        {message}
    </div>
  )
}

export default Notification