import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import { formValues } from 'redux-form';


class ModalForm extends React.Component {
  constructor(props) {
    super(props);
  }

  editApplication(values) {
    console.log(this.props.application)
    console.log('current form values', values)

    let context = this;
    if (this.props.application && this.props.application.length > 0) {
      for (let key in values) {
        this.props.application[key] = values[key];
      }

      console.log(this.props.application);

      axios.post('/api/applications', {
        edited: context.props.application
      }).then(function(response) {
        console.log('saved edited application')
      })
    } else {
      console.log('current values', values)
      console.log('trying to get user id', context)

      axios.post('/api/applications', {
        newApplication: values})
        .then(function(response) {
      console.log('saved new application')
        })
      }

    // Required fields:
    // company
    // position
    // date
    // status

  }

  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.editApplication.bind(this))}>
        <div>
          <label htmlFor="firstName">Company Name</label>
          <Field name="company" component="input" type="text" placeholder={this.props.application.company} />
        </div>
        <div>
          <label htmlFor="position">Position</label>
          <Field name="position" component="input" type="text" placeholder={this.props.application.position} />
        </div>

        <div>
          <label htmlFor="date">Date Applied</label>
          <Field name="dateApplied" component="input" type="text" placeholder={this.props.application.dateApplied} />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

ModalForm = reduxForm({
  form: 'application'
})(ModalForm)


const getAllApplications = (user) => {
  return (dispatch) => {
    // dispatch a flag action to show waiting view
    dispatch({ type: 'IS_FETCHING' })

    const request = axios.get('/api/applications');

    return request.then(
      response => dispatch(fetchApplicationsSuccess(response.data.apps)))
      .then(dispatch({ type: 'IS_FETCHING'}))
      .catch(err => console.log(err));
  }
}

const mapStateToProps = (state) => {
  return {
    applications: state.applicationReducer.applications

  };
}

export default connect(mapStateToProps, {getAllApplications})(ModalForm)


