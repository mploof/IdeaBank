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

export default IdeaPreview
