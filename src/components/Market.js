import React from 'react';

const Market = props => {

    const { name, handleMarketClick, index } = props;
    
    return (
        <div 
            className="market"
            onClick={handleMarketClick.bind(null, index)}
        >
            <h4>{ name }</h4>
        </div>
    );
};

export default Market;
