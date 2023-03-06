import { useState } from 'react';
import './App.css';
import Table from './components/Table';
import "bootstrap-icons/font/bootstrap-icons.css";
import FlashSize from './components/FlashSize';


function App() {
  const [flashSize, setFlashSize] = useState<number>(4096);
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <FlashSize flashSize={flashSize} setFlashSize={setFlashSize} />
        <br></br>
        <Table flashSize={flashSize*1024} />
      </div>
    </div>
  );
}

export default App;
