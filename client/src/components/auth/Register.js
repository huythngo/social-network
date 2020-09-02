import React, { Fragment, useState } from 'react';

import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password === password2) {
      register({ name, email, password });
    } else {
      setAlert('Passwords do not match', 'danger');
    }
  };
  // redirect if login
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form
        className='form'
        action='create-profile.html'
        onSubmit={(e) => {
          onSubmit(e);
        }}
      >
        <div className='form-group'>
          <input
            required
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
        <div className='form-group'>
          <input
            required
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            required
            type='password'
            placeholder='Password'
            name='password'
            minLength='6'
            value={password}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
        <div className='form-group'>
          <input
            required
            type='password'
            placeholder='Confirm Password'
            name='password2'
            minLength='6'
            value={password2}
            onChange={(e) => {
              onChange(e);
            }}
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/Login'>Sign In</Link>
      </p>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
Register.propTypes = {
  setAlert: propTypes.func.isRequired,
  register: propTypes.func.isRequired,
  isAuthenticated: propTypes.bool,
};

export default connect(mapStateToProps, { setAlert, register })(Register);
