import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field }  from 'redux-form';
import { setPropsAsInitial } from '../helpers/setPropsAsInitial';
import CustomersActions from './CustomersActions';
import { Prompt } from 'react-router-dom';
import { CUSTOMER_EDIT } from '../constants/permissions';
import { accessControl } from '../helpers/accessControl';


const isNumber = value => (
    isNaN(Number(value)) && "This field must be a number"
);

const validate = values => {
    const error = {};

    if(!values.name) {
        error.name = "The field Name is required"
    }

    if(!values.dni) {
        error.dni = "The field ID is required"
    }

    return error;
};


const toNumber = value => value && Number(value);
const toUpper = value => value && value.toUpperCase();
const toLower = value => value && value.toLowerCase();
const onlyGrow = (value, previousValue, values) =>
    value && (!previousValue ? value : (value > previousValue ? value : previousValue));

class CustomerEdit extends Component {

    componentDidMount() {
        if(this.txt) {
            this.txt.focus();
        }
    }
    

    renderField = ({ input, meta, type, label, name, withFocus }) => (
        <div>
            <label htmlFor={name}>{label}</label>
            <input {...input} type={!type ? "text" : type}
                ref={ withFocus && (txt => this.txt = txt) }/>
            {
                meta.touched && meta.error && <span>{meta.error}</span>
            }
        </div>
    );

    render() {
        const { handleSubmit, submitting, onBack, pristine, submitSucceeded } = this.props;
        return (
            <div>
                <h2>Customer Editing</h2>
                <form onSubmit={handleSubmit}>
                    <Field 
                        withFocus
                        name="name" 
                        component={this.renderField}
                        label="Name"
                        parse={toUpper}
                        format={toLower}></Field>
                    <Field 
                        name="dni" 
                        component={this.renderField}
                        label="ID"></Field>
                    <Field name="age"
                        component={this.renderField} 
                        type="number"
                        validate={isNumber}
                        label="Age"
                        parse={toNumber}
                        normalize={onlyGrow}></Field>
                    <CustomersActions>
                        <button type="submit" disabled={pristine || submitting}>Accept</button>
                        <button type="button" disabled={submitting} onClick={onBack}>Cancel</button>
                    </CustomersActions>
                    <Prompt
                        when={!pristine && !submitSucceeded }
                        message="Data will be lost if you continue"
                    ></Prompt>
                </form>
            </div>
        );
    };
}

CustomerEdit.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired,
};

const CustomerEditForm = reduxForm(
    { 
        form: 'CustomerEdit',
        validate
    })(CustomerEdit);

export default accessControl([CUSTOMER_EDIT])(setPropsAsInitial(CustomerEditForm));