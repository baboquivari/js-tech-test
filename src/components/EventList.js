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