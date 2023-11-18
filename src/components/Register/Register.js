import React from 'react';

class Register extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			eMail: '',
			passWord: ''
		};
	};

	onNameChange = event => {
		this.setState({name: event.target.value});
	};

	onEMailChange = event => {
		this.setState({eMail: event.target.value});
	};

	onPassWordChange = event => {
		this.setState({passWord: event.target.value});
	};

	onSubmitRegister = () => {
		const { name, eMail, passWord } = this.state;

		fetch(`${process.env.REACT_APP_SMARTBRAIN_SERVER}/register`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({ name, eMail, passWord })
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
						<fieldset id='register' className='ba b--transparent ph0 mh0'>
							<legend className='f2 fw6 ph0 mh0'>SmartBrain</legend>
							<div className='mt3'>
								<label className='db fw6 lh-copy f6' htmlFor='name'>Name</label>
								<input
									className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
									type='text'
									name='name'
									id='name'
									onChange={this.onNameChange}
								/>
							</div>
							<div className='mv3'>
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
									className='b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
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
								value='Register'
								onClick={this.onSubmitRegister}
							/>
						</div>
						<div className='lh-copy mt3'>
							<p className='f6 link dim black db pointer' onClick={() => {onStageChange('logIn')}}>Log-In</p>
						</div>
					</div>
				</main>
			</article>
		);
	};
};

export default Register;