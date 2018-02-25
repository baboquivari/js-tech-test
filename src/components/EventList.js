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

        this.createEvents = this.createEvents.bind(this);
        this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this);
    }

    componentDidUpdate () {
        // TODO: Create some class definitions and then just change relevant classNames instead of clogging this component up with CSS logic.        
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
            .get('http://localhost:8888/football/live?primaryMarkets=true')
            .then(res => {
                this.setState({
                    eventList: res.data.events,
                    primaryMarkets: res.data.markets,
                    outcomes: res.data.outcomes
                });
            })
            .catch(err => {
                // TODO: Could implement better handling throughout the app, creating a standardised error handler for example.
                return console.log(`Error in componentDidMount: ${err}`);
            });

        // *** WebSocket Logic ***
        // Would like to work more on this and implement visual changes based on 'status.suspended' values returned from the WebSocket. Currently I've just subscribed to all Fulltime-Result-Market Updates for the front page of the app but I'm not doing any action when a relevant update is received.

        const socket = new WebSocket('ws://localhost:8889');
        
        socket.onmessage = event => {
            const update = JSON.parse(event.data);
            
            if (!update.data) return;

            // if the incoming update is a Fulltime-Result-Market update...
            if (this.state.primaryMarkets[update.data.eventId][0].marketId === update.data.marketId) {
                console.log('Update');
            }
        };

        socket.onopen = () => {
            // subscribe to all events on homepage
            this.state.eventList.forEach(event => {
                socket.send(JSON.stringify({
                    type: 'subscribe', 
                    keys: [`e.${event.eventId}`], 
                    clearSubscription: false}
                ));
            });

            // Subscribe to all market updates (irrespective of event)
            socket.send(JSON.stringify({type: 'subscribe', keys: ['m.*']}));
        }

        socket.onclose = () => {
            console.log('WebSocket Closed');
        };
    }

    render () {
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