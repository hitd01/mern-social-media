import React from 'react';
import './postSideStyles.scss';
// components
import Posts from './posts/Posts';
import PostShare from './postShare/PostShare';

const PostSide = () => {
    return (
        <div className="PostSide">
            <PostShare />
            <Posts />
        </div>
    );
};

export default PostSide;
