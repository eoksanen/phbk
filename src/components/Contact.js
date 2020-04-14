import React from 'react'

const Contact = ({person, deleteContact}) => {
    return(
    <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><button onClick={deleteContact}>delete</button></td>
    </tr>
    )
}


export default Contact