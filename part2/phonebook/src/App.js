import { useEffect, useState } from "react";
import axios from "axios";

import Input from "./components/Input";
import Result from "./components/Result";
import Header from "./components/Header";
import Button from "./components/Button";
import personService from "./services/person"
import person from "./services/person";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNum, setNewNum] = useState("");
  const [filter, setFilter] = useState("");

  const getData = () => {
    personService
              .getAll()
              .then(initialData => setPersons(initialData))
              .catch(error => console.log(error))
  };

  const handleChange = (e) => {
    const { type, value } = e.target;
    if (type === "text") {
      setNewName(value);
    } else {
      setNewNum(value);
    }
  };

  const addPerson = (e) => {
    // console.log("add person")
    e.preventDefault();
    let lastObj = persons.slice(-1)[0].id;
    let lastId = lastObj;
    const personObj = {
      name: newName,
      number: newNum,
      id: lastId + 1,
    };
    for (let person of persons) {
      if (person.name === personObj.name) {
        let isTrue = window.confirm(
          `${personObj.name} is already added to phonebook, replace a old number with a new one ?`
        );

        if (isTrue) {
          const newPerson = { ...person, number: personObj.number };
          personService.update(person.id, newPerson).catch(error => console.log(error));
        }

        setNewName("");
        setNewNum("");
        return;
      }
    }
    personService.create(personObj).then((data) => {
      setPersons(persons.concat(personObj));
      setNewName("");
      setNewNum("");
    })
    .catch(error => console.log(error));
  };



  useEffect(()=> {
    getData()
  }, [addPerson])

  const search = (e) => {
    setFilter(e.target.value);
  };
  const dataToShow = filter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  const deleteNum = (id) => {
    personService.remove(id).catch(error => console.log(error))
    getData();
  };
  return (
    <>
      <Header text="Phonebook" />
      <Input
        text="filter shown with"
        type="text"
        value={filter}
        onChange={search}
      />
      <form onSubmit={addPerson}>
        <Header text="add a number" />
        <Input
          text="name"
          value={newName}
          onChange={handleChange}
          type="text"
        />
        <Input
          text="number"
          value={newNum}
          onChange={handleChange}
          type="tel"
        />
        <Button />
      </form>
      <Header text="Numbers" />
      <Result persons={dataToShow} onClick={deleteNum} />
    </>
  );
}

export default App;
