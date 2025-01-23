import React from 'react'
import UpDown from './UpDown';

interface Props {
    flashSize: number;
    setFlashSize: (value: number) => void;
    highlight: boolean;
}

export default function FlashSize({flashSize, setFlashSize, highlight}: Props) {
  return (
    <div className="input">
        <div style={{backgroundColor: highlight ? "#ff222288" : "#00000000", display: "flex", padding: "10px", borderRadius: "6px", transition: "background-color .5s"}}>
          <label htmlFor="flashSize">Flash Size:
          </label>

          <input name="flash-size" type="number" value={flashSize} onChange={(e) =>  setFlashSize(+e.target.value) }></input>
          <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: '.3em', }}>k</div>
          <div className="megabyte">({flashSize/1024}M)</div>
        
          <UpDown param="flash-size" getter={flashSize} setter={setFlashSize} />
        </div>
    </div>
  )
}
