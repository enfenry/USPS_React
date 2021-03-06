import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { displayById }  from '../formUtils';

const AppView = props => {
    const { handleHide, name, initialValues, customers, addresses, products } = props;

    return (
        <div>
            <div>
                <div>
                    <span>Name: </span>
                    <p>{name}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Application Type: </span>
                    <p>{initialValues.appTypeLabel}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Product: </span>
                    <p>{displayById(products, "productid", initialValues._ss_product_value, "name")}</p>
                </div>
            </div>
            {initialValues.appTypeLabel === 'Package Submission' ?
                <div>
                    <div>
                        <span>Shipping Speed: </span>
                        <p>{displayById(products, "productid", initialValues._ss_shippingspeed_value, "name")}</p>
                    </div>
                </div>
                : ""
            }
            <div>
                <div>
                    <span>Customer: </span>
                    <p>{displayById(customers, "contactid", initialValues._ss_customer_value, "fullname")}</p>
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

AppView.propTypes = {
    handleHide: PropTypes.func,
    name: PropTypes.string,
    initialValues: PropTypes.object,
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
        customers: state.customersReducer.customers,
        addresses: state.addressesReducer.addresses,
        products: state.productsReducer.products,
    }
}

export default connect(
    mapStateToProps
)(AppView);