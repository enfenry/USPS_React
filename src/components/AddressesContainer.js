"use strict"

import * as addressesActions from '../actions/addressesActions';
import AddressesRender from './AddressesRender';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const AddressesContainer = (props) => {

    useEffect(() => {
        const { actions } = props;
        actions.readAddresses();
     }, [] );

    console.log("addresses:", props);

    if (props.requestState.addressesReadPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (props.requestState.addressesReadFailed) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading customers!
            </div>
        );
    } else if (props.requestState.addressesReadSuccess || props.requestState.addressesCreateSuccess || props.requestState.addressesUpdateSuccess || props.requestState.addressesDeleteSuccess) {
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
                    handleRefresh={() => props.actions.readAddresses()}
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
        requestState: state.addressesReducer.requestState
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