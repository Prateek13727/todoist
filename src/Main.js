import {BrowserRouter as Router} from 'react-router-dom';
import Workspace from './view/components/workspace/Workspace'; 

// import App from './view/App'

import './Main.css';

const Taskbar = () => {
  return <div>
    Taskbar
  </div>
}

function Main() {
  return (
    <>
      <Router>
        <Taskbar />
        <Workspace />
      </Router>
    </>
  )
}

export default Main