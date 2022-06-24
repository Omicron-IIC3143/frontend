import React from 'react';
import './FinancingInfo.css';
import convertMoneyToString from '../../../../hooks/convertNumber';

function FinancingInformation({ currentFinancing, goalFinancing, className }) {
  return (
    <div className={`infoOfFinancing ${className}`}>
      <div className="row">
        {/* style="width:100%" */}
        <div className="columnCurrent">
          <div>
            <b>
              <u>
                Financiamiento actual
              </u>
            </b>
          </div>
          <div>
            $
            {convertMoneyToString(currentFinancing)}
          </div>
        </div>
        <div className="columnGoal">
          <div>
            <b>
              <u>
                Financiamiento meta
              </u>
            </b>
          </div>
          <div>
            $
            {convertMoneyToString(goalFinancing)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinancingInformation;
