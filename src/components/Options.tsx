import React from 'react'
import FlashSize from './FlashSize'
import FileSelect from './FileSelect'
import { Partition } from './Row'
import "./Options.css"

interface Props {
    flashSize: number;
    setFlashSize: (value: number) => void;
    displayDec: boolean;
    setDisplayDec: (value: boolean) => void;
    setTable: (value: Partition[]) => void;
}

export default function Options({flashSize, setFlashSize, displayDec, setDisplayDec, setTable}: Props) {
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
                    <button className="button"> Save </button>
                </div>
            </div>
        </div>

        <div className="options-row">
            <div className="options-column">
                {/* <button>Load from file</button> */}
            </div>

        </div>

    </div>
  )
}
