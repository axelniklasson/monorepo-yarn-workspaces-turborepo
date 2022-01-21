import logo from './logo.svg';
import './App.css';
import pack from '../package.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello from {pack.name}@{pack.version}
        </p>
      </header>
    </div>
  );
}

export default App;
