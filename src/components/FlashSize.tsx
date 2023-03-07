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

        <input name="flash-size" type="number" value={flashSize} onChange={(e) =>  setFlashSize(+e.target.value) }></input>
        <div style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginRight: '.3em'}}>k</div>
        <div className="megabyte">({flashSize/1024}M)</div>
        
        <UpDown param="flash-size" getter={flashSize} setter={setFlashSize} />
    </div>
  )
}
