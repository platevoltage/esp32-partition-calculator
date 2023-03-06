import React from 'react'
import { Partition } from './Row';
import './UpDown.css';

interface Props {
    table?: Partition[];
    setTable?: (data: Partition[]) => void;
    getter?: number;
    setter?: (data: number) => void;
    i?: number;
    param?: string;
}

export default function UpDown({table = [], setTable, getter = 0, setter, i = 0, param}: Props) {
  return (
    <div className="up-down">
    <button onClick={() => {
        if (param === "size" && table) table[i].size = Math.floor(table[i].size / 4096) * 4096 + 4096;
        if (param === "offset") table[i].offset = Math.floor(table[i].offset / 4096) * 4096 + 4096;
        if (param === "flash-size" && setter) setter(Math.floor(getter / 1024) * 1024 + 1024);
        if (setTable) setTable([...table]);
    }}><i className="bi bi-caret-up-fill"></i></button>
    <button onClick={() => {
        if (param === "size") table[i].size = Math.floor(table[i].size / 4096) * 4096 - 4096;
        if (param === "offset") table[i].offset = Math.floor(table[i].offset / 4096) * 4096 - 4096;
        if (param === "flash-size" && setter) setter(Math.floor(getter / 1024) * 1024 - 1024);
        if (setTable) setTable([...table]);
    }}><i className="bi bi-caret-down-fill"></i></button>
    </div>
  )
}
