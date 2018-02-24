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
            <Route path='/event/:eventId' component={EventDetail}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
);