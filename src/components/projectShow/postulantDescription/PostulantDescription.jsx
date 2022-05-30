import React from "react";
import './PostulantDescription.css'

export function PostulantDescription({description}) {
    return (
        <div className="descriptionCard">
            {/* style="width:100%" */}
            <h5>{description}</h5>
        </div>
    )
}