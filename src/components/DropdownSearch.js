import React from 'react';

const DropdownSearch = props => {
    const { handleDropdownSearch, eventList } = props;

    return (
        <div>
            <h3>Search All Live</h3>
            <form>
                <select 
                    name="Search All Live"
                    onChange={handleDropdownSearch}
                >
                    { createEventList(eventList) }
                </select>
            </form>
            <p>--------------------------------</p>
        </div>
    );

    // TODO: Fix bug. Cannot select first selection.
    function createEventList (events) {
        return events.map((event, i) => {
            const eventName = event.name;
            const eventId = event.eventId;

            return (
                <option value={eventId} key={i}>{ eventName }</option>
            );
        });
    }
};

export default DropdownSearch;