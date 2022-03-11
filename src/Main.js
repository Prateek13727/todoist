import {BrowserRouter as Router} from 'react-router-dom';
import Workspace from './view/components/workspace/Workspace'; 

// import App from './view/App'

import './Main.css';

const Taskbar = () => {
  return <div>
    My Todo List
  </div>
}

function Main() {
  return (
    <>
      <Router>
        <div className='container'>
          <Taskbar />
          <Workspace />
        </div>
      </Router>
    </>
  )
}

export default Main