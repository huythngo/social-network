import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { updateLikes, deletePost } from '../../actions/post';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
  auth,
  updateLikes,
  deletePost,
}) => {
  const history = useHistory();
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        <button
          type='button'
          className='btn btn-light'
          onClick={() => updateLikes(_id)}
        >
          {likes !== null &&
          likes.filter((like) => like.user === auth.user._id).length > 0 ? (
            <i className='fas fa-thumbs-up text-primary'></i>
          ) : (
            <i className='fas fa-thumbs-up '></i>
          )}

          {likes && likes.length > 0 ? (
            <span> {likes.length}</span>
          ) : (
            <span> </span>
          )}
        </button>

        <Link to={`/posts/${_id}`} className='btn btn-primary'>
          Comment{' '}
          {comments && comments.length > 0 ? (
            <span className='comment-count'> {comments.length}</span>
          ) : (
            <span> </span>
          )}
        </Link>
        {!auth.loading && user === auth.user._id && (
          <button
            type='button'
            className='btn btn-danger'
            onClick={() => {
              deletePost(_id);
              history.push('/posts');
            }}
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { updateLikes, deletePost })(PostItem);
