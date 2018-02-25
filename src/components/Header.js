import React from 'react';
import { Link } from 'react-router-dom';

// TODO: Make a SkyBet Banner across the page here. Make it clickable with Link
const Header = props => {

    const { handleCheckBoxClick } = props; 

    return (
        <div>
            <Link to="/">
                <div id="header">
                    <h1>SkyBet Banner</h1>
                </div>
            </Link>
            <span id="decimalOddsCheckBox">
                Show Decimal Odds
                <input 
                    type="checkbox"
                    onClick={handleCheckBoxClick.bind(null, 'odds')}                   
                ></input>
            </span>
        </div> 
    );
};

export default Header;