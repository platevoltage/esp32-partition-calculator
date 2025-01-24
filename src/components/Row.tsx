import { useState, useEffect } from 'react';
import UpDown from './UpDown';
import AddRow from './AddRow';
import DeleteRow from './DeleteRow';
import './Row.css';


export interface Partition {
    name: string;
    type: string;
    subType: string;
    offset: number;
    size: number;
    flags: string;
    previewOffset?: number;
    previewSize?: number;
    new: boolean;
}

interface Props {
    table: Partition[];
    setTable: (data: Partition[]) => void;
    i: number;
    unusedSpace: number;
    displayDec: boolean;
    flashSize: number;
    setFlashSizeHighlight: (x: boolean) => void;

}


export default function Row({table, setTable, i, unusedSpace, displayDec, flashSize, setFlashSizeHighlight}: Props) {

    const [red, setRed] = useState<boolean>(false);
    const [green, setGreen] = useState<boolean>(false);
    const [expand, setExpand] = useState<boolean>(true);
    const [greenInsert, setGreenInsert] = useState<boolean>(false);

    useEffect(() => {
        console.log(
            (-unusedSpace).toString(16).toUpperCase()
        );
    },[unusedSpace]);

    useEffect(() => {
        if (table[i].new) {
            setGreen(true);
            // setExpand(false);
        }
        // setTimeout(() => {
        //     setExpand(true);
        // },300);
        setTimeout(() => {
            setGreen(false);
            table[i].new = false;
            // setTable([...table])
        }, 2000);
    }, [table]);

    function handleShoeHorn(i: number) {
        console.log("shoehorn", table);
        const _table = [...table];
        const _unusedSpace = getUnusedSpace(i);
        for (let _i = i+1; _i < _table.length; _i++) {
            _table[_i].offset -= _unusedSpace;
        }
        setTable(_table.map((row: Partition) => {
            row.previewOffset = undefined;
            return row;
        }));

    }


    function handleExpand(i: number) {
        console.log("expand", table);
        const _table = [...table];
        const _unusedSpace = getUnusedSpace(i);
        _table[i].size +=_unusedSpace;
        setTable(_table.map((row: Partition) => {
            row.previewSize = undefined;
            return row;
        }));
    }

    function handleExpandPreview(i?: number) {
        console.log("HOVER", i)
        const _table = [...table];
        if (typeof i == "number") {
            const _unusedSpace = getUnusedSpace(i);

            _table[i].previewSize = _table[i].size + _unusedSpace;
            setTable(_table);
        } else {
            setTable(table.map((row: Partition) => {
                row.previewSize = undefined;
                return row;
            }));
        }
    }

    function handleContract(i: number) {
        console.log("expand", table);
        // const _unusedSpace = getUnusedSpace(i);
        console.log(table[i].previewSize, flashSize);
        let _table = [...table];
        // _table[i].size +=_unusedSpace;
        if (_table[i].previewSize! > 0) {
            _table[i].size = _table[i].previewSize!;
            _table = _table.map((row: Partition) => {
                row.previewSize = undefined;
                return row;
            });
            setTable(_table);
            setFlashSizeHighlight(false);
        }
    }

    function handleContractPreview(i?: number) {
        console.log("HOVER", i)
        const _table = [...table];
        if (typeof i == "number" ) {
            const _unusedSpace = getUnusedSpace(i);

            _table[i].previewSize = _table[i].size + _unusedSpace;
            console.log(_unusedSpace);
            // if (_table[i].previewSize! > 0) {
                setTable(_table);
            // }
            if (table[i].previewSize! <= 0) {
                setFlashSizeHighlight(true);
            }
        } else {
            setTable(_table.map((row: Partition) => {
                row.previewSize = undefined;
                return row;
            }));
            setFlashSizeHighlight(false);
        }
    }

    function handleFixOffset(i: number) {
        console.log("expand", table);
        // const _unusedSpace = getUnusedSpace(i);
        console.log(table[i].previewSize, flashSize);
        let _table = [...table];
        _table[i].offset = 36864;
        _table[i].previewOffset = undefined;
        setTable(_table);

        
    }

    function handleFixOffsetPreview(i?: number) {
        console.log("HOVER", i)
        const _table = [...table];
        if (typeof i == "number" ) {
            const _unusedSpace = getUnusedSpace(i);

            _table[i].previewOffset = 36864;
            console.log(_unusedSpace);
            setTable(_table);
            
        } else {
            setTable(_table.map((row: Partition) => {
                row.previewOffset = undefined;
                return row;
            }));
            setFlashSizeHighlight(false);
        }
    }

    function handleShoeHornPreview(i?: number) {
        console.log("HOVER", i)
        const _table = [...table];
        if (typeof i == "number") {
            const _unusedSpace = getUnusedSpace(i);
            for (let _i = i+1; _i < _table.length; _i++) {
                _table[_i].previewOffset = _table[_i].offset - _unusedSpace;
            }
            setTable(_table);
        } else {
            setTable(table.map((row: Partition) => {
                row.previewOffset = undefined;
                return row;
            }));
        }
    }

    function getUnusedSpace(i: number) {
        const partitionSize = table[i].offset + table[i].size;
        let nextOffset = table[i+1]?.offset;
        if (isNaN(nextOffset)) {
            nextOffset = flashSize;
        }
        
        const unusedSpace: number = -(partitionSize - nextOffset);
        return unusedSpace;
    }


    let backgroundColor = () => {
        if (red) return "#ff000022";
        else if (green) return "#00ff0022";
        else return "inherit";
    }

    // setTimeout(() => {
    //     // setGreen(false);
    //     console.log("off")
    //     for (let row of table) {
    //         row.new = false;
    //     }
    //     // setTable([...table])
    // }, 2000);

  return (
    <>
    <div className="green-row" style={{height: `${greenInsert ? ".5em" : "0em"}`}}>
        <AddRow table={table} setTable={setTable} i={i} setGreenInsert={setGreenInsert} />
    </div>
    <div className={`row ${i===table.length-1 && "bottom"}`} style={{backgroundColor: backgroundColor(), height: expand ? "3em" : "0em"}}>
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

        <div className="column number">

                <input style={{color: !table[i].previewOffset ? undefined : i===0 ? "#ffff55" : "#5555ff"}} type="text" name="offset" 
                value={
                    table[i].previewOffset ?
                        !displayDec ? `${table[i].previewOffset!.toString()}` : `0x${table[i].previewOffset!.toString(16).toUpperCase()}`
                        :
                        !displayDec ? `${(table[i].offset || 0).toString()}` : `0x${(table[i].offset || 0).toString(16).toUpperCase()}`
                } 
                onChange={(e) => {
                    table[i].offset = parseInt(e.target.value);
                    setTable([...table]);
                }}>
                </input>
                {i===0 && table[i].offset !== 36864 &&
                    <>
                        <div className="error">
                            <div style={{color: "#ffff44"}}>Usually starts at {displayDec ? "0x9000" : "36864 bytes"}</div>
                        </div>
        
                        <button className="fix-offset"
                            onClick={() => handleFixOffset(i)}
                            onMouseOver={() => handleFixOffsetPreview(i)}
                            onMouseOut={() => handleFixOffsetPreview()}
                            >
                            <i className="bi bi-magic"></i>
                        </button>
                    </>
                }


            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <UpDown table={table} setTable={setTable} i={i} param={"offset"}/>
            </div>
        </div>

        <div className="column number">
            { unusedSpace < 0 && i < table.length - 1 &&
                <button className="shoehorn"
                    onClick={() => handleShoeHorn(i)}
                    onMouseOver={() => handleShoeHornPreview(i)}
                    onMouseOut={() => handleShoeHornPreview()}
                >
                    <i className="bi bi-magic"></i>
                </button>
            }
            {  unusedSpace !== 0 && i === table.length - 1 && table[i].previewSize !==  table[i].size &&
                <button className="contract"
                    onClick={() => handleContract(i)}
                    onMouseOver={() => handleContractPreview(i)}
                    onMouseOut={() => handleContractPreview()}
                >
                    <i className="bi bi-magic"></i>
                </button>
            }
            { unusedSpace > 0 && 
                <button className="expand"
                    onClick={() => handleExpand(i)}
                    onMouseOver={() => handleExpandPreview(i)}
                    onMouseOut={() => handleExpandPreview()}
                >
                    <i className="bi bi-magic"></i>
                </button>
            }
            
            <input type="text" name="size" style={{
                color: !table[i].previewSize ? undefined : 
                i === table.length-1 && table[i].previewSize! < table[i].size ?  "#ff9999" : "#99ff99"
            }}
            // value={!displayDec ? `${(table[i].size || 0).toString()}` : `0x${(table[i].size || 0).toString(16).toUpperCase()}`} 
            value={
                table[i].previewSize ?
                table[i].previewSize! <= 0 ?
                    "ADD FLASH" :
                        !displayDec ? `${table[i].previewSize!.toString()}` : `0x${table[i].previewSize!.toString(16).toUpperCase()}`
                        :
                        !displayDec ? `${(table[i].size || 0).toString()}` : `0x${(table[i].size || 0).toString(16).toUpperCase()}`
            } 
            onChange={(e) => {
                table[i].size = parseInt(e.target.value, 16);
                setTable([...table]);
            }}>
            </input>
            <div className="error">
                    {unusedSpace > 0 && <div style={{color: "#99ff99"}}>Add {!displayDec ? `${unusedSpace.toString()} bytes` : `0x${unusedSpace.toString(16).toUpperCase()}`}</div>}
                    {unusedSpace < 0 && <div style={{color: "#ff9999"}}>Subtract {!displayDec ? `${-unusedSpace.toString()} bytes` : `0x${(-unusedSpace).toString(16).toUpperCase()}`}</div>}
            </div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <UpDown table={table} setTable={setTable} i={i} param={"size"}/>
            </div>
        </div>

        <div className="column end">
            <input type="text" name="flags" value={table[i].flags} spellCheck="false" onChange={(e) => {
                table[i].flags = e.target.value;
                setTable([...table]);
            }}>

            </input>
        </div>

    </div>
    </>
  )
}
