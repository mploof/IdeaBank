import React, { useState, useContext } from 'react'
import { IdeaContex } from '../IdeaContext'

function Search(props) {

  const [text, setText] = useState('')
  const {setSearch} = useContext(IdeaContex)


  return (
    <div className='Container'>
    <h1 className='noSelect'>Search</h1>
    <form className='Form'>
      <div className='FormItem'>
        <input onChange={(e) => setText(e.target.value)} className='FormInput' id='search' />
      </div>
      <button className='FormButton' onClick={(e) => setSearch(text)}>Go!</button>
    </form>
    </div>
  )
}

export default Search
