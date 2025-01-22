import { useState, useEffect } from 'react';
import './Table.css';
import Row, {Partition} from './Row';
import AddRow from './AddRow';

interface Props {
    table: Partition[];
    setTable: (table: Partition[]) => void;
    flashSize: number;
    displayDec: boolean;
}

export default function Table({table, setTable, flashSize, displayDec}: Props) {
    const [green, setGreen] = useState<boolean>(false);

    function handleShoeHorn(i: number) {
        console.log("shoehorn", table);
        const _table = [...table];
        const _unusedSpace = getUnusedSpace(i);
        for (let _i = i+1; _i < _table.length; _i++) {
            _table[_i].offset -= _unusedSpace;
        }
        setTable(_table.map((row: Partition) => {
            row.preview = undefined;
            return row;
        }));

    }

    function handleShoeHornPreview(i?: number) {
        console.log("HOVER", i)
        const _table = [...table];
        if (typeof i == "number") {
            const _unusedSpace = getUnusedSpace(i);
            for (let _i = i+1; _i < _table.length; _i++) {
                _table[_i].preview = _table[_i].offset - _unusedSpace;
            }
            setTable(_table);
        } else {
            setTable(table.map((row: Partition) => {
                row.preview = undefined;
                return row;
            }));
        }
    }

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
                        <Row table={table} setTable={setTable} i={i} unusedSpace={getUnusedSpace(i)} displayDec={displayDec} handleShoeHorn={handleShoeHorn} handleShoeHornPreview={handleShoeHornPreview}/>
                    </div>)
                })
            }
            <div className="green-row bottom" style={{height: `${green ? ".5em" : "0em"}`}}>
                <AddRow table={table} setTable={setTable} i={table.length} setGreen={setGreen} />
            </div>
        </main>
    )
}
