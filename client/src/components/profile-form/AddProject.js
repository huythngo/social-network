import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { addProject } from '../../actions/profile';

const AddProject = ({ addProject, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const { name, description } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      {' '}
      <h1 class='large text-primary'>Add A Project</h1>
      <p class='lead'>
        <i class='fas fa-code-branch'></i> Add any projects you have built
      </p>
      <small>* = required field</small>
      <form
        class='form'
        onSubmit={(e) => {
          e.preventDefault();
          addProject(formData, history);
        }}
      >
        <div class='form-group'>
          <input
            type='text'
            placeholder='* Project Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>

        <div class='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Project Description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' class='btn btn-primary my-1' />
        <Link class='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
};

export default connect(null, { addProject })(withRouter(AddProject));
