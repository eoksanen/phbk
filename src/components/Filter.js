import React from 'react'

const Filter = ({filter, handleFilter}) => {
    return(
        <form>
        Filter: <input value={filter} onChange={handleFilter} />
      </form>
    )
}


export default Filter