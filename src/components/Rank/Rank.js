import React, { Fragment } from 'react';

const Rank = ({ name, entries }) => {
	return (
		<Fragment>
			<div className='white f3'>
				{`${name}, Your Current Entry-Count Is...`}
			</div>
			<div className='white f1'>
				{entries}
			</div>
		</Fragment>
	);
};

export default Rank;