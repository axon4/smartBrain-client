import React, { Fragment } from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageURL, box }) => {
    return (
        <Fragment>
            <div className='centre ma'>
                <div className='absolute mt2'>
                    <img id='inputImage' src={imageURL} alt='' width='500px' height='auto' />
                    <div className='bounding-box'
                    style={{top: box.topRow, right: box.rightColumn, bottom: box.bottomRow, left: box.leftColumn}}
                    ></div>
                </div>
            </div>
        </Fragment>
    );
};

export default FaceRecognition;