import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, boxes }) => {
	return (
		<div className='centre ma'>
			<div className='absolute mt2'>
				<img id='inPutImage' src={imageURL} width='500px' height='auto' />
				{boxes.map(box => <div key={box.rightColumn} style={{top: box.topRow, right: box.rightColumn, bottom: box.bottomRow, left: box.leftColumn}} className='bounding-box' />)}
			</div>
		</div>
	);
};

export default FaceRecognition;