import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { displayById }  from '../formUtils';

const CustomerView = props => {
    const { handleHide, initialValues, addresses } = props;

    return (
        <div>
            <div>
                <div>
                    <span>First Name: </span>
                    <p>{initialValues.firstname}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Last Name: </span>
                    <p>{initialValues.lastname}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Email: </span>
                    <p>{initialValues.emailaddress1 || 'None'}</p>
                </div>
            </div>

            <div>
                <div>
                    <span>Address Name: </span>
                    <p>{displayById(addresses, "ss_customaddressid", initialValues._ss_contactcustomaddress_value, "ss_name")}</p>
                </div>
            </div>
            <div className="control">
                <Button color="secondary" onClick={handleHide}>Cancel</Button>
            </div>
        </div>
    )
}

CustomerView.propTypes = {
    handleHide: PropTypes.func,
    name: PropTypes.string,
    initialValues: PropTypes.object,
    addresses: PropTypes.arrayOf(PropTypes.object),
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

function mapStateToProps(state) {
    return {
        addresses: state.addressesReducer.addresses
    }
}

export default connect(
    mapStateToProps
)(CustomerView);