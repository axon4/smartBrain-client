import React, { Component, Fragment } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import LogIn from './components/LogIn/LogIn';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particlesOptions = {
	particles: {
		number: {
			value: 82,
			density: {
				enable: true,
				value_area: 791
			}
		}
	}
};

const initialState = {
	stage: 'logIn',
	isLoggedIn: false,
	user: {
		ID: 0,
		name: '',
		eMail: '',
		entries: 0
	},
	inPut: '',
	imageURL: '',
	boxes: []
};

class App extends Component {
	constructor() {
		super();

		this.state = initialState;
	};

	loadUser = userData => {
		this.setState({
			user: {
				ID: userData.ID,
				name: userData.name,
				eMail: userData.eMail,
				entries: userData.entries
			}
		});
	};

	onStageChange = stage => {
		if (stage === 'logOut') {
			this.setState(initialState);
		} else if (stage === 'main') {
			this.setState({isLoggedIn: true});
		};

		this.setState({ stage });
	};

	onInPutChange = event => {
		this.setState({inPut: event.target.value});
	};

	detectFaceLocations = data => {
		return data.outputs[0].data.regions.map(face => {
			const faceLocationData = face.region_info.bounding_box;

			const image = document.getElementById('inPutImage');
			const width = Number(image.width);
			const height = Number(image.height);

			return {
				topRow: faceLocationData.top_row * height,
				rightColumn: width - (faceLocationData.right_col * width),
				bottomRow: height - (faceLocationData.bottom_row * height),
				leftColumn: faceLocationData.left_col * width
			};
		});
	};

	disPlayDetectionBoxes = boxes => {
		this.setState({ boxes });
	};

	onImageSubmit = () => {
		this.setState({imageURL: this.state.inPut});

		fetch(`${process.env.REACT_APP_SMARTBRAIN_SERVER}/APICall`, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({inPut: this.state.inPut})
		})
			.then(response => response.json())
			.then(response => {
				// debugger;

				if (response) {
					fetch(`${process.env.REACT_APP_SMARTBRAIN_SERVER}/image`, {
						method: 'PUT',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({ID: this.state.user.ID})
					})
						.then(response => response.json())
						.then(count => this.setState(Object.assign(this.state.user, {entries: count})))
						.catch(error => console.log(error));
				};

				this.disPlayDetectionBoxes(this.detectFaceLocations(response));
			})
			.catch(error => console.log(error));
	};

	render() {
		const { stage, isLoggedIn, user, imageURL, boxes } = this.state;
		
		return (
			<div className='App'>
				<Particles className='particles' params={particlesOptions} />
				<Navigation isLoggedIn={isLoggedIn} onStageChange={this.onStageChange} />
				{stage === 'main' ? (
					<Fragment>
						<Logo />
						<Rank name={user.name} entries={user.entries} />
						<ImageLinkForm onInPutChange={this.onInPutChange} onImageSubmit={this.onImageSubmit} />
						<FaceRecognition imageURL={imageURL} boxes={boxes} />
					</Fragment>
				) : (stage === 'logIn'
						? <LogIn loadUser={this.loadUser} onStageChange={this.onStageChange} />
						: <Register loadUser={this.loadUser} onStageChange={this.onStageChange} />
				)}
			</div>
		);
	};
};

export default App;