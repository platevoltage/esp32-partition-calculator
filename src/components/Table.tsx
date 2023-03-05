import { useState, useEffect } from 'react';
import './Table.css';
import Row, {Partition} from './Row';

interface Props {
    flashSize: number;
}

export default function Table({flashSize}: Props) {

    const [table, setTable] = useState<Partition[]>([
        {
            name: "nvs", 
            type: "data", 
            subType: "nvs", 
            offset: 0x9000, 
            size: 0x5000,
        },
        {
            name: "otadata", 
            type: "data", 
            subType: "ota", 
            offset: 0xe000, 
            size: 0x2000,
        },
        {
            name: "app0", 
            type: "app", 
            subType: "ota_0", 
            offset: 0x10000, 
            size: 0x140000,
        },
        {
            name: "ffat0", 
            type: "data", 
            subType: "fat", 
            offset: 0x150000, 
            size: 0x90000,
        },
        {
            name: "ffat", 
            type: "data", 
            subType: "fat", 
            offset: 0x1E0000, 
            size: 0x220000,
        },

    ]);
    const blankPartition: Partition = {
        name: "",
        type: "app",
        subType: "factory",
        offset: table.length>0 ? table[table.length-1].offset+table[table.length-1].size : 0,
        size: 0,
    }

    function getUnusedSpace(i: number) {
        const unusedSpace: number = table[i].offset + table[i].size - table[i+1]?.offset || 0;
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
                    const unusedSpace = getUnusedSpace(i);
                    return (<div key={i}>
                        <Row table={table} setTable={setTable} i={i} />
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                            {( unusedSpace !== 0 ) && <><div className="mismatch">{unusedSpace} bytes</div></>}
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
