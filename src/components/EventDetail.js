import React, { Component } from 'react';
import Market from './Market';
import Outcomes from './Outcomes';
import Header from './Header';
import DropdownSearch from './DropdownSearch';
import axios from 'axios';

class EventDetail extends Component {
    constructor (props) {
        super(props);

        this.state = {
            event: {},
            eventList: [],
            markets: [],
            outcomes: {},
            showDecimalOdds: false,
            showAllMarkets: false,
            lazyLoadFetching: false,
            redirect: false
        };

        this.createMarkets = this.createMarkets.bind(this);
        this.handleShowAllMarkets = this.handleShowAllMarkets.bind(this);
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
        this.handleMarketClick = this.handleMarketClick.bind(this);
        this.handleDropdownSearch = this.handleDropdownSearch.bind(this);
    }

    componentDidMount () {
        // param from React Router
        const eventId = this.props.match.params.eventId;
        
        // fire off 2 ajax requests, one for eventList and the other for eventDetail
        axios
            .get(`http://localhost:8888/sportsbook/event/${eventId}`)
            .then(res => {
                this.setState({
                    event: res.data.event,
                    markets: res.data.markets[res.data.event.eventId],
                    outcomes: res.data.outcomes
                });

                axios
                    .get('http://localhost:8888/football/live')
                    .then(res => {
                        this.setState({
                            eventList: res.data.events
                        });
                    })
                    .catch(err => {
                        return console.log('Error in 2nd axios request' + err);
                    });
            })
            .catch(err => {
                return console.log('Error in componentDidMount-EventDetail' + err);
            });

    }

    render () {
        console.log(this.state);

        let fetching;
        if (this.state.lazyLoadFetching) {
            fetching = "Fetching"
        } else if (!this.state.lazyLoadFetching) {
            fetching = "";
        }

        return (
            <div>
                <Header handleCheckBoxClick={this.handleCheckBoxClick}/>

                <DropdownSearch 
                    handleDropdownSearch={this.handleDropdownSearch}
                    eventList={this.state.eventList}
                />

                <div>
                    <div className="eventData">
                        <p><strong>Type</strong></p>
                        { this.state.event.typeName }
                        <p><strong>Event</strong></p>
                        { this.state.event.name }
                        <p><strong>Start Time</strong></p>
                        { new Date(this.state.event.startTime).toString() }
                    </div>

                    <div className="markets">
                        <p></p>
                        ************* <h3>MARKETS</h3> *************
                        { this.createMarkets(this.state.markets, this.state.showAllMarkets) }
                    </div>

                    <div id={`showAllMarketsButton${fetching}`}>
                        <button onClick={this.handleShowAllMarkets}>
                            Show All Markets
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    createMarkets (markets, showAllMarkets) {
        const result = markets.map((market, i) => {
            const marketId = market.marketId;

            return (
                <div key={i}>
                    <Market 
                        name={market.name} 
                        handleMarketClick={this.handleMarketClick}
                        index={i}
                    />
                    <Outcomes 
                        marketId={marketId}
                        showAllMarkets={this.state.showAllMarkets}
                        outcomes={this.state.outcomes}
                        showDecimalOdds={this.state.showDecimalOdds}
                        index={i}
                    />
                </div>
            );       
        });

        return showAllMarkets ? result : result.slice(0, 10);
    }

    handleShowAllMarkets () {
        this.setState({
            showAllMarkets: true
        });
    }

    handleMarketClick (index) {
        // don't lazyLoad if user has clicked on any of first 10 pre-loaded markets
        if (index < 10) return; 

        const marketId = this.state.markets[index].marketId;

        // setlazyLoadFetching to true so a loading spinner can show
        this.setState({
            lazyLoadFetching: true
        });

        axios
            .get(`http://localhost:8888/sportsbook/market/${marketId}`)
            .then(res => {
                const outcomes = res.data.outcomes[marketId];
                this.setState({
                    outcomes: Object.assign({}, this.state.outcomes, {
                        [marketId]: outcomes 
                    }),
                    lazyLoadFetching: false
                });
            })
            .catch(err => {
                return console.log('Error in handleMarketClick' + err);
            });
    }

    handleCheckBoxClick () {
        this.setState({
            showDecimalOdds: !this.state.showDecimalOdds
        });
    }

    handleDropdownSearch (event) {
        const eventId = event.target.value;

        // redirect router to specific event page
        this.props.history.push(`/event/${eventId}`);
        window.location.reload();
    }

}


export default EventDetail;