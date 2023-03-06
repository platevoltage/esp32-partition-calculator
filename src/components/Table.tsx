import { useState, useEffect } from 'react';
import './Table.css';
import Row, {Partition} from './Row';
import AddRow from './AddRow';

interface Props {
    table: Partition[];
    setTable: (table: Partition[]) => void;
    flashSize: number;
}

export default function Table({table, setTable, flashSize}: Props) {

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
                // const outputString = `# Name,\tType,\tSubType,\tOffset,\tSize,\tFlags \n ${Papa.unparse(_table, unparseConfig)}`
                // console.log( outputString );

            }}>Save</button>



        </main>
    )
}
