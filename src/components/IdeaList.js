import React, { useEffect, useState, useContext} from 'react'
import { db } from '../firebase/fbConfig'
import { IdeaContex } from './IdeaContext'
import IdeaPreview from './IdeaPreview'

function IdeaList() {
  // const { doc } = props
  const {ideas} = useContext(IdeaContex)
  const ideaList = ideas.map(idea => <IdeaPreview key={idea.title} idea={idea} />)

  return (
    <div className='IdeaList'>
      <h1>Browse</h1>
      {ideaList}
    </div>
  )
}

export default IdeaList
