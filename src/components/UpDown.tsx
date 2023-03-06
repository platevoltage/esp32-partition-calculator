import React from 'react'
import { Partition } from './Row';
interface Props {
    table: Partition[];
    setTable: (data: Partition[]) => void;
    i: number;
    param: string;
}

export default function UpDown({table, setTable, i, param}: Props) {
  return (
    <div className="up-down">
    <button onClick={() => {
        if (param === "size") table[i].size += 4096;
        if (param === "offset") table[i].offset += 4096;
        setTable([...table]);
    }}><i className="bi bi-caret-up-fill"></i></button>
    <button onClick={() => {
        if (param === "size") table[i].size -= 4096;
        if (param === "offset") table[i].offset -= 4096;
        setTable([...table]);
    }}><i className="bi bi-caret-down-fill"></i></button>
    </div>
  )
}
