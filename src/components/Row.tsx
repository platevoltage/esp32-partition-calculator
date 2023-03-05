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
    data: Partition;
}


export default function Row({data}: Props) {
  return (
    <div className="row">

        <div className="column">
            <input type="text" name="name">
                {/* {data.name} */}
            </input>
        </div>

        <div className="column">
            <select name="data">
                <option value="data" selected={data.type === "data"}>data</option>
                <option value="app" selected={data.type === "app"}>app</option>
            </select>
        </div>

        <div className="column">
            <select name="sub-type">
                {data.type === "app" ? <>
                    <option value="factory" selected={data.subType === "factory"}>factory</option>
                    <option value="test" selected={data.subType === "test"}>test</option>
                    <option value="ota_0" selected={data.subType === "ota_0"}>ota_0</option>
                    <option value="ota_1" selected={data.subType === "ota_1"}>ota_1</option>
                    <option value="ota_2" selected={data.subType === "ota_2"}>ota_2</option>
                    <option value="ota_3" selected={data.subType === "ota_3"}>ota_3</option>
                    <option value="ota_4" selected={data.subType === "ota_4"}>ota_4</option>
                    <option value="ota_5" selected={data.subType === "ota_5"}>ota_5</option>
                    <option value="ota_6" selected={data.subType === "ota_6"}>ota_6</option>
                    <option value="ota_7" selected={data.subType === "ota_7"}>ota_7</option>
                    <option value="ota_8" selected={data.subType === "ota_8"}>ota_8</option>
                    <option value="ota_9" selected={data.subType === "ota_9"}>ota_9</option>
                    <option value="ota_10" selected={data.subType === "ota_10"}>ota_10</option>
                    <option value="ota_11" selected={data.subType === "ota_11"}>ota_11</option>
                    <option value="ota_12" selected={data.subType === "ota_12"}>ota_12</option>
                    <option value="ota_13" selected={data.subType === "ota_13"}>ota_13</option>
                    <option value="ota_14" selected={data.subType === "ota_14"}>ota_14</option>
                    <option value="ota_15" selected={data.subType === "ota_15"}>ota_15</option>
                </> :
                <>
                    <option value="ota" selected={data.subType === "ota"}>ota</option>
                    <option value="phy" selected={data.subType === "phy"}>phy</option>
                    <option value="nvs" selected={data.subType === "nvs"}>nvs</option>
                </>
                }

            </select>
  
        </div>

        <div className="column">
            <input type="text" name="offset">

            </input>
            0x{data.offset.toString(16)}
        </div>

        <div className="column">
            <input type="text" name="size">

            </input>
            0x{data.size.toString(16)}
        </div>

        <div className="column">
            <input type="text" name="flags">

            </input>
            {data.flags}
        </div>

    </div>
  )
}
