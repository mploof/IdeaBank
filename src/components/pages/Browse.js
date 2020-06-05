import React, { useEffect, useState, useContext} from 'react'
import { IdeaContex } from '../IdeaContext'
import IdeaPreview from '../IdeaPreview'
import { Section1 } from '../Sections'
import { useSpring, animated, config   } from 'react-spring'
import { storageRef } from '../../firebase/fbConfig'
import SmoothImage from 'react-smooth-image';


function Browse(props) {

  const [activeIdea, setActiveIdea] = useState(null)
  const {ideas} = useContext(IdeaContex)
  const ideaList = ideas.map(idea =>
    <IdeaPreview key={idea.title} idea={idea} setActiveIdea={setActiveIdea} />
  )
  const [imgSrc, setImgSrc] = useState('')

  const [animation, set] = useSpring(() => ({
    opacity: 0,
    maxHeight: '0vh',
    maxWidth: '0px',
    minHeight: '0px',
    minWidth: '0px'
  }))

  const [fadeIn, setFadeIn] = useSpring(() => ({
    opacity: 0,
    config: config.molasses
  }))

  function handleClick() {
    setActiveIdea(null)
    set({opacity: 1, maxHeight: '0vh', maxWidth: '0px', minHeight: '0px', minWidth: '0px'})
    setFadeIn({opacity: 0})
    setImgSrc('')
  }

  useEffect(() => {
    if(activeIdea) {
      set({opacity: 1, maxHeight: '80vh', maxWidth: '500px', minHeight: '350px', minWidth: '250px'})
      getURL()
    }
  }, [activeIdea])

  useEffect(() => {
    if(imgSrc !== '') {
      setTimeout(
        setFadeIn({opacity: 1}), 5000
      )
    }
  }, [imgSrc])

  function getURL() {

    // Make sure there's an image before trying to load it
    if(typeof activeIdea === null || typeof activeIdea.img == 'undefined')
      return

    // Get the download URL
    console.log(activeIdea.img)
    storageRef.child(activeIdea.img).getDownloadURL().then(function(url) {
      console.log(url)
      setImgSrc(url)
    }).catch(function(error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/object-not-found':
        // File doesn't exist
        break;

        case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;

        case 'storage/canceled':
        // User canceled the upload
        break;

        case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        break;
      }
    })
  }

  const imgHeight = (activeIdea === null || typeof activeIdea.img == 'undefined') ? '0px' : '200px'

  return (
    <div>
    <div className='popup-container'>
        <animated.div style={animation} className='popup-item'>
          {activeIdea &&
             <div className='popup-contents'>
               <SmoothImage
                src={imgSrc}
                transitionTime={0.3}
                containerStyles={{display: 'block', height: imgHeight, paddingBottom: '0'}}
                imageStyles={{position: '', top: '', left: '', maxHeight: '100%', width: '', borderRadius: '10px', margin: 'auto'}}
               />
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
        {activeIdea && <div onClick={handleClick} className='TransparentOverlay'/>}
    </div>
    <Section1>
      <h1 className='noSelect'>Browse</h1>
      {ideaList}
    </Section1>
    </div>
  )
}

export default Browse
