import { useState } from 'react';
import UpDown from './UpDown';
import AddRow from './AddRow';
import DeleteRow from './DeleteRow';

export interface Partition {
    name: string;
    type: string;
    subType: string;
    offset: number;
    size: number;
    flags?: string;
}

interface Props {
    table: Partition[];
    setTable: (data: Partition[]) => void;
    i: number;
    unusedSpace: number;
    displayHex: boolean;
}


export default function Row({table, setTable, i, unusedSpace, displayHex}: Props) {

    const [red, setRed] = useState<boolean>(false);
    const [green, setGreen] = useState<boolean>(false);

  return (
    <>
    <div className="green-row" style={{height: `${green ? "1em" : "0em"}`}}>
        <AddRow table={table} setTable={setTable} i={i} setGreen={setGreen}/>
    </div>
    <div className={`row ${i===table.length-1 && "bottom"}`} style={{backgroundColor: `${red ? "#ff000022" : "inherit"}`}}>
        <DeleteRow table={table} setTable={setTable} i={i} setRed={setRed}/>

        <div className="column">
            <input type="text" name="name" value={table[i].name} spellCheck="false" onChange={(e) => {
                table[i].name = e.target.value;
                setTable([...table]);
            }}>
            </input>
        </div>

        <div className="column">
            <select name="type" value={table[i].type} onChange={(e) => {
                table[i].type = e.target.value;
                setTable([...table]);
            }}>
                <option value="data">data</option>
                <option value="app">app</option>
            </select>
        </div>

        <div className="column">
            <select name="sub-type" value={table[i].subType} onChange={(e) => {
                table[i].subType = e.target.value;
                setTable([...table]);
            }}>
                {table[i].type === "app" ? <>
                    <option value="factory">factory</option>
                    <option value="test">test</option>
                    <option value="ota_0">ota_0</option>
                    <option value="ota_1">ota_1</option>
                    <option value="ota_2">ota_2</option>
                    <option value="ota_3">ota_3</option>
                    <option value="ota_4">ota_4</option>
                    <option value="ota_5">ota_5</option>
                    <option value="ota_6">ota_6</option>
                    <option value="ota_7">ota_7</option>
                    <option value="ota_8">ota_8</option>
                    <option value="ota_9">ota_9</option>
                    <option value="ota_10">ota_10</option>
                    <option value="ota_11">ota_11</option>
                    <option value="ota_12">ota_12</option>
                    <option value="ota_13">ota_13</option>
                    <option value="ota_14">ota_14</option>
                    <option value="ota_15">ota_15</option>
                </> :
                <>
                    <option value="ota">ota</option>
                    <option value="phy">phy</option>
                    <option value="nvs">nvs</option>
                    <option value="spiffs">spiffs</option>
                    <option value="fat">fat</option>
                    <option value="coredump">coredump</option>
                </>
                }

            </select>
  
        </div>

        <div className="column">

            <input type="text" name="offset" value={displayHex ? `${(table[i].offset || 0).toString()}` : `0x${(table[i].offset || 0).toString(16).toUpperCase()}`} onChange={(e) => {
                table[i].offset = parseInt(e.target.value);
                setTable([...table]);
            }}>
            </input>
            <UpDown table={table} setTable={setTable} i={i} param={"offset"}/>
        </div>

        <div className="column">
            <input type="text" name="size" value={displayHex ? `${(table[i].size || 0).toString()}` : `0x${(table[i].size || 0).toString(16).toUpperCase()}`} onChange={(e) => {
                table[i].size = parseInt(e.target.value, 16);
                setTable([...table]);
            }}>
            </input>
            <div className="error">
                    {unusedSpace > 0 && <div style={{color: "#99ff99"}}>add {displayHex ? `${unusedSpace.toString()} kb` : `0x${unusedSpace.toString(16).toUpperCase()}`}</div>}
                    {unusedSpace < 0 && <div style={{color: "#ff9999"}}>subtract {displayHex ? `${-unusedSpace.toString()} kb` : `0x${-unusedSpace.toString(16).toUpperCase()}`}</div>}
            </div>
            <UpDown table={table} setTable={setTable} i={i} param={"size"}/>
        </div>

        <div className="column">
            <input type="text" name="flags" spellCheck="false" onChange={(e) => {
                table[i].flags = e.target.value;
                setTable([...table]);
            }}>

            </input>
        </div>

    </div>
    </>
  )
}
