import React, { useRef, useState } from 'react';
import './postShareStyles.scss';
// image
import ProfileImage from '../../../img/profileImg.jpg';
// icons
import {
    UilScenery,
    UilPlayCircle,
    UilLocationPoint,
    UilSchedule,
    UilTimes,
} from '@iconscout/react-unicons';

const PostShare = () => {
    const [image, setImage] = useState(null);
    const imageRef = useRef();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage({
                image: URL.createObjectURL(img),
            });
        }
    };

    return (
        <div className="PostShare">
            <img src={ProfileImage} alt="" />
            <div>
                <input type="text" placeholder="What's happening" />
                <div className="post-options">
                    <div
                        className="option photo"
                        onClick={() => imageRef.current.click()}
                    >
                        <UilScenery />
                        Photo
                    </div>
                    <div className="option video">
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className="option location">
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className="option schedule">
                        <UilSchedule />
                        Schedule
                    </div>
                    <button className="button ps-button">Share</button>
                    <div className="file-input-wrapper">
                        <input
                            type="file"
                            name="myImage"
                            ref={imageRef}
                            onChange={onImageChange}
                        />
                    </div>
                </div>
                {image && (
                    <div className="preview-image">
                        <UilTimes onClick={() => setImage(null)} />
                        <img src={image.image} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostShare;
