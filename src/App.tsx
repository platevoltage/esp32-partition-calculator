import { useState, useEffect } from 'react';
import './App.css';
import Table from './components/Table';
import "bootstrap-icons/font/bootstrap-icons.css";
import FlashSize from './components/FlashSize';
import {Partition} from './components/Row';
import Papa from 'papaparse';

async function getCSV() {
  const fileName = "huge_app.csv";
  const res = await fetch(`${process.env.PUBLIC_URL}/tables/${fileName}`);
  if (!res.ok) {
    throw res;
  }
  return res.text();
}


function App() {
  const [flashSize, setFlashSize] = useState<number>(4096);
  const [table, setTable] = useState<Partition[]>([]);

  // const csvString = `# Name,   Type, SubType, Offset,   Size, Flags
  // nvs,      data, nvs,     0x9000,   0x5000,
  // otadata,  data, ota,     0xe000,   0x2000,
  // app0,     app,  ota_0,   0x10000,  0x140000,
  // ffat0,   data, fat,  0x150000, 0x90000,
  // ffat,   data, fat,  0x1E0000, 0x220000,`;


  const parseConfig: Papa.ParseConfig = {
    delimiter: "",	// auto-detect
    quoteChar: '"',
    escapeChar: '"',
    header: false,
    transformHeader: undefined,
    dynamicTyping: false,
    preview: 0,
    comments: "#",
    step: undefined,
    skipEmptyLines: false,
    fastMode: undefined,
    beforeFirstChunk: undefined,
    transform: undefined,
    delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
    complete: (result: Papa.ParseResult<string>) => {
        const _table: Partition[] = [];
        for (let partition of result.data) {
            _table.push({
                name: partition[0].trim(), 
                type: partition[1].trim(), 
                subType: partition[2].trim(), 
                offset: parseInt(partition[3], 16), 
                size: parseInt(partition[4], 16),
                flags: partition[5].trim()
            });
        }
        setTable(_table);
    }
  }


  const unparseConfig: Papa.UnparseConfig = {
      quotes: false, //or array of booleans
      quoteChar: '"',
      escapeChar: '"',
      delimiter: ",\t",
      header: false,
      newline: "\n",
      skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
      // columns: null //or array of strings
  }

  useEffect(() => {

      (async () => Papa.parse(await getCSV(), parseConfig))();

  },[]);

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        <FlashSize flashSize={flashSize} setFlashSize={setFlashSize} />
        <br></br>
        <Table table={table} setTable={setTable} flashSize={flashSize*1024} />
      </div>
    </div>
  );
}

export default App;
