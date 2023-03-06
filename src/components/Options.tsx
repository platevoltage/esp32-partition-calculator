import React from 'react'
import FlashSize from './FlashSize'
import FileSelect from './FileSelect'
import { Partition } from './Row'

interface Props {
    flashSize: number;
    setFlashSize: (value: number) => void;
    displayHex: boolean;
    setDisplayHex: (value: boolean) => void;
    setTable: (value: Partition[]) => void;
}

export default function Options({flashSize, setFlashSize, displayHex, setDisplayHex, setTable}: Props) {
  return (
    <div>
        <br></br>
        <FlashSize flashSize={flashSize} setFlashSize={setFlashSize} />
        <br></br>
        <FileSelect setTable={setTable} />
        <br></br>
        
        <label htmlFor="hex">
          <input type="checkbox" name="hex" checked={displayHex} onChange={() => setDisplayHex(!displayHex)} />
          Decimal Values
        </label> 
    </div>
  )
}
