import React from 'react';

const CheckBoxes = props => {
    const { handleCheckBoxClick } = props;

    return (
        <form action="">
            Show Primary Markets
            <input 
                type="checkbox"
                onClick={handleCheckBoxClick.bind(null, 'markets')}
            ></input>
            Show Decimal Odds
            <input 
                type="checkbox"
                onClick={handleCheckBoxClick.bind(null, 'odds')}                   
            ></input>
        </form>
    );
};

export default CheckBoxes;