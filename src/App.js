import React from 'react';
import './App.css';
import './firebase/fbConfig'
import { IdeaContextProvider } from './components/IdeaContext'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
// import Home from './components/pages/Home'
import Submit from './components/pages/Submit'
import Search from './components/pages/Search'
import Browse from './components/pages/Browse'
import About from './components/pages/About'
import NavMenu from './components/NavMenu'

import { storageRef } from './firebase/fbConfig'

function App() {

  return (
    <Router>
    <IdeaContextProvider>
      <div className="App">
        <NavMenu/>
        <Switch>
          <Route exact path='/submit' component={Submit} />
          <Route exact path='/Search' component={Search} />
          <Route exact path='/browse' component={Browse} />
          <Route exact path='/about' component={About} />
        </Switch>
      </div>
    </IdeaContextProvider>
    </Router>
  );
}

// function App() {
//   return (
//     <IdeaContextProvider>
//       <div className="App">
//         <div className='Headline'>
//           <h1>The Idea Bank</h1>
//         </div>
//         <div>
//           <SubmitIdea />
//         </div>
//         <div>
//           <SearchBox />
//         </div>
//         <div>
//           <IdeaList />
//         </div>
//
//       </div>
//     </IdeaContextProvider>
//   );
// }


export default App;
