import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AppView = props => {
    const { handleHide, name, data, customers, addresses, products } = props;

    const displayById = (array, key, value, display) => {
        let filtered = array.filter(el => el[key] === value);
        return filtered.length ? filtered[0][display] : 'None';
    }

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
                    <p>{data.appTypeLabel}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Product: </span>
                    <p>{displayById(products, "productid", data._ss_product_value, "name")}</p>
                </div>
            </div>
            {data.appTypeLabel === 'Package Submission' ?
                <div>
                    <div>
                        <span>Shipping Speed: </span>
                        <p>{displayById(products, "productid", data._ss_shippingspeed_value, "name")}</p>
                    </div>
                </div>
                : ""
            }
            <div>
                <div>
                    <span>Customer: </span>
                    <p>{displayById(customers, "contactid", data._ss_customer_value, "fullname")}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Destination Address: </span>
                    <p>{displayById(addresses, "ss_customaddressid", data._ss_destinationaddress_value, "ss_name")}</p>
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
    data: PropTypes.object,
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