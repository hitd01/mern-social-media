import React, { useState } from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../../postSide/postSlice';
import { updateUser } from '../../../../pages/auth/authSlice';

const ProfileModal = ({ modalOpened, setModalOpened, user }) => {
    const dispatch = useDispatch();
    const params = useParams();
    const theme = useMantineTheme();

    // states
    const [formData, setFormData] = useState(user);
    const [profileImage, setProfileImage] = useState(null);
    const [coverImage, setCoverImage] = useState(null);

    // Handle change form data
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle change profile image
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            event.target.name === 'profileImage'
                ? setProfileImage(img)
                : setCoverImage(img);
        }
    };

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = { ...formData };
        if (profileImage) {
            const data = new FormData();
            const fileName = Date.now() + profileImage.name;
            data.append('name', fileName);
            data.append('file', profileImage);
            userData['profilePicture'] = fileName;
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        if (coverImage) {
            const data = new FormData();
            const fileName = Date.now() + coverImage.name;
            data.append('name', fileName);
            data.append('file', coverImage);
            userData['coverPicture'] = fileName;
            try {
                dispatch(uploadImage(data));
            } catch (err) {
                console.log(err);
            }
        }
        const payload = {
            _id: params.id,
            ...userData,
        };
        dispatch(updateUser(payload));
        setModalOpened(false);
    };

    return (
        <Modal
            overlayColor={
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[9]
                    : theme.colors.gray[2]
            }
            overlayOpacity={0.55}
            overlayBlur={3}
            size="55%"
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
        >
            <form className="info-form" onSubmit={handleSubmit}>
                <h3>Your info</h3>

                <div>
                    <input
                        type="text"
                        className="info-input"
                        name="firstname"
                        placeholder="First Name"
                        value={formData.firstname}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        className="info-input"
                        name="lastname"
                        placeholder="Last Name"
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="info-input"
                        name="worksAt"
                        placeholder="Works at"
                        value={formData.worksAt}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        className="info-input"
                        name="livesIn"
                        placeholder="Lives in"
                        value={formData.livesIn}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        className="info-input"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <input
                        name="relationship"
                        type="text"
                        className="info-input"
                        placeholder="Relationship Status"
                        value={formData.relationship}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    Profile image
                    <input
                        type="file"
                        name="profileImage"
                        onChange={onImageChange}
                    />
                    Cover image
                    <input
                        type="file"
                        name="coverImage"
                        onChange={onImageChange}
                    />
                </div>

                <button className="button info-button" type="submit">
                    Update
                </button>
            </form>
        </Modal>
    );
};

export default ProfileModal;
