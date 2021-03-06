import React, { useState, useEffect } from 'react'
import AddPersonForm from './components/AddPersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  // filters the name
  const personsToShow = showAll
    ? persons
    : persons.filter(person => {
      return person.name.toLowerCase().includes(newSearch.toLowerCase())
    })

  const addPerson = (e) => {
    e.preventDefault()

    const filterDuplicateName = persons.filter(
      person => person.name === newName
    )

    if (filterDuplicateName.length > 0) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return
    }

    // if the person hasn't entered a phone number
    if (newNumber === '' || /[^\d -]/.test(newNumber)) {
      alert(`Please enter a valid phone number`)
      setNewNumber('')
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  // updating state based on input updates
  const handleNewName = (e) => {
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const handleNewSearch = (e) => {
    // console.log('we are typing', e.target)
    setNewSearch(e.target.value)
    setShowAll(false)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        Filter shown with:
      <Filter newSearch={newSearch} handleNewSearch={handleNewSearch} />
      <h3>Add a new</h3>
      <AddPersonForm
        addPerson={addPerson}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} personsToShow={personsToShow} />
    </div>
  )
}

export default App
