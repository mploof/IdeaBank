import React, { useState, useContext } from 'react'
import { useSpring, animated, config } from 'react-spring'
import './Idea.css'
import { db } from '../firebase/fbConfig'
import firebase from 'firebase/app'
import { IdeaContex } from './IdeaContext'

function SubmitIdea(){
  const {setUpdate} = useContext(IdeaContex)

  const [title, setTitle] = useState('')
  const [type, setType] = useState('normal')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [alertActive, setAlertActive] = useState(false)
  const [list, setList] = useState([])
  const [alertText, setAlertText] = useState('')

  const fillAlert = 'All fields must be filled!'
  const submitAlert = 'Idea submitted!'
  const existsAlert = 'Idea by this title already exists!'

  const fadeText = useSpring({
      opacity: alertActive ? 1 : 0,
      config: config.slow
    }
  )

  const fadeDescription = useSpring({
      opacity: type === 'normal' ? 1 : 0,
      maxHeight: type === 'normal' ? '150px' : '0px',
      config: config.slow
    }
  )

  const fadeList = useSpring({
      opacity: type === 'list' ? 1 : 0,
      maxHeight: type === 'list' ? '150px' : '0px',
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

    function createRecord(doc) {
      if(!doc.exists) {
        db.collection("ideas").doc(docName).set({
          title: title,
          type: type,
          description: description,
          tags: tagList,
          created: firebase.firestore.Timestamp.now()
        })
        .then(function() {
          console.log("Document successfully written!");
          alert(submitAlert)
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
          alert("Error writing document!")
        });
        setTitle('')
        setType('normal')
        setList('')
        setDescription('')
        setTags('')
        setUpdate(true)
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

  return (
    <form className='SubmitForm'>
      <h1>Submit Your Idea!</h1>
      <div className='form-row'>
        <label className='col1'>Title</label><input className='col2' id='title' value={title} onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div className='form-row'>
        <div className='form-row' style={{display: 'flex', flexDirection: 'column'}}>
          <animated.div className='form-row' style={fadeDescription}>
            <label className='col1'>Description</label><textarea className='col2 description' id='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
          </animated.div>
          <animated.div className='form-row' style={fadeList}>
            <label className='col1'>List</label><input className='col2' id='list' value={list} onChange={(e) => setList(e.target.value)}/>
          </animated.div>
        </div>
      </div>
      <div className='form-row'>
        <label className='col1'>Tags (Separate with commas)</label><input className='col2' id='tags' value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <div className='form-row'>
        <button onClick={handleSubmit}>Submit Idea!</button>
      </div>
      <div className='form-row'>
        <animated.h4 style={fadeText}>{alertText}</animated.h4>
      </div>
    </form>
  )
}

export default SubmitIdea
