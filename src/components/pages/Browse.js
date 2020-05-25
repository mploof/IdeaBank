import React, { useEffect, useState, useContext} from 'react'
import { IdeaContex } from '../IdeaContext'
import IdeaPreview from '../IdeaPreview'
import { Section1 } from '../Sections'
import { useSpring, animated, config } from 'react-spring'

function Browse(props) {

  const [activeIdea, setActiveIdea] = useState(null)
  const {ideas} = useContext(IdeaContex)
  const ideaList = ideas.map(idea =>
    <IdeaPreview key={idea.title} idea={idea} setActiveIdea={setActiveIdea} />
  )

  const [animation, set, stop] = useSpring(() => ({
    opacity: 0,
    maxHeight: '0vh',
    maxWidth: '0px',
    minHeight: '0px',
    minWidth: '0px'
  }))

  function handleClick() {
    set({opacity: 1, maxHeight: '0vh', maxWidth: '0px', minHeight: '0px', minWidth: '0px'})
    setActiveIdea(null)
  }

  useEffect(() => {
    if(activeIdea) {
      set({opacity: 1, maxHeight: '80vh', maxWidth: '500px', minHeight: '350px', minWidth: '250px'})
    }
  }, [activeIdea])

  return (
    <div>
    <div className='popup-container'>
        <animated.div style={animation} onClick={handleClick} className='popup-item'>
          {activeIdea &&
             <div className='popup-contents'>
             <h3>{activeIdea.title}</h3>
             <div style={{textAlign: 'left', marginBottom: '15px'}}>
               <h4 style={{margin: 0, padding: 0}}>Description</h4>
               <p style={{margin: 0, padding: 0}}>{activeIdea.description}</p>
             </div>
             <div style={{textAlign: 'left'}}>
               <h4 style={{margin: 0, padding: 0}}>Tags</h4>
               {activeIdea.tags.map((tag, index) => <p key={index} style={{margin: 0, padding: 0}}>#{tag}</p>)}
             </div>
             </div>
          }

        </animated.div>
    </div>
    <Section1>
      <h1 className='noSelect'>Browse</h1>
      {ideaList}
    </Section1>
    </div>
  )
}

export default Browse
