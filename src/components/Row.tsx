import React from 'react'

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
}


export default function Row({table, setTable, i}: Props) {
  return (
    <div className="row">

        <div className="column">
            <input type="text" name="name" onChange={(e) => {
                table[i].name = e.target.value;
                setTable([...table]);
            }}>
                {/* {data.name} */}
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
                </>
                }

            </select>
  
        </div>

        <div className="column">
            0x<input type="text" name="offset" onChange={(e) => {
                table[i].offset = parseInt(e.target.value, 16);
                setTable([...table]);
            }}>

            </input>
            {/* 0x{table[i].offset.toString(16)} */}
        </div>

        <div className="column">
            0x<input type="text" name="size" onChange={(e) => {
                table[i].size = parseInt(e.target.value, 16);
                setTable([...table]);
            }}>

            </input>
            {/* 0x{table[i].size.toString(16)} */}
        </div>

        <div className="column">
            <input type="text" name="flags" onChange={(e) => {
                table[i].flags = e.target.value;
                setTable([...table]);
            }}>

            </input>
            {table[i].flags}
        </div>

    </div>
  )
}
