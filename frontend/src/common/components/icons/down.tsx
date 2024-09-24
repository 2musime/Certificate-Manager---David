
import React from "react";
const Down = ({className}: {className: string}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
        width="40" 
        height="20" 
        viewBox="0 0 24px 24px" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" strokeLinecap="round" 
        strokeLinejoin="round" 
        className={`${className}`}>            
        <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );
};

export default Down;

