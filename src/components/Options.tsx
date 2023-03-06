import React from 'react'
import FlashSize from './FlashSize'
import FileSelect from './FileSelect'
import { Partition } from './Row'
import "./Options.css"

interface Props {
    flashSize: number;
    setFlashSize: (value: number) => void;
    displayHex: boolean;
    setDisplayHex: (value: boolean) => void;
    setTable: (value: Partition[]) => void;
}

export default function Options({flashSize, setFlashSize, displayHex, setDisplayHex, setTable}: Props) {
  return (
    <div className="options">

        <div className="options-row">
            <div className="options-column">
                <FlashSize flashSize={flashSize} setFlashSize={setFlashSize} />
            </div>

            <div className="options-column">
                <label htmlFor="hex">
                <input type="checkbox" name="hex" checked={displayHex} onChange={() => setDisplayHex(!displayHex)} />
                Decimal Values
                </label> 
            </div>
        </div>

        <div className="options-row">
            <div className="options-column">
                <FileSelect setTable={setTable} />
            </div>
            <div className="options-column">
                
            </div>
        </div>

    </div>
  )
}
