import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const OrderView = props => {
    const { handleHide, name, initialValues, 
        // applications, customers, addresses, products
     } = props;

    // const displayById = (array, key, value, display) => {
    //     let filtered = array.filter(el => el[key] === value);
    //     return filtered.length ? filtered[0][display] : 'None';
    // }

    return (
        <div>
            <div>
                <span>Order Number: </span>
                <p>{name}</p>
            </div>
            <div>
                <span>Parent Application: </span>
                <p>{initialValues['_ss_application_value@OData.Community.Display.V1.FormattedValue']}</p>
            </div>
            <div>
                <span>Customer: </span>
                <p>{initialValues['_customerid_value@OData.Community.Display.V1.FormattedValue']}</p>
            </div>
            <div>
                <span>Destination Address: </span>
                <p>{initialValues['_ss_destinationaddress_value@OData.Community.Display.V1.FormattedValue']}</p>
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