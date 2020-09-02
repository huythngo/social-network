import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteProject } from '../../actions/profile';

const Project = ({ project, deleteProject }) => {
  const projArr = project.map((proj) => {
    return (
      <div key={proj._id}>
        <h3 className='text-dark'>{proj.name}</h3>

        <p>
          <strong>Description:</strong>
          {proj.description}
        </p>
        <button
          onClick={() => {
            deleteProject(proj._id);
          }}
          className='btn btn-danger'
        >
          Delete
        </button>
      </div>
    );
  });
  return <Fragment>{projArr}</Fragment>;
};

Project.propTypes = {};

export default connect(null, { deleteProject })(Project);
