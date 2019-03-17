import React, { Component } from 'react';
import { connect } from 'react-redux';

export const accessControl = permissionsRequired => WrappedComponent => {
    const SecuredControl = class extends Component {

        
        render() {
            const { permissions } = this.props.user;
            const isAllow = permissionsRequired.every(p => permissions.indexOf(p) >= 0);
            if(!isAllow) {
                return (<div><i>You do not have access permission</i></div>)
            }
            return <WrappedComponent {...this.props} />;
        }
    }

    return connect(state => ({ user: state.user }))(SecuredControl);
}