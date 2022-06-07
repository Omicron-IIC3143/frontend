import React from 'react';
import './FinancingInfo.css';

export function FinancingInformation({ current_financing, goal_financing }) {
  return (
    <div className="infoOfFinancing">
      <div className="row">
        {/* style="width:100%" */}
        <div className="columnCurrent">
          Financiamiento actual: $
          {current_financing}
        </div>
        <div className="columnGoal">
          Financiamiento meta: $
          {goal_financing}
        </div>
      </div>
    </div>
  );
}
