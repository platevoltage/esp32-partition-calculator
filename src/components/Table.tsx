import React from 'react'
import './Table.css';
import Row from './Row';

export default function Table() {
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
      <Row />
    </main>
  )
}
