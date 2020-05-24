import React from 'react';
import logo from './logo.svg';
import './App.css';
import './firebase/fbConfig'
import SubmitIdea from './components/SubmitIdea'
import SearchBox from './components/SearchBox'
import IdeaList from './components/IdeaList'
import { IdeaContextProvider } from './components/IdeaContext'

function App() {
  return (
    <IdeaContextProvider>
      <div className="App">
        <div className='Headline'>
          <h1>The Idea Bank</h1>
        </div>
        <div>
          <SubmitIdea />
        </div>
        <div>
          <SearchBox />
        </div>
        <div>
          <IdeaList />
        </div>

      </div>
    </IdeaContextProvider>
  );
}


export default App;
