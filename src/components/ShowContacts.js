import React from 'react'
import Contact from './Contact'

const ShowContacts = ({filteredContacts, deletePersonOf}) => {
    return(
        <table className = 'listOfContacts'>
        <thead>
          <tr>
            <td>
              Name:
            </td>
            <td>
              Number:
            </td>
          </tr>
        </thead>
        <tbody>
        {filteredContacts().map((person, i) => 
          <Contact key={i} person={person} 
          deleteContact={()=>deletePersonOf(person.id)}
          />
        )}
        </tbody>
      </table> 
    )
}


export default ShowContacts