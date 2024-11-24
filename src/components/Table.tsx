import { useState, useEffect } from 'react';
import './Table.css';
import Row, {Partition} from './Row';
import AddRow from './AddRow';

interface Props {
    table: Partition[];
    setTable: (table: Partition[]) => void;
    flashSize: number;
    displayDec: boolean;
    rowCount: number;
    setRowCount: (rowCount: number) => void;
}

export default function Table({table, setTable, flashSize, displayDec, rowCount, setRowCount}: Props) {
    const [green, setGreen] = useState<boolean>(false);
    const [displayTable, setDisplayTable] = useState<any[]>([]);

    useEffect(() => {
        setDisplayTable(table);
    }, [table]);

    // useEffect(() => {
    //     if (displayTable.length === 0) {
    //         setDisplayTable(table);
    //     } else {
    //         // setDisplayTable([]);
    //     }
    // }, [displayTable]);

    function getUnusedSpace(i: number) {


            const partitionSize = table[i]?.offset + table[i]?.size;
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
                displayTable.map((_, i) => {
                    return (<div key={table[i]?.key}>
                        <Row table={table} setTable={setTable} i={i} unusedSpace={getUnusedSpace(i)} displayDec={displayDec} rowCount={rowCount} setRowCount={setRowCount}/>
                    </div>)
                })
            }
            <div className="green-row bottom" style={{height: `${green ? ".5em" : "0em"}`}}>
                <AddRow table={table} setTable={setTable} i={table.length} setGreen={setGreen} rowCount={rowCount} setRowCount={setRowCount}/>
            </div>
        </main>
    )
}
