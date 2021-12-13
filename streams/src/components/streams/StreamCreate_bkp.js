import React from 'react';
import {Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';


class StreamCreate extends React.Component {
	// renderInput(formProps){
	// 	return(
	// 		<input {...formProps.input}/>
	// 	);
	// }
	renderError(meta){
		if (meta.touched && meta.error){
			return (
				<div className='ui error message'>
					<div className='header'>
						{meta.error}
					</div>
				</div>
			);
		}
	}

		// Inside the render method this value is null
		// so inorder to make the value of this visible 
		// we change renderInput(){}function as a arrow 
		// function renderInput=()=>{}
	renderInput= ({input, label, meta})=>{
		const className= `field ${ meta.error && meta.touched ? 'error' : ' '}`
		return(
			<div className={className}>
				<label>{label}</label>
				<input {...input}/>
				{this.renderError(meta)}
			</div>

		);
	}

	onSubmit = (formValues) => {
    this.props.createStream(formValues);
  };

	render()
	{
		return(
			<form className='ui form error' onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<Field name='title' component={this.renderInput} label='Enter Title'/>
				<Field name='description' component={this.renderInput} label='Enter Description'/>
				<button className='ui button primary'>Submit</button>
			</form>
		);
	}
}

const validate = (formValues) => {
	const errors = {};
	if(!formValues.title){
		errors.title= ' Title is required'
	}
	if(!formValues.description){
		errors.description = 'Description is required'
	}
	return errors;
}

// Solution 1
// // export default connect()(reduxForm({
// 	form: 'streamCreate',
// 	validate
// })(StreamCreate));

const formWrapped = reduxForm({
	form: 'streamCreate',
	validate
})(StreamCreate);

export default connect(null, {createStream})(formWrapped);
