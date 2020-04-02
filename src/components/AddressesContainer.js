"use strict"

import * as addressesActions from '../actions/addressesActions';
import AddressesRender from './AddressesRender';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const AddressesContainer = (props) => {

    if (props.addressesRequestPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (props.addressesRequestFailed) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading customers!
            </div>
        );
    } else if (props.addressesRequestSuccess) {
        return (
            <div className="reactive-margin">
                <AddressesRender
                    addresses={props.addresses}
                    handleUpdate={(values, address) => {
                        props.actions.updateAddress(values, address.ss_customaddressid)
                    }}
                    handleDelete={address => {
                        props.actions.deleteAddress(address.ss_customaddressid)
                    }}
                    handleCreate={(values) => {
                        props.actions.createAddress(values)
                    }}
                />
            </div>
        );
    } else {
        return null;
    }
}

AddressesContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    return {
        addresses: state.addressesReducer.addresses,
        addressesRequestPending: state.addressesReducer.addressesRequestPending,
        addressesRequestFailed: state.addressesReducer.addressesRequestFailed,
        addressesRequestSuccess: state.addressesReducer.addressesRequestSuccess


    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(addressesActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddressesContainer);