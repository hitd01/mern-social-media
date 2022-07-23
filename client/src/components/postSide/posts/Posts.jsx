import React from 'react';
import './postsStyles.scss';
// data
import { postsData } from '../../../data/PostsData';
// images
import Comment from '../../../img/comment.png';
import Share from '../../../img/share.png';
import Heart from '../../../img/like.png';
import NotLike from '../../../img/notlike.png';

const Posts = () => {
    return (
        <div className="Posts">
            {postsData.map((post, index) => (
                <div className="post" key={index}>
                    <img src={post.img} alt="" />

                    <div className="post-react">
                        <img src={post.liked ? Heart : NotLike} alt="" />
                        <img src={Comment} alt="" />
                        <img src={Share} alt="" />
                    </div>

                    <span className="total-likes">{post.likes} likes</span>

                    <div className="detail">
                        <span>
                            <b>{post.name}</b>
                        </span>
                        <span> {post.desc}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Posts;
