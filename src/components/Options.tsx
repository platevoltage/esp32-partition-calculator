import React from 'react'
import FlashSize from './FlashSize'
import FileSelect from './FileSelect'
import { Partition } from './Row'
import "./Options.css"
import Papa from 'papaparse';

interface Props {
    flashSize: number;
    setFlashSize: (value: number) => void;
    displayDec: boolean;
    setDisplayDec: (value: boolean) => void;
    table: Partition[];
    setTable: (value: Partition[]) => void;
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




export default function Options({flashSize, setFlashSize, displayDec, setDisplayDec, table, setTable}: Props) {
    
    const handleDownload = () => {
        const _table: {}[] = [];
        for (let partition of table) {
            const _partition = {
                name: partition.name.trim(),
                type: partition.type.trim(),
                subType: partition.subType.trim(),
                offset: `0x${partition.offset.toString(16)}`,
                size: `0x${partition.size.toString(16)}`,
                flags: partition.flags.trim()
            }
            _table.push(_partition);
        }
        let csv = "# Name,\tType,\tSubType,\tOffset,\tSize,\tFlags\n";
        csv += Papa.unparse(_table, unparseConfig);
        const blob = new Blob([csv], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = "partitions.csv";
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
    <div className="options">

        <div className="options-row">
            <div className="options-column">
                <FlashSize flashSize={flashSize} setFlashSize={setFlashSize} />
            </div>

            <div className="options-column">
                <label htmlFor="hex">
                Show Decimal Values (bytes):
                <input className="checkbox" type="checkbox" name="hex" checked={!displayDec} onChange={() => setDisplayDec(!displayDec)} />
                </label> 
            </div>
        </div>

        <div className="options-row">
            <div className="options-column">
                <FileSelect setTable={setTable} />
            </div>
            <div className="options-column">
                <div className="options-column">
                    <button className="button" onClick={handleDownload}>Save</button>
                </div>
            </div>
        </div>

        <div className="options-row">
            <div className="options-column">
            </div>

        </div>

    </div>
  )
}
