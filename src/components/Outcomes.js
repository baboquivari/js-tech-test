import React from 'react';

const Outcomes = props => {

    const { marketId, outcomes, showDecimalOdds, showAllMarkets } = props;

    // console.log(outcomes[marketId]);
    if (!outcomes[marketId]) {
        return <div></div>
    }

    return outcomes[marketId].map((outcome, i) => {
        // if (showAllMarkets && i > 9) {
        //     return (
        //         <span key={i}>
        //             <div className="outcomeTitle">
        //                 { outcome.name }
        //             </div>
        //         </span>
        //     )
        // }        

        return (
            <span key={i}>
                <div className="outcomeTitle">
                    { outcome.name }
                </div>
                <div className="outcomeOdds">
                    { getPrices(outcome, showDecimalOdds) }
                </div>
            </span>
        );
    });

    function getPrices (outcome, flag) {
        if (flag) {
            return outcome.price.decimal
        }
        
        return `${outcome.price.num}/${outcome.price.den}`
    }
};

export default Outcomes;
