import React, { Fragment } from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInPutChange, onImageSubmit }) => {
	return (
		// template-strings for other detection-models
		<Fragment>
			<p className='f3'>
				{'SmartBrain Will Detect Faces In Your Images; Give It A Try'}
			</p>
			<div className='centre'>
				<div className='form centre pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInPutChange} />
					<button className='f4 w-30 grow link ph3 pv2 dib white bg-light-purple' onClick={onImageSubmit}>Detect</button>
				</div>
			</div>
		</Fragment>
	);
};

export default ImageLinkForm;