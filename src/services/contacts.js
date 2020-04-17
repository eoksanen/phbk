import axios from 'axios'
const baseUrl = '/api/persons'



const getAll = () => {
    const request = axios.get(baseUrl)

    return request.then(res => res.data)
}
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(res => res.data)
}
const update = (id, newObject, setMessage) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject).catch(error => {
      
        setMessage([
          `Cannot update person was removed from server`,
          'error'
        ] 
        
        )
        
        setTimeout(() => {
          setMessage([null])
        }, 5000)
        return Promise.reject()})      

    return request.then(res => res.data)
    
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(res => res.data)

}

export default {getAll, create, update, deleteContact}