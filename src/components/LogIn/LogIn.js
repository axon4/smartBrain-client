import React from 'react';

class LogIn extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			eMail: '',
			passWord: ''
		};
	};

	onEMailChange = event => {
		this.setState({eMail: event.target.value});
	};

	onPassWordChange = event => {
		this.setState({passWord: event.target.value});
	};

	onSubmitLogIn = () => {
		const { eMail, passWord } = this.state;

		fetch(`${process.env.REACT_APP_SMARTBRAIN_SERVER}/logIn`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ eMail, passWord })
		})
			.then(response => response.json())
			.then(user => {
				if (user.ID) {
					this.props.loadUser(user);
					this.props.onStageChange('main');
				};
			});
	};

	render() {
		const { onStageChange } = this.props;
		
		return (
			<article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center'>
				<main className='pa4 black-80'>
					<div className='measure'>
						<fieldset id='log-in' className='ba b--transparent ph0 mh0'>
							<legend className='f1 fw6 ph0 mh0'>SmartBrain</legend>
							<div className='mt3'>
								<label className='db fw6 lh-copy f6' htmlFor='eMail'>EMail</label>
								<input
									className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
									type='email'
									name='eMail'
									id='eMail'
									onChange={this.onEMailChange}
								/>
							</div>
							<div className='mv3'>
								<label className='db fw6 lh-copy f6' htmlFor='passWord'>PassWord</label>
								<input
									className='autoFill b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
									type='password'
									name='passWord'
									id='passWord'
									onChange={this.onPassWordChange}
								/>
							</div>
						</fieldset>
						<div>
							<input
								className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
								type='submit'
								value='Log-In'
								onClick={this.onSubmitLogIn}
							/>
						</div>
						<div className='lh-copy mt3'>
							<p className='f6 link dim black db pointer' onClick={() => {onStageChange('register')}}>Register</p>
						</div>
					</div>
				</main>
			</article>
		);
	};
};

export default LogIn;