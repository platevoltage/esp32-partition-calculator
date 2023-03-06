import { useState, useEffect } from 'react';
import './Table.css';
import Row, {Partition} from './Row';
import AddRow from './AddRow';

interface Props {
    table: Partition[];
    setTable: (table: Partition[]) => void;
    flashSize: number;
    displayHex: boolean;
}

export default function Table({table, setTable, flashSize, displayHex}: Props) {
    const [green, setGreen] = useState<boolean>(false);
    function getUnusedSpace(i: number) {
        const partitionSize = table[i].offset + table[i].size;
        let nextOffset = table[i+1]?.offset;
        if (isNaN(nextOffset)) {
            nextOffset = flashSize;
        }
        
        const unusedSpace: number = -(partitionSize - nextOffset);
        return unusedSpace;
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
                    return (<div key={i}>
                        <Row table={table} setTable={setTable} i={i} unusedSpace={getUnusedSpace(i)} displayHex={displayHex}/>
                    </div>)
                })
            }
            <div className="green-row bottom" style={{height: `${green ? "1em" : "0em"}`}}>
                <AddRow table={table} setTable={setTable} i={table.length} setGreen={setGreen} />
            </div>

            {/* <button className="save" onClick={() => {
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

            }}>Save</button> */}



        </main>
    )
}
