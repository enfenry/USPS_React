"use strict"

import * as addressesActions from '../actions/addressesActions';
import AddressesRender from './AddressesRender';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const AddressesContainer = (props) => {

    if (props.addressesReadPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (props.addressesReadFailed) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading customers!
            </div>
        );
    } else if (props.addressesReadSuccess) {
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
        addressesReadPending: state.addressesReducer.addressesReadPending,
        addressesReadFailed: state.addressesReducer.addressesReadFailed,
        addressesReadSuccess: state.addressesReducer.addressesReadSuccess,

        addressesCreateFailed: state.addressesReducer.addressesCreateFailed,
        addressesCreateSuccess: state.addressesReducer.addressesCreateSuccess,

        addressesUpdateFailed: state.addressesReducer.addressesUpdateFailed,
        addressesUpdateSuccess: state.addressesReducer.addressesUpdateduccess,

        addressesDeleteFailed: state.addressesReducer.addressesDeleteFailed,
        addressesDeleteSuccess: state.addressesReducer.addressesDeleteSuccess,
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