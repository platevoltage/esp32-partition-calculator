import {Partition} from './Row';
import "./AddRow.css";


interface Props {
    table: Partition[];
    setTable: (data: Partition[]) => void;
    i: number;
    setGreenInsert?: (green: boolean) => void;
    setGreen?: (green: boolean) => void;
}

export default function AddRow({table, setTable, i, setGreenInsert, setGreen}: Props) {
    const blankPartition: Partition = {
        name: "",
        type: "app",
        subType: "factory",
        offset: table[i-1]?.offset+table[i-1]?.size || 36864,
        size: 0,
        flags: "",
        new: true
    }
    return (<>
        <div className="arrow"></div>
        <button className={`add`} onClick={() => {
            table.splice( i, 0, blankPartition );
            setTable( [ ...table ] );
            if (setGreen) setGreen(true);
            if (setGreenInsert) setGreenInsert(false);
        }} onMouseEnter={() => {
            if (setGreenInsert) setGreenInsert(true);
        }} onMouseLeave={() => {
            if (setGreenInsert) setGreenInsert(false);
        }}><i className="bi bi-arrow-right"></i></button>
    </>)
}
