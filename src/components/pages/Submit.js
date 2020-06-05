import React, { useState, useContext } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { db, storageRef } from '../../firebase/fbConfig'
import firebase from 'firebase/app'
import { IdeaContex } from '../IdeaContext'
import { preview_icon } from '../../assets'

function Submit(props) {

  const {setUpdate} = useContext(IdeaContex)

  const [title, setTitle] = useState('')
  const [type, setType] = useState('normal')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [alertActive, setAlertActive] = useState(false)
  const [list, setList] = useState([])
  const [alertText, setAlertText] = useState('')
  const [preview, setPreview] = useState(preview_icon)

  const fillAlert = 'All fields must be filled!'
  const submitAlert = 'Idea submitted!'
  const existsAlert = 'Idea by this title already exists!'

  const fadeText = useSpring({
      opacity: alertActive ? 1 : 0,
      config: config.slow
    }
  )

  function handleSubmit(e) {
    e.preventDefault()
    if(title === '' || (type === 'normal' && description === '') || (type === 'list' && list === '') || tags === '') {
      alert(fillAlert)
      return
    }
    console.log(title, type, description, tags)

    let tagList = tags.toLowerCase().split(',')
    tagList = tagList.map(item => item.trim().replace(/\b\s+\b/g, '_'))

    const docName = title.trim().replace(/\b\s+\b/g, '_').toLowerCase()

    db.collection("ideas").doc(docName).get().then(doc => createRecord(doc))

    let imgRef = null
    if(preview !== preview_icon) {
      // Upload the image
      const imgPath = 'images/' + docName + '.jpg'
      imgRef = storageRef.child(imgPath)
      imgRef.putString(preview, 'data_url').then(function(snapshot) {
        console.log('Uploaded a data_url string!');
      })
    }

    function createRecord(doc) {
      if(!doc.exists) {
        db.collection("ideas").doc(docName).set({
          title: title,
          type: type,
          description: description,
          tags: tagList,
          created: firebase.firestore.Timestamp.now(),
          img: imgRef ? 'images/thumbnails/' + docName + '_300x300.jpg' : ''
        })
        .then(function() {
          console.log("Document successfully written!");
          alert(submitAlert)
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
          alert("Error writing document!")
        })

        // Clear all the submission fields
        setTitle('')
        setType('normal')
        setList('')
        setDescription('')
        setTags('')
        setUpdate(true)
        setPreview(preview_icon)
      } else {
        alert(existsAlert)
        console.log("Document already exists!")
      }
    }
  }

  function alert(text) {
    setAlertText(text)
    console.log(text)
    setAlertActive(true)
    setTimeout(() => {setAlertActive(false)}, 1500)
  }

  const reader = new FileReader()

  reader.onload = (() => {
      console.log("loaded file")
      setPreview(reader.result)
    }
  )

  function handleFileChange(e) {
    const file = e.target.files[0]

    if (!file.type.startsWith('image/')){ return }

    reader.readAsDataURL(file);

  }

  return (
    <div className='Container'>
    <h1 className='noSelect'>Submit</h1>

    <form className='Form'>
      <div className='FormItem'>
        <div className='FormLabel'>
          <label>Title</label>
        </div>
        <input
          className='FormInput'
          id='title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div className='FormItem'>
        <div className='FormLabel'>
          <label>Description</label>
        </div>
        <textarea
          className='FormInputArea'
          id='description'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className='FormItem'>
        <div className='FormLabel'>
          <label>Tags (Comma Separated)</label>
        </div>
        <input
          className='FormInput'
          id='tags'
          onChange={(e) => setTags(e.target.value)}
          value={tags}
        />
      </div>

      <div className='FormItem'>
        <div className='file-input'>
          <input type='file' style={{display: 'none'}} name='file' id='file' onChange={handleFileChange} accept='.jpg, .jpeg, .png' />
          <label htmlFor='file'>Select Image</label>
        </div>
      </div>

      <img className='image-preview' src={preview}/>

      <animated.div className='Alert' style={fadeText}>
        <h3>{alertText}</h3>
      </animated.div>

      <button className='FormButton' onClick={handleSubmit}>Save</button>
    </form>
    </div>
  )
}

export default Submit
