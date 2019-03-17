import React from 'react';
import PropTypes from 'prop-types';
import CustomerListItem from './CustomersListItem';
import { accessControl } from '../helpers/accessControl';
import { CUSTOMER_LIST } from './../constants/permissions';

const CustomerList = ({ customers, urlPath }) => {
    return (
            <div className="customers-list">
                {
                    customers.map( c =>
                        <CustomerListItem 
                            key={c.dni}
                            id={c.dni}
                            name={c.name}
                            editAction={'Edit'}
                            delAction={'Delete'}
                            urlPath={urlPath}>
                        </CustomerListItem>)
                }
            </div>
    );
};

CustomerList.propTypes = {
  customers: PropTypes.array.isRequired,
  urlPath: PropTypes.string.isRequired,  
};

export default accessControl([CUSTOMER_LIST])(CustomerList);