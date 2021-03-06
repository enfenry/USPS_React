import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { displayById }  from '../formUtils';

const OrderView = props => {
    const { handleHide, name, initialValues, applications, customers, addresses, 
        // products
     } = props;

    return (
        <div>
            <div>
                <div>
                    <span>Order Number: </span>
                    <p>{name}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Associated Application: </span>
                    <p>{displayById(applications, "ss_applicationid", initialValues._ss_application_value, "ss_name")}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Customer: </span>
                    <p>{displayById(customers, "contactid", initialValues._customerid_value, "fullname")}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Destination Address: </span>
                    <p>{displayById(addresses, "ss_customaddressid", initialValues._ss_destinationaddress_value, "ss_name")}</p>
                </div>
            </div>
            <div className="control">
                <Button color="secondary" onClick={handleHide}>Cancel</Button>
            </div>
        </div>
    )
}

OrderView.propTypes = {
    handleHide: PropTypes.func,
    name: PropTypes.string,
    initialValues: PropTypes.object,
    applications: PropTypes.arrayOf(PropTypes.object),
    customers: PropTypes.arrayOf(PropTypes.object),
    addresses: PropTypes.arrayOf(PropTypes.object),
    products: PropTypes.arrayOf(PropTypes.object),
    appTypeValue: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

function mapStateToProps(state) {
    return {
        applications: state.applicationsReducer.applications,
        customers: state.customersReducer.customers,
        addresses: state.addressesReducer.addresses,
        products: state.productsReducer.products,
    }
}

export default connect(
    mapStateToProps
)(OrderView);