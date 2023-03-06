import {Partition} from './Row';
import "./AddRow.css";


interface Props {
    table: Partition[];
    setTable: (data: Partition[]) => void;
    i: number;
    bottom?: boolean;
}

export default function AddRow({table, setTable, i, bottom}: Props) {
    const blankPartition: Partition = {
        name: "",
        type: "app",
        subType: "factory",
        offset: table[i-1]?.offset+table[i-1]?.size || 36864,
        size: 0,
    }
    return (
        <button className={`add ${i === table.length && "add-bottom"}`} onClick={() => {
            table.splice( i, 0, blankPartition );
            setTable( [ ...table ] );
        }}><i className="bi bi-arrow-right"></i></button>
    )
}
