import { useState } from 'react';
import './Table.css';
import Row, {Partition} from './Row';


export default function Table() {
    const [table, setTable] = useState<Partition[]>([
        {
            name: "nvs", 
            type: "data", 
            subType: "nvs", 
            offset: 0x9000, 
            size: 0x5000,
        },
        {
            name: "nvs", 
            type: "app", 
            subType: "nvs", 
            offset: 0x9000, 
            size: 0x5000,
        },

    ]);

    return (
        <main>
            <header className="row">
                <div className="column">Name</div>
                <div className="column">Type</div>
                <div className="column">SubType</div>
                <div className="column">Offset</div>
                <div className="column">Size</div>
                <div className="column">Flags</div>
            </header>
            {
                table.map((partition, i) => {
                    return <Row table={table} setTable={setTable} i={i} key={i}/>
                })
            }

        </main>
    )
}
