import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import AddContact from './components/AddContact'
import ShowContacts from './components/ShowContacts'
import Filter from './components/Filter'
import personService from './services/contacts'


const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Phonebook app, Department of Computer Science, University of Helsinki 2020</em>
    </div>
  )
}

function App() {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('Mickhael')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ message, setMessage ] = useState([null])


  const hook = ()  => {
  
  personService.getAll().then(iPersons => {
    console.log('promise fulfilled') 
    setPersons(iPersons) })
  }
    useEffect(hook, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if(persons.map(person => {return person.name}).indexOf(newName) > 0){
      console.log('test Index ',persons.map(p => {return p.name}).indexOf(newName))
    }
    if(persons.map(person => {return person.name}).indexOf(newName) < 0){
      personService.create(personObject)
        .then(res => {
          setPersons(persons.concat(res))
          setNewName('')
          setNewNumber('')
          setMessage([
            `'${res.name}' added to server`,
            'add'
        ])
        setTimeout(() => {
          setMessage([null])
        }, 5000)
      })}
      else{
        if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
          const prs = persons.find(p => p.name === newName)
 
            personService.update(prs.id, personObject, setMessage)
            .then(rPersons => {
              setPersons(persons.map(person => person.id !== prs.id ? person : rPersons))            
          })
          setMessage([
            `successfully updated contact`,
            'update'
          ])
          setTimeout(() => {
            setMessage([null])
          }, 5000)            
      }
        //alert(`${newName} is already added to the phonebook, replace the old number with a new one?`)
    }

  }

  const deletePersonOf = (id) => {
    const person = persons.find(c => c.id === id)
    console.log(`person ${id} needs to be deleted`)

    if(window.confirm(`are u sure u want to remove ${person.name}?`)){
      personService.deleteContact(id).catch(error => {

        setMessage([
          `Person '${person.name}' was already removed from server`,
          'error'
        ])
        setTimeout(() => {
          setMessage([null])
        }, 5000)     
      })
      setPersons(persons.filter(n => n.id !== id))
    }
    setMessage([
      `'${person.name}' removed from server`,
      'remove'
    ])
    
    setTimeout(() => {
      setMessage([null])
    }, 5000)
  }

  const handleNameChange = (event) => {
    console.log('name: ', event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log('number: ',event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilter = (event) => {
    console.log('filter: ',event.target.value)
    setFilter(event.target.value)
  }
  const filteredContacts =() => {
    return (persons.filter(fl => {
        return fl.name.toLowerCase().includes(filter.toLowerCase())
      })
    )
  }

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className={message[1]}>
        {message[0]}
      </div>
    )
  }


  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} />
      <h2>add new</h2>
      <AddContact addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ShowContacts filteredContacts={filteredContacts} deletePersonOf={deletePersonOf} />
      <Footer />
    </div>
  )
}

export default App;
