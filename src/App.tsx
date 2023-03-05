import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/Table';

function App() {
  const [flashSize, setFlashSize] = useState<number>(4096);
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <input type="text" style={{width: "10em"}} onChange={(e) =>  setFlashSize(+e.target.value) }></input><br></br>
        <Table flashSize={flashSize} />
      </div>
    </div>
  );
}

export default App;
