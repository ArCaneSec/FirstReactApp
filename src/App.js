import logo from './logo.svg';
import './App.css';
import { Test } from "./ImportExport";
import DefaultTest from './ImportExport';
import Game from './components/game';
import Main from './components/hierarchy';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          {/**
           * Add your desirable main component for render here
          {/* <Test />
          <DefaultTest />
          <Game/> */}
          <Main />
        </p>
      </header>
    </div>
  );
}

export default App;
