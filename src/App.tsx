import { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import FileSelect from './components/FileSelect';
import "bootstrap-icons/font/bootstrap-icons.css";
import FlashSize from './components/FlashSize';
import Options from './components/Options';
import {Partition} from './components/Row';



function App() {
  const [flashSize, setFlashSize] = useState<number>(4096);
  const [table, setTable] = useState<Partition[]>([]);
  const [displayDec, setDisplayDec] = useState<boolean>(true);

  useEffect(() => { //update local storage
    if (table.length > 0) {
      window.localStorage.setItem("currentTable", JSON.stringify(table));
    }
  },[table]);


  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <Table table={table} setTable={setTable} flashSize={flashSize*1024} displayDec={displayDec}/>
        
        <Options flashSize={flashSize} displayDec={displayDec} setFlashSize={setFlashSize} setDisplayDec={setDisplayDec} setTable={setTable}/>

      </div>
    </div>
  );
}

export default App;
