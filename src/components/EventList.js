import React, { Component } from 'react';
import Event from './Event';
import Header from './Header';
import ShowMarketsCheckBox from './ShowMarketsCheckBox';
import axios from 'axios';
            
class EventList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            eventList: [],
            primaryMarkets: [],
            outcomes: [],
            showPrimaryMarket: false,
            showDecimalOdds: false
        };

        this.createEvents = this.createEvents.bind(this)
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this)
    }

    componentDidUpdate () {
        // TODO: All this CSS needs to tidied up. I should create some class definitions and then just change classNames, instead of clogging this component up with CSS logic.        
        this.state.showPrimaryMarket ? styleDivs('block') : styleDivs('none');
        
        function styleDivs (action) {
            const primaryMarketDivs = document.querySelectorAll('.primaryMarket');

            primaryMarketDivs.forEach(div => {
                div.style.display = action;
            });
        }
    }

    componentDidMount () {
        axios
            // TODO: Pop this URL into an ENV variable / config file
            .get('http://localhost:8888/football/live?primaryMarkets=true')
            .then(res => {
                this.setState({
                    eventList: res.data.events,
                    primaryMarkets: res.data.markets,
                    outcomes: res.data.outcomes
                });
            })
            .catch(err => {
                // TODO: Have better error handling than just cLogs here
                return console.log(err);
            });

        // FIXME: Uncomment to continue on with WS stuff
        return;

        // connect to WebSocket server
        const w = new WebSocket('ws://localhost:8889');
        
        w.onmessage = event => {
            // TODO: Fix cannot read property eventId of undefined
            const update = JSON.parse(event.data);
            // console.log(update);

            // if the incoming update is a fulltime-result-market update...
            if (this.state.primaryMarkets[update.data.eventId][0].marketId == update.data.marketId) {
                // TODO: Now write the code in this console.log
                console.log('now lets update the specific full-time-result market\'s status obj');
            }

            console.log(this.state.primaryMarkets[update.data.eventId][0].marketId);
            console.log(update.data.marketId);

        }

        w.onopen = e => {
            console.log('socket opened');

            // SUBSCRIPTIONS
            // sub to all events on homepage. event subscription. this one is SLOW, not even sure if it's working.
            this.state.eventList.forEach(event => {
                w.send(JSON.stringify({
                    type: 'subscribe', 
                    keys: [`e.${event.eventId}`], 
                    clearSubscription: false}
                ));
            });

            // Subscribe to all market updates (irrespective of event)
            w.send(JSON.stringify({type: "subscribe", keys: ["m.*"]}));
            
            // REQUESTS

            // Fetch market data
            // w.send(JSON.stringify({type: "market", id: 93650821 }));
            // // request Event data (can do this through the Sportsbook API too)
            // w.send(JSON.stringify({type: "event", id: 21249949 }));

        }

        w.onclose = event => {
            console.log('WebSocket Closed');
        }
    }

    render () {
        console.log(this.state);

        return (
            <div>

                <Header handleCheckBoxClick={this.handleCheckBoxClick}/>

                <ShowMarketsCheckBox handleCheckBoxClick={this.handleCheckBoxClick} />

                <div className="eventList">
                    <ul>
                        { this.createEvents(this.state.eventList) }
                    </ul>
                </div>
            </div>
        );
    }

    createEvents (events) {
        return events.map((event, i) => {
            return (
                <Event 
                    eventName={event.name} 
                    eventId={event.eventId}
                    primaryMarket={this.state.primaryMarkets[event.eventId]}
                    outcomes={this.state.outcomes}
                    showDecimalOdds={this.state.showDecimalOdds}
                    key={i}
                />
            );
        });
    }

    handleCheckBoxClick (checkbox) {
        if (checkbox === 'markets') {
            this.setState({
                showPrimaryMarket: !this.state.showPrimaryMarket
            });
        } else {
            this.setState({
                showDecimalOdds: !this.state.showDecimalOdds
            });
        }
    }
}

export default EventList;