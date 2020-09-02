import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileProject = ({ project: { name, description } }) => {
  return (
    <div>
      <h3 className='text-dark'>{name}</h3>

      <p>
        <strong>Description:</strong>
        {description}
      </p>
    </div>
  );
};

ProfileProject.propTypes = {};

export default ProfileProject;
//
