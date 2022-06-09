import React from 'react';
import './FinancingInfo.css';

function FinancingInformation({ currentFinancing, goalFinancing }) {
  return (
    <div className="infoOfFinancing">
      <div className="row">
        {/* style="width:100%" */}
        <div className="columnCurrent">
          Financiamiento actual: $
          {currentFinancing}
        </div>
        <div className="columnGoal">
          Financiamiento meta: $
          {goalFinancing}
        </div>
      </div>
    </div>
  );
}

export default FinancingInformation;
