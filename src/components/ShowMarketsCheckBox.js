import React from 'react';

const ShowMarketsCheckBox = props => {
    const { handleCheckBoxClick } = props;

    return (
        <form action="">
            <span id="primaryMarketsCheckBox">
                Show Primary Markets
                <input 
                    type="checkbox"
                    onClick={handleCheckBoxClick.bind(null, 'markets')}
                ></input>
            </span>
        </form>
    );
};

export default ShowMarketsCheckBox;