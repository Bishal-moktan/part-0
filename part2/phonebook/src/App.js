import {useEffect, useState} from "react"

import Input from "./components/Input"
import Result from "./components/Result"
import Header from "./components/Header"
import Button from "./components/Button"
import axios from "axios"

function App() {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')


  useEffect(()=> {
    axios
        .get("http://localhost:3001/persons")
        .then((response) => {
          setPersons(response.data)
        })
  }, [])


  const handleChange = (e) => {
    const {type, value} = e.target
    if(type === "text"){
      setNewName(value)
    }else{
      setNewNum(value)
    }
  }


  const handleClick = (e) => {
    e.preventDefault()
    let lastObj = persons.slice(-1)[0].id
    let lastId = lastObj
    const personObj = {
      name: newName,
      number: newNum,
      id: lastId + 1
    }
    for(let person of persons){
      if(person.name === personObj.name){
        alert(`${personObj.name} is already added to phonebook`)
        setNewName("")
        setNewNum("")
        return
      }
    }
    setPersons(persons.concat(personObj))
    setNewName("")
    setNewNum("")
  }

  const search = (e) => {
    setFilter(e.target.value)
  }
  const dataToShow = filter?persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())):persons

  return (
    <>
      <Header text="Phonebook"/>
      <Input 
        text="filter shown with"
        type="text"
        value={filter}
        onChange={search}
      />
      <form onSubmit={handleClick}>
      <Header text="add a number"/>
      <Input
      text="name"
       value={newName}
       onChange={handleChange} 
       onSubmit={handleClick}
       type="text"
      />
      <Input
      text="number"
       value={newNum}
       onChange={handleChange} 
       onSubmit={handleClick}
       type="tel"
      />
      <Button />
      </form>
      <Header text="Numbers"/>
      <Result persons={dataToShow}/>
    </>
  );
}

export default App;
