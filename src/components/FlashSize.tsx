import React from 'react'
import UpDown from './UpDown';

interface Props {
    flashSize: number;
    setFlashSize: (value: number) => void;
}

export default function FlashSize({flashSize, setFlashSize}: Props) {
  return (
    <div>
        <label htmlFor="flashSize"  style={{width: "10em"}}>Flash Size
            <input name="flash-size" type="text" value={flashSize} onChange={(e) =>  setFlashSize(+e.target.value) }></input>
        </label>
        {/* <UpDown table={table} setTable={setTable} i={i} param={"offset"}/> */}
    </div>
  )
}
