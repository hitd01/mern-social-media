import React, { useEffect, useState } from 'react';
import './postsStyles.scss';
// images
import Comment from '../../../img/comment.png';
import Share from '../../../img/share.png';
import Heart from '../../../img/like.png';
import NotLike from '../../../img/notlike.png';
// react redux hooks
import { useSelector, useDispatch } from 'react-redux';
// react router dom hooks
import { useParams } from 'react-router-dom';
// post reducer functions
import { getTimelinePosts } from '../postSlice';
// user api
import { getUser } from '../../../api/userApi';
// post api
import { likePost } from '../../../api/postApi';

const serverPublic =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_DEV_PUBLIC_FOLDER
        : process.env.REACT_APP_PRODUCT_PUBLIC_FOLDER;

const Posts = () => {
    const params = useParams();
    const dispatch = useDispatch();
    // redux states
    const { authData } = useSelector((state) => state.auth);
    const { posts, postLoading } = useSelector((state) => state.posts);
    // states
    const [postsPreview, setPostsPreview] = useState([]);

    // component mount
    useEffect(() => {
        if (authData) {
            dispatch(getTimelinePosts(authData?.user?._id));
        }
    }, [dispatch, authData]);

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            if (params.id) {
                setPostsPreview(
                    posts?.filter((post) => post.userId === params.id)
                );
            } else {
                setPostsPreview(posts);
            }
        }

        return () => {
            isMounted = false;
        };
    }, [params, posts]);

    if (postLoading !== 'success') {
        return 'No Post';
    }

    return (
        <div className="Posts">
            {postLoading === 'pending'
                ? 'Fetching posts....'
                : postsPreview.map((post) => (
                      <Post key={post._id} post={post} user={authData?.user} />
                  ))}
        </div>
    );
};

const Post = ({ post, user }) => {
    const [liked, setLiked] = useState(post.likes.includes(user?._id));
    const [likes, setLikes] = useState(post.likes.length);

    // Handle like post
    const handleLike = (postId) => {
        likePost(postId, user?._id);
        setLiked((prev) => !prev);
        liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    };

    return (
        <div className="post">
            <img
                src={post.image ? `${serverPublic}/${post.image}` : ''}
                alt=""
            />

            <div className="post-react">
                <img
                    src={liked ? Heart : NotLike}
                    alt=""
                    className="like"
                    onClick={() => handleLike(post._id)}
                />
                <img src={Comment} alt="" />
                <img src={Share} alt="" />
            </div>

            <span className="total-likes">{likes} likes</span>

            <PostDetail post={post} />
        </div>
    );
};

const PostDetail = ({ post }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            getUser(post.userId)
                .then(({ data }) => {
                    setName(data.user.firstname);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        return () => {
            isMounted = false;
        };
    }, [post]);

    return (
        <div className="detail">
            <span>
                <b>{name}</b>
            </span>
            <span> {post.desc}</span>
        </div>
    );
};

export default Posts;
