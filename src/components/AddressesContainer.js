"use strict"

import * as addressesActions from '../actions/addressesActions';
import AddressesRender from './AddressesRender';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from './LoadingIcon';
import ErrorBanner from './ErrorBanner';

const AddressesContainer = (props) => {
    const { actions, addresses, requestState } = props;

    const {
        error,
        addressesCreateFailed, addressesCreateSuccess,
        addressesReadPending, addressesReadFailed, addressesReadSuccess,
        addressesUpdateFailed, addressesUpdateSuccess,
        addressesDeleteFailed, addressesDeleteSuccess,
    } = requestState;

    const renderSuccess = () => {
        return (
            <div className="reactive-margin">
                <AddressesRender
                    addresses={addresses}
                    handleUpdate={(values, address) => {
                        actions.updateAddress(values, address.ss_customaddressid)
                    }}
                    handleDelete={address => {
                        actions.deleteAddress(address.ss_customaddressid)
                    }}
                    handleCreate={(values) => {
                        actions.createAddress(values)
                    }}
                />
            </div>
        );
    }

    useEffect(() => {
        actions.readAddresses();
    }, []);

    if (addressesReadPending) {
        return <LoadingIcon />;
    } else if (addressesReadFailed) {
        return (
            <ErrorBanner>
                Error while loading addresses!
            </ErrorBanner>
        );
    } else if (addressesUpdateFailed || addressesCreateFailed) {
        return (
            <React.Fragment>
                <ErrorBanner>
                    {error.message}
                    <br />
                </ErrorBanner>
                {renderSuccess()}
            </React.Fragment>
        );
    } else if (addressesDeleteFailed) {
        return (
            <React.Fragment>
                <ErrorBanner>
                    {error.message}
                    <br />
                    Cannot delete: Record is associated with another entity record.
                </ErrorBanner>
                {renderSuccess()}
            </React.Fragment>
        );
    } else if (addressesReadSuccess || addressesCreateSuccess || addressesUpdateSuccess || addressesDeleteSuccess) {
        return renderSuccess();
    } else {
        return (
            <ErrorBanner>
                Invalid state! This message should never appear.
            </ErrorBanner>
        );
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