"use strict"

import * as addressesActions from '../actions/addressesActions';
import AddressesRender from './AddressesRender';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from './LoadingIcon';
import ErrorBanner from './ErrorBanner';

const AddressesContainer = (props) => {
    const { actions, addresses, addressRequestState } = props;

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
     }, [] );

    if (addressRequestState.addressesReadPending) {
        return <LoadingIcon/>;
    } else if (addressRequestState.addressesReadFailed) {
        return (
            <ErrorBanner>
                Error while loading addresses!
            </ErrorBanner>
        );
    } else if (addressRequestState.addressesUpdateFailed || addressRequestState.addressesCreateFailed) {
        return (
            <React.Fragment>
                <ErrorBanner>
                    {addressRequestState.error.message}
                    <br />
                </ErrorBanner>
                {renderSuccess()}
            </React.Fragment>
        );    
    } else if (addressRequestState.addressesReadSuccess || addressRequestState.addressesCreateSuccess || addressRequestState.addressesUpdateSuccess || addressRequestState.addressesDeleteSuccess) {
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
        addressRequestState: state.addressesReducer.requestState
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