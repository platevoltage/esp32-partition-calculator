import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {Partition} from './Row';

interface Props {
    // table: Partition[];
    setTable: (table: Partition[]) => void;
    // flashSize: number;
}

async function getCSV(fileName: string) {
    // const fileName = "huge_app.csv";
    const res = await fetch(`${process.env.PUBLIC_URL}/tables/${fileName}`);
    if (!res.ok) {
      throw res;
    }
    return (await res.text()).trim();
  }

export default function FileSelect({setTable}: Props) {
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
                for (let partition of result.data) {
                    _table.push({
                        name: partition[0].trim(), 
                        type: partition[1].trim(), 
                        subType: partition[2].trim(), 
                        offset: parseInt(partition[3], 16), 
                        size: parseInt(partition[4], 16),
                        flags: partition[5].trim()
                    });
                }
                setTable(_table);
            }
        }
    const unparseConfig: Papa.UnparseConfig = {
        quotes: false, //or array of booleans
        quoteChar: '"',
        escapeChar: '"',
        delimiter: ",\t",
        header: false,
        newline: "\n",
        skipEmptyLines: false, //other option is 'greedy', meaning skip delimiters, quotes, and whitespace.
        // columns: null //or array of strings
    }

    useEffect(() => {

        // (async () => Papa.parse(await getCSV(), parseConfig))();

    },[]);

//     app3M_fat9M_16MB.csv  default_16MB.csv      ffat.csv              max_app_8MB.csv       no_ota.csv            noota_ffat.csv
// bare_minimum_2MB.csv  default_8MB.csv       huge_app.csv          min_spiffs.csv        noota_3g.csv          rainmaker.csv
// default.csv           default_ffat.csv      large_spiffs_16MB.csv minimal.csv           noota_3gffat.csv

    return (
        <div>
            <select name="presets" onChange={(e) => {
                (async () => Papa.parse(await getCSV(e.target.value), parseConfig))();
            }}>
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
        </div>
    )
}
