import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import PostItem from './PostItem';
import Spinner from '../layout/Spinner';
import PostForm from './PostForm';
import { loadUser } from '../../actions/auth';
const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    // const json = localStorage.getItem("recipes");
    //     const recipes = JSON.parse(json);
    //     this.setState({ recipes });
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      {posts === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary'>Posts</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome to the community
          </p>
          <PostForm />
          <div className='posts'>
            {posts
              ? posts.map((post) => {
                  return <PostItem post={post} key={post._id} />;
                })
              : ''}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  // auth: state.auth,
});
export default connect(mapStateToProps, { getPosts })(Posts);
