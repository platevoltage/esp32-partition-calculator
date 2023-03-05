import { useState } from 'react';
import './App.css';
import Table from './components/Table';
import "bootstrap-icons/font/bootstrap-icons.css";


function App() {
  const [flashSize, setFlashSize] = useState<number>(4096);
  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <label htmlFor="flashSize"  style={{width: "10em"}}>Flash Size
        <input name="flash-size" type="text" value={flashSize} onChange={(e) =>  setFlashSize(+e.target.value) }></input>
        </label><br></br>
        <Table flashSize={flashSize*1024} />
      </div>
    </div>
  );
}

export default App;
