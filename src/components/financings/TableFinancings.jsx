import React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './TableFinancings.css';
import stringOfDate from '../../hooks/stringOfDate';
import convertMoneyToString from '../../hooks/convertNumber';

function TableFinancings({ financings }) {
  return (
    <Table responsive stripped bordered hover size="md" className="table-financings">
      <tr>
        <th className="celda-head celda-left">Nombre del proyecto</th>
        <th className="celda-head">Monto (CLP)</th>
        <th className="celda-head celda-right">Fecha (dd-mm-aaaa)</th>
      </tr>
      {financings.map((financing) => (
        <tr>
          <td className="celda-row celda-left">
            <Link className="color-link-project-financings" to={`/projects/${financing[1]}`}>{financing[4]}</Link>
          </td>
          <td className="celda-row">{convertMoneyToString(financing[2])}</td>
          <td className="celda-row celda-right">{stringOfDate(financing[3])}</td>
          {/* <td className="celda">{financing[3]}</td> */}
        </tr>
      ))}
    </Table>
  );
}

export default TableFinancings;
