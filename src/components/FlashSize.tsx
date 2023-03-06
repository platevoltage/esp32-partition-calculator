import React from 'react'
import UpDown from './UpDown';

interface Props {
    flashSize: number;
    setFlashSize: (value: number) => void;
}

export default function FlashSize({flashSize, setFlashSize}: Props) {
  return (
    <div className="input">
        <label htmlFor="flashSize">Flash Size:
        </label>

        <input name="flash-size" type="text" value={flashSize} onChange={(e) =>  setFlashSize(+e.target.value) }></input>
        
        <UpDown param="flash-size" getter={flashSize} setter={setFlashSize} />
    </div>
  )
}
