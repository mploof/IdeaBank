import React, { useEffect, useState, useContext} from 'react'
import { IdeaContex } from '../IdeaContext'
import IdeaPreview from '../IdeaPreview'
import { Section1 } from '../Sections'

function Browse(props) {

  const [activeIdea, setActiveIdea] = useState(null)
  const {ideas} = useContext(IdeaContex)
  const ideaList = ideas.map(idea =>
    <IdeaPreview key={idea.title} idea={idea} setActiveIdea={setActiveIdea} />
  )

  return (
    <div>
    <div className='popup-container'>
      <div className='popup-item'>
      {activeIdea && <>{activeIdea.title}</>}
      </div>
    </div>
    <Section1>
      <h1 className='noSelect'>Browse</h1>
      {ideaList}
    </Section1>
    </div>
  )
}

export default Browse
