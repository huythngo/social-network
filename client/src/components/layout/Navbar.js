import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          {' '}
          <i class='fas fa-users'></i> Users
        </Link>
      </li>
      <li>
        {user && (
          <Link to={`/profile/${user._id}`}>
            <i className='fas fa-user' />{' '}
            <span className='hide-sm'>My Profile</span>
          </Link>
        )}
      </li>
      <li>
        <Link to='/posts'>
          <span className='hide-sm'>Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/login' onClick={logout}>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>All Users</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i class='fas fa-network-wired'></i> Social Network
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.prototype = {
  logout: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
