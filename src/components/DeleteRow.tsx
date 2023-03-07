
import {Partition} from './Row';
import "./DeleteRow.css";

interface Props {
    table: Partition[];
    setTable: (data: Partition[]) => void;
    i: number;
    bottom?: boolean;
    setRed: (red: boolean) => void;
}

export default function DeleteRow({table, setTable, i, bottom, setRed}: Props) {
  return (
 
    <button className="remove" onClick={() => {
        table.splice( i, 1);
        setTable( [ ...table ] );
    }} onMouseEnter={() => {
      setRed(true);
    }} onMouseLeave={() => {
      setRed(false);
    }}>
      <i className="bi bi-scissors"></i>
    </button>

  )
}
