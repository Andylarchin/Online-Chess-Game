import './App.css';
import Login from './Pages/Login/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lobby from './Pages/Lobby/lobby';
import ChessGame from './Pages/chessGame/chessGame';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Router>
          <Routes>
            <Route exact path='/' Component={Login} />
            <Route exact path='/home' Component={Lobby} />
            <Route exact path='/main' Component={ChessGame} />
          </Routes>
        </Router>
      </DndProvider>
    </>
  );
}

export default App;
