import React, { useState, useContext } from 'react'
import { IdeaContex } from './IdeaContext'

function SearchBox(props) {

  const [text, setText] = useState('')
  const {setSearch} = useContext(IdeaContex)

  return (
    <div className='SearchBox'>
      <h1>Search</h1>
      <div className='col2' onChange={(e) => setText(e.target.value)} value={text} style={{display: 'flex'}}><input style={{flexGrow: 1}} id='search'/></div>
      <button onClick={(e) => setSearch(text)}>Search Tags</button>
    </div>
  )
}

export default SearchBox
