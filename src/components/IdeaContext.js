import React, { useState, useEffect }from 'react'
import { db } from '../firebase/fbConfig'

const IdeaContex = React.createContext()

function IdeaContextProvider({children}) {
  const [ideas, setIdeas] = useState([])
  const [update, setUpdate] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredIdeas, setFilteredIdeas] = useState([])

  // Set the ideas from the database upon first mounting
  useEffect(() => updateIdeas(), [])

  // Update the ideas in state when a flag is set from elsewhere in the app
  useEffect(() => {
    if(update) {
      updateIdeas()
      setUpdate(false)
    }
  }, [update])

  useEffect(() => {
    updateFilteredIdeas()
  }, [search])

  function updateFilteredIdeas() {
    if(search !== '') {
      setFilteredIdeas(ideas.map(idea => idea.tags.includes(search)))
    } else {
      setFilteredIdeas(ideas)
    }
  }

  function updateIdeas() {
    db.collection("ideas").get()
      .then(
        (querySnapshot) =>
        {
          setIdeas(querySnapshot.docs.map(doc => doc.data()))
        }
      )
  }

  return(
    <IdeaContex.Provider value={{setSearch, setUpdate, ideas, setIdeas, filteredIdeas}}>
      {children}
    </IdeaContex.Provider>
  )
}

export {IdeaContextProvider, IdeaContex}
