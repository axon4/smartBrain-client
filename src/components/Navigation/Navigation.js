import React from 'react';

const Navigation = ({ isLoggedIn, onStageChange }) => {
	if (isLoggedIn) {
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p className='f3 link dim black underline pa3 pointer' onClick={() => {onStageChange('logOut')}}>Log-Out</p>
			</nav>
		);
	} else {
		return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<p className='f3 link dim black underline pa3 pointer' onClick={() => {onStageChange('logIn')}}>Log-In</p>
				<p className='f3 link dim black underline pa3 pointer' onClick={() => {onStageChange('register')}}>Register</p>
			</nav>
		);
	};
};

export default Navigation;