import React from 'react';
import './FinancingInfo.css';

function FinancingInformation({ currentFinancing, goalFinancing }) {
  return (
    <div className="infoOfFinancing">
      <div className="row">
        {/* style="width:100%" */}
        <div className="columnCurrent">
          <div>Financiamiento actual:</div>
          <div>
            $
            {currentFinancing}
          </div>
        </div>
        <div className="columnGoal">
          <div>Financiamiento meta:</div>
          <div>
            $
            {goalFinancing}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancingInformation;
