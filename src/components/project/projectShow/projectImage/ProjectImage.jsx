import React from "react";
import './ProjectImage.css'


export function ProjectImage({title, image}) {
    return (
        <div className="cardImage">
            {/* style="width:100%" */}
            <img src={image} alt="5 Terre" width='100%' height='100px'/>
            <div className="containerImage">
            <h1>{title}</h1>
            </div>
        </div>
    )
}