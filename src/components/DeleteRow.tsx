
import {Partition} from './Row';
import "./DeleteRow.css";

interface Props {
    table: Partition[];
    setTable: (data: Partition[]) => void;
    i: number;
    bottom?: boolean;
}

export default function DeleteRow({table, setTable, i, bottom}: Props) {
  return (
    <button className="remove" onClick={() => {
        table.splice( i, 1);
        setTable( [ ...table ] );
    }}><i className="bi bi-scissors"></i></button>
  )
}
