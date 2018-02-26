import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';
import './css/App.css';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={EventList}/>
            <Route path='/event/:eventId' component={EventDetail} />
        </Switch>
    </BrowserRouter>,

    document.getElementById('app')
);

// TODO: Add prop type validation and proper error handling
// TODO: Fix bug whereby 'showDecimalOdds' checkbox state doesn't persist between Route changes. 
// TODO: Add Loading Spinner on main pages and lazyLoad requests for better user feedback.   


