import Event from '../src/components/Event';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

// snapshot testing
describe('Event', () => {
    it('should render correctly', () => {

		const output = shallow(
			<Event 
				eventName={'test'} 
				eventId={'0000'}
				primaryMarket={[
					{
						eventId: 8989898,
						marketId: 989898,
						name: 'Test',
						type: 'Football'
					}
					]}
				outcomes={{
					989898: [
						{
							eventId: 8484848,
							marketId: 8484333,
							name: 'Testing',
							price: {
								decimal: 1.3,
								den: 6,
								num: 2
							}
						}
					]
				}}
				showDecimalOdds={false}
			/>
		);
      
		expect(toJson(output)).toMatchSnapshot();
    });
});

// TODO: Add more unit tests. Also, how does my app respond to bad API responses?