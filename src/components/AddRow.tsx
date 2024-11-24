import {Partition} from './Row';
import "./AddRow.css";


interface Props {
    table: Partition[];
    setTable: (data: Partition[]) => void;
    i: number;
    setGreen?: (green: boolean) => void;
    rowCount: number;
    setRowCount: (rowCount: number) => void;
}

export default function AddRow({table, setTable, i, setGreen, rowCount, setRowCount}: Props) {
    const blankPartition: Partition = {
        name: "",
        type: "app",
        subType: "factory",
        offset: table[i-1]?.offset+table[i-1]?.size || 36864,
        size: 0,
        flags: "",
        key: rowCount
    }
    return (<>
        <div className="arrow"></div>
        <button className={`add`} onClick={() => {
            table.splice( i, 0, blankPartition );
            setTable( [ ...table ] );
            setRowCount(rowCount+1);
        }} onMouseEnter={() => {
            if (setGreen) setGreen(true);
        }} onMouseLeave={() => {
            if (setGreen) setGreen(false);
        }}><i className="bi bi-arrow-right"></i></button>
    </>)
}
