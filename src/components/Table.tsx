import { useState, useEffect } from 'react';
import './Table.css';
import Row, {Partition} from './Row';
import Papa from 'papaparse';
import AddRow from './AddRow';

interface Props {
    flashSize: number;
}

export default function Table({flashSize}: Props) {
    const csvString = `# Name,   Type, SubType, Offset,   Size, Flags
    nvs,      data, nvs,     0x9000,   0x5000,
    otadata,  data, ota,     0xe000,   0x2000,
    app0,     app,  ota_0,   0x10000,  0x140000,
    ffat0,   data, fat,  0x150000, 0x90000,
    ffat,   data, fat,  0x1E0000, 0x220000,`;

    
    const [table, setTable] = useState<Partition[]>([]);

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
        Papa.parse(csvString, parseConfig);
    },[]);

    function getUnusedSpace(i: number) {
        const partitionSize = table[i].offset + table[i].size;
        let nextOffset = table[i+1]?.offset;
        if (isNaN(nextOffset)) {
            nextOffset = flashSize;
        }
        
        const unusedSpace: number = partitionSize - nextOffset;
        return -unusedSpace;
    }


    return (
        <main>
            <header className="row header">
                <div className="column">Name</div>
                <div className="column">Type</div>
                <div className="column">SubType</div>
                <div className="column">Offset</div>
                <div className="column">Size</div>
                <div className="column">Flags</div>
            </header>
            {
                table.map((_, i) => {
                    // const unusedSpace = getUnusedSpace(i);
                    return (<div key={i}>
                        <Row table={table} setTable={setTable} i={i} unusedSpace={getUnusedSpace(i)}/>
                        {/* <div style={{display: "flex", justifyContent: "flex-end"}}>
                            {( unusedSpace !== 0 ) && <><div className="mismatch" style={{backgroundColor: `${unusedSpace>0 ? "#ff9999" : "#ffffff"}`}}>{-unusedSpace} bytes</div></>}
                        </div> */}
                    </div>)
                })
            }
            <AddRow table={table} setTable={setTable} i={table.length}/>

            <button className="save" onClick={() => {
                const _table = [];
                for (let row of table) {
                    _table.push({
                        name: row.name,
                        type: row.type,
                        subType: row.subType,
                        offset: `0x${row.offset.toString(16)}`,
                        size: `0x${row.size.toString(16)}`,
                        flags:  row.flags,
                    })
                }
                const outputString = `# Name,\tType,\tSubType,\tOffset,\tSize,\tFlags \n ${Papa.unparse(_table, unparseConfig)}`
                console.log( outputString );

            }}>Save</button>



        </main>
    )
}
