import React, { useEffect, useState } from 'react'

function IdeaPreview({idea, setActiveIdea}) {

  const [clicked, setClicked] = useState(false)

  function handleClick() {
    setClicked(lastClick => !lastClick)
  }

  useEffect(() => {
    setActiveIdea(idea)
  }, [clicked])

  useEffect(() => {
    setActiveIdea(null)
  }, [])

  return (
    <>
      <div onClick={handleClick} className='IdeaTitle'>
        {idea.title}
      </div>
    </>
  )
}

// <animated.div style={{flexDirection: 'column'}} className='IdeaPreview' onClick={handleClick}>
//   <animated.div className='IdeaTitle'>{idea.title}</animated.div>
//   <animated.div className='IdeaDetails' style={{...growMenu}}>
//     <div style={{width: '50%'}}>
//       <h4>Description: </h4>
//       {idea.description}
//     </div>
//     <div style={{width: '10%'}}></div>
//     <div style={{width: '25%'}}>
//       <h4>Tags: </h4>
//       <ul>{tagList}</ul>
//     </div>
//   </animated.div>
// </animated.div>

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
