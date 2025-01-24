import { useState, useEffect } from 'react';
import './Table.css';
import Row, {Partition} from './Row';
import AddRow from './AddRow';

interface Props {
    table: Partition[];
    setTable: (table: Partition[]) => void;
    flashSize: number;
    displayDec: boolean;
    setFlashSizeHighlight: (x: boolean) => void;
}

export default function Table({table, setTable, flashSize, displayDec, setFlashSizeHighlight}: Props) {
    const [greenInsert, setGreenInsert] = useState<boolean>(false);

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
                <div className="column header">Name</div>
                <div className="column header">Type</div>
                <div className="column header">SubType</div>
                <div className="column header">Offset</div>
                <div className="column header">Size</div>
                <div className="column header">Flags</div>
            </header>
            {
                table.map((_, i) => {
                    return (<div key={i}>
                        <Row table={table} setTable={setTable} i={i} unusedSpace={getUnusedSpace(i)} displayDec={displayDec} flashSize={flashSize} setFlashSizeHighlight={setFlashSizeHighlight} />
                    </div>)
                })
            }
            <div className="green-row bottom" style={{height: `${greenInsert ? ".5em" : "0em"}`}}>
                <AddRow table={table} setTable={setTable} i={table.length} setGreenInsert={setGreenInsert} />
            </div>
        </main>
    )
}
