import { useState, useEffect, ChangeEvent } from 'react';
import Papa from 'papaparse';
import {Partition} from './Row';
import { InputFiles } from 'typescript';

interface Props {
    // table: Partition[];
    setTable: (table: Partition[]) => void;
    // flashSize: number;
    rowCount: number;
    setRowCount: (rowCount: number) => void;
}

async function getCSV(fileName: string) {
    // const fileName = "huge_app.csv";
    const res = await fetch(`${process.env.PUBLIC_URL}/tables/${fileName}`);
    if (!res.ok) {
      throw res;
    }
    return (await res.text()).trim();
}

export default function FileSelect({setTable, rowCount, setRowCount}: Props) {
    const parseConfig: Papa.ParseConfig = {
        delimiter: "",	// auto-detect
        quoteChar: '"',
        escapeChar: '"',
        header: false,
        transformHeader: undefined,
        dynamicTyping: false,
        preview: 0,
        comments: "#",
        step: undefined,
        skipEmptyLines: false,
        fastMode: undefined,
        beforeFirstChunk: undefined,
        transform: undefined,
        delimitersToGuess: [',', '\t', '|', ';', Papa.RECORD_SEP, Papa.UNIT_SEP],
        complete: (result: Papa.ParseResult<string>) => {
        
                const _table: Partition[] = [];
                let count = rowCount;
                for (let partition of result.data) {
                    _table.push({
                        name: partition[0].trim(), 
                        type: partition[1].trim(), 
                        subType: partition[2].trim(), 
                        offset: parseInt(partition[3], 16), 
                        size: parseInt(partition[4], 16),
                        flags: partition[5].trim(),
                        key: count
                    });
                    count++;
                }
                setRowCount(count);
                setTable(_table);
            }
        }

    useEffect(() => { //load local storage or use defaults
        (async () => {
            let _tableString = window.localStorage.getItem("currentTable");
            if (!_tableString) {
                Papa.parse(await getCSV("default.csv"), parseConfig);
            }
            else setTable(JSON.parse(_tableString));
        })();
            
      },[]);

    function handleLoad(e: ChangeEvent<HTMLInputElement>) {
        
        let fileList = e.target.files || [];
        if (fileList.length > 0) {
            console.log(fileList[0]);
            const reader = new FileReader();
            reader.readAsText(fileList[0]);
            reader.onload = async function(e) {
                const csv = reader.result as string;
                Papa.parse(csv, parseConfig);
            };
        }

    }

    return (
        <div className="select">
            <select name="presets" value="none" onChange={(e) => {
                if (e.target.value !== "none") {
                    (async () => Papa.parse(await getCSV(e.target.value), parseConfig))();
                }

            }}>
                <option value="none">Load Example Table from Arduino</option>
                <option value="default.csv">Default 4MB with spiffs (1.2 APP/1.5MB SPIFFS)</option>
                <option value="default_ffat.csv">Default 4MB with ffat (1.2 APP/1.5MB FATFS)</option>
                {/* <option value="ffat.csv">ffat</option> */}
                <option value="default_8MB.csv">8M with spiffs (3MB APP/1.5MB SPIFFS)</option>
                <option value="minimal.csv">Minimal (1.3MB APP/700KB SPIFFS)</option>
                <option value="no_ota.csv">No OTA (2MB APP/2MB SPIFFS)</option>
                <option value="noota_3g.csv">No OTA (1MB APP/3MB SPIFFS)</option>
                <option value="noota_ffat.csv">No OTA (2MB APP/2MB FATFS)</option>
                <option value="noota_3gffat.csv">No OTA (1MB APP/3MB FATFS)</option>
                <option value="huge_app.csv">Huge App (3MB No OTA/1MB SPIFFS)</option>
                <option value="min_spiffs.csv">Minimal SPIFFS (1.9MB APP with OTA/190KB SPIFFS)</option>
                {/* <option value="bare_minimum_2MB.csv">bare_minimum_2MB</option> */}
                {/* <option value="max_app_8MB.csv">max_app_8MB</option> */}
                {/* <option value="large_spiffs_16MB.csv">large_spiffs_16MB</option> */}
                <option value="default_16MB.csv">16M Flash (2MB APP/12.5MB FATFS)</option>
                <option value="app3M_fat9M_16MB.csv">16M Flash (3MB APP/9.9MB FATFS)</option>
                <option value="rainmaker.csv">RainMaker</option> 
            </select>
            {/* <input type="file">upload</input> */}
                <br></br>
                <br></br>
            <label className="file-upload">
            <input type="file" id="csvupload" name="csvupload" accept="text/csv" onChange={handleLoad}></input>Upload csv
            </label>
        </div>
    )
}
