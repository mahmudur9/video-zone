import './Avatar.scss';
import React from 'react';

import AvatarImage from '../../assets/images/avatar.jpg';

const Avatar = ({image, radius}) => {
    return (
        <div className="avatar-main-container" style={{width: radius, height: radius}}>
            <div className="avatar-container">
                <div className="avatar-image">
                    <img src={image} alt="Avatar" style={{width: radius, height: radius}}/>
                </div>
            </div>
        </div>
    );
};

export default Avatar;
