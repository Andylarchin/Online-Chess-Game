import './App.css';
import Login from './Pages/Login/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lobby from './Pages/Lobby/lobby';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' Component={Login} />
          <Route exact path='/home' Component={Lobby} />
          <Route exact path='/main' Component={Login} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
