import React from 'react';
import PropTypes from 'prop-types';
import CustomersActions from './CustomersActions';
import { accessControl } from '../helpers/accessControl';
import { CUSTOMER_VIEW } from './../constants/permissions';

const CustomerData = ({ id, name, dni, age, onBack, isDeleteAllow, onDelete }) => {
    return (
        <div>
            <div className="customer-data">
                <h2>Customer Data</h2>
                <div><strong>Name: </strong><i>{name}</i></div>
                <div><strong>ID: </strong><i>{dni}</i></div>
                <div><strong>Age: </strong><i>{age}</i></div>
            </div>   
            <CustomersActions>
                <button onClick={onBack}>Go Back</button>
                { isDeleteAllow && <button onClick={() => onDelete(id)}>Delete</button> }
            </CustomersActions>
        </div>
    );
};

CustomerData.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    age: PropTypes.number,
    onBack: PropTypes.func.isRequired,
    isDeleteAllow: PropTypes.bool,
    onDelete: PropTypes.func,
};

export default accessControl([CUSTOMER_VIEW])(CustomerData);