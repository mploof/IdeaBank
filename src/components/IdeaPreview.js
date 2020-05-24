import React, { useEffect, useState, useContext} from 'react'
import { db } from '../firebase/fbConfig'
import { IdeaContex } from './IdeaContext'
import './Idea.css'
import { useSpring, animated, config} from 'react-spring'

function IdeaPreview({idea}) {

  const [clicked, setClicked] = useState(false)

  const flip = useSpring({
    transform: clicked ? 'rotateX(180deg)' : 'rotateX(0deg)',
    config: config.gentle
  })


  const growMenu = useSpring({
    minHeight: clicked ? '100px' : '0px',
    height: clicked ? '200px' : '0px',
    opacity: clicked ? 1 : 0,
    config: config.gentle
  })

  function handleClick() {
    setClicked(lastClick => !lastClick)
  }

  useEffect(() => {
    console.log(clicked)
  }, [clicked])

  const tagList = idea.tags.map(tag => <li>{tag}</li>)

  return (
    <animated.div style={{flexDirection: 'column'}} className='IdeaPreview' onClick={handleClick}>
      <animated.div className='IdeaTitle'>{idea.title}</animated.div>
      <animated.div className='IdeaDetails' style={{...growMenu}}>
        <div style={{width: '50%'}}>
          <h4>Description: </h4>
          {idea.description}
        </div>
        <div style={{width: '10%'}}></div>
        <div style={{width: '25%'}}>
          <h4>Tags: </h4>
          <ul>{tagList}</ul>
        </div>
      </animated.div>
    </animated.div>
  )
}

//
// <h3 className='form-row' style={{}}>{idea.title}</h3>
// <div style={growMenu}>Details here</div>

// <div  className='col1'>
//   <h3>{idea.title}</h3>
// </div>
// <div className='col2'>
//   <p>{idea.description}</p>
// </div>

export default IdeaPreview
