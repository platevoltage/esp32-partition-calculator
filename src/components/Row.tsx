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
        <div className="column">{data.name}</div>
        <div className="column">{data.type}</div>
        <div className="column">{data.subType}</div>
        <div className="column">0x{data.offset.toString(16)}</div>
        <div className="column">0x{data.size.toString(16)}</div>
        <div className="column">{data.flags}</div>
    </div>
  )
}
