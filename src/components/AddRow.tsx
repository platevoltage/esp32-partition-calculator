import {Partition} from './Row';
import "./AddRow.css";


interface Props {
    table: Partition[];
    setTable: (data: Partition[]) => void;
    i: number;
    setGreen?: (green: boolean) => void;
}

export default function AddRow({table, setTable, i, setGreen}: Props) {
    const blankPartition: Partition = {
        name: "",
        type: "app",
        subType: "factory",
        offset: table[i-1]?.offset+table[i-1]?.size || 36864,
        size: 0,
        flags: ""
    }
    return (<>
        <div className="arrow"></div>
        <button className={`add`} onClick={() => {
            table.splice( i, 0, blankPartition );
            setTable( [ ...table ] );
        }} onMouseEnter={() => {
            if (setGreen) setGreen(true);
        }} onMouseLeave={() => {
            if (setGreen) setGreen(false);
        }}><i className="bi bi-arrow-right"></i></button>
    </>)
}
