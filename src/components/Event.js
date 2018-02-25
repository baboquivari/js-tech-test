import React from 'react';
import { Link } from 'react-router-dom';

const Event = props => {
    const { eventName, eventId, primaryMarket, outcomes, showDecimalOdds } = props;

    const marketId = primaryMarket[0].marketId;
    const marketOutcomes = outcomes[marketId];

    // TODO: Show the start time next to the desc. Just show absolute value, don't try to calc time elapsed.
    return (
        <Link to={`/event/${eventId}`}>
            <li>{ eventName }</li>

            <div className="primaryMarket">
                <div id="primaryMarketName">
                    { primaryMarket[0].name }
                    ||
                </div>
                <div id="primaryMarketDescription">
                    { primaryMarket[0].type }
                </div>
                <div id="primaryMarketOutcomes">
                    { 
                        <ul>
                            { getPrices(marketOutcomes, showDecimalOdds) } 
                        </ul>
                    }
                </div>
            </div>
        </Link>
    );

    function getPrices (outcomes, showDecimalOdds) {
        return outcomes.map((outcome, i) => {
            return (
                <li key={i}>
                    { 
                        showDecimalOdds
                        ? outcome.price.decimal  
                        : `${outcome.price.num}/${outcome.price.den}`
                    }
                </li>
            );
        });
    }
};

export default Event;