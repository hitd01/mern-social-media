import React, { useRef, useState } from 'react';
import './postShareStyles.scss';
// icons
import {
    UilScenery,
    UilPlayCircle,
    UilLocationPoint,
    UilSchedule,
    UilTimes,
} from '@iconscout/react-unicons';
// react redux hooks
import { useDispatch, useSelector } from 'react-redux';
// post reducer functions
import { uploadImage, uploadPost } from '../postSlice';

const serverPublic =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_DEV_PUBLIC_FOLDER
        : process.env.REACT_APP_PRODUCT_PUBLIC_FOLDER;

const PostShare = () => {
    const dispatch = useDispatch();

    // states
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const desc = useRef();
    // redux states
    const { authData } = useSelector((state) => state.auth);
    const { postLoading } = useSelector((state) => state.posts);

    // Handle image change
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img);
        }
    };

    // Handle post upload
    const handleUpload = async (event) => {
        event.preventDefault();
        // post data
        const newPost = {
            userId: authData?.user?._id,
            desc: desc.current.value,
        };

        // if there is an image with post
        if (image) {
            const data = new FormData();
            const fileName = Date.now() + image.name;
            data.append('name', fileName);
            data.append('file', image);
            newPost.image = fileName;
            try {
                dispatch(uploadImage(data));
            } catch (error) {
                console.log(error);
            }
        }
        dispatch(uploadPost(newPost));
        resetShare();
    };

    // Reset Post Share
    const resetShare = () => {
        setImage(null);
        desc.current.value = '';
    };

    return (
        <div className="PostShare">
            <img
                src={
                    authData?.user?.profilePicture
                        ? `${serverPublic}/${authData?.user?.profilePicture}`
                        : `${serverPublic}/default-profile.png`
                }
                alt=""
            />
            <form onSubmit={handleUpload}>
                <input
                    type="text"
                    placeholder="What's happening"
                    ref={desc}
                    required
                />
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
                    <button
                        className="button ps-button"
                        disabled={postLoading === 'pending'}
                        // onClick={handleUpload}
                        type="submit"
                    >
                        {postLoading === 'pending' ? 'Uploading' : 'Share'}
                    </button>
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
                        <img src={URL.createObjectURL(image)} alt="preview" />
                    </div>
                )}
            </form>
        </div>
    );
};

export default PostShare;
