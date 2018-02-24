import React, { Component } from 'react';
import axios from 'axios';

class EventDetail extends Component {
    constructor (props) {
        super(props);

        this.state = {
            poop: false
        };
    }

    componentDidMount () {
        // PARAM FROM REACT ROUTER
        const eventId = this.props.match.params.eventId;
        
        axios
            .get(`http://localhost:8888/sportsbook/event/${eventId}`)
            .then(res => {
                console.log(res.data.event.name);
            })
    }

    render () {
        return (
            <div>
                EventDetail
            </div>
        );
    }
}

export default EventDetail;