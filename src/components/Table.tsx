import { useState, useEffect } from 'react';
import './Table.css';
import Row, {Partition} from './Row';
import Papa from 'papaparse';

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

    const config: Papa.ParseConfig = {
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
        complete: (result: any) => {
            console.dir(result.data);
            const _table: Partition[] = [];
            for (let partition of result.data) {
                _table.push({
                    name: partition[0], 
                    type: partition[1], 
                    subType: partition[2], 
                    offset: parseInt(partition[3], 16), 
                    size: parseInt(partition[4], 16),
                    flags: partition[5]
                })
            }
            setTable(_table);
        }
    }
    
    useEffect(() => {
        Papa.parse(csvString, config);
    },[]);

    function getUnusedSpace(i: number) {
        const partitionSize = table[i].offset + table[i].size;
        let nextOffset = table[i+1]?.offset;
        if (isNaN(nextOffset)) {
            nextOffset = flashSize;
        }
        
        const unusedSpace: number = partitionSize - nextOffset;
        return unusedSpace;
    }

    const blankPartition: Partition = {
        name: "",
        type: "app",
        subType: "factory",
        offset: table.length>0 ? table[table.length-1].offset+table[table.length-1].size : 0,
        size: 0,
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
                    const unusedSpace = getUnusedSpace(i);
                    return (<div key={i}>
                        <Row table={table} setTable={setTable} i={i} />
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            {( unusedSpace !== 0 ) && <><div className="mismatch" style={{backgroundColor: `${unusedSpace>0 ? "#ff9999" : "#ffffff"}`}}>{-unusedSpace} bytes</div></>}
                        </div>
                    </div>)
                })
            }
            <button className="add add-bottom" onClick={() => {
            table.splice( table.length, 0, blankPartition );
            setTable( [ ...table ] );
            }}>-&gt;</button>



        </main>
    )
}
