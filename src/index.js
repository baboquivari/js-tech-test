import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/App.css';

import EventList from './components/EventList';
import EventDetail from './components/EventDetail';

// TODO: Need to figure out how to pass props down in ReactRouterV4
ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={EventList}/>
            <Route path='/event/:eventId' component={EventDetail} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
);

// TODO: TEST REACT COMPONENTS FOR EACH PAGE. Just do a couple and then add some TODOS for what you WOULD do.
// TODO: How does my React app handle a weird response? ERROR HANDLING. Basically, how does my app respond to weird inputs form an API that I haven't written?

// TODO: Add prop type validation and proper error handling
// TODO: Try fix bug whereby 'showDecimalOdds' state doesn't persist between Route changes. How can I do this?
// MAKE HELPER FUNCTIONS WHERE YOU CAN
// Add Loading Spinner on EventDetail   

// Think about loading spinners for your main pages when inital requests are firing

// TODO: Pull in docker.yml and write my own Dockerfile with a START command which basically runs webpack dev server and a TEST command which runs some Jest Tests.