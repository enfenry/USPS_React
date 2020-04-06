import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const OrderView = props => {
<<<<<<< HEAD
    const { handleHide, name, initialValues, applications, customers, addresses, products } = props;

    const displayById = (array, key, value, display) => {
        let filtered = array.filter(el => el[key] === value);
        return filtered.length ? filtered[0][display] : 'None';
    }
=======
    const { handleHide, initialValues } = props;
>>>>>>> 314cfa47f4e3219edd290f0a31748ab1c7a5bd9b

    return (
        <div>
            <div>
                <div>
<<<<<<< HEAD
                    <span>Name: </span>
                    <p>{name}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Associated Application: </span>
                    <p>{displayById(applications, "ss_applicationid", initialValues.ss_application, "ss_name")}</p>
=======
                    <span>Order Name: </span>
                    <p>{initialValues.name}</p>
>>>>>>> 314cfa47f4e3219edd290f0a31748ab1c7a5bd9b
                </div>
            </div>
            <div>
                <div>
<<<<<<< HEAD
                    <span>Customer: </span>
                    <p>{displayById(customers, "contactid", initialValues._ss_customer_value, "fullname")}</p>
=======
                    <span>Application Name: </span>
                    <p>{initialValues.ss_application}</p>
>>>>>>> 314cfa47f4e3219edd290f0a31748ab1c7a5bd9b
                </div>
            </div>
            <div>
                <div>
<<<<<<< HEAD
                    <span>Destination Address: </span>
                    <p>{displayById(addresses, "ss_customaddressid", initialValues._ss_destinationaddress_value, "ss_name")}</p>
                </div>
            </div>

=======
                    <span>Order number: </span>
                    <p>{initialValues.orderNumber || 'None'}</p>
                </div>
            </div>
>>>>>>> 314cfa47f4e3219edd290f0a31748ab1c7a5bd9b
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
<<<<<<< HEAD
    applications: PropTypes.arrayOf(PropTypes.object),
    customers: PropTypes.arrayOf(PropTypes.object),
    addresses: PropTypes.arrayOf(PropTypes.object),
    products: PropTypes.arrayOf(PropTypes.object),
=======
>>>>>>> 314cfa47f4e3219edd290f0a31748ab1c7a5bd9b
    appTypeValue: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

<<<<<<< HEAD
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
=======
export default connect()(OrderView);
>>>>>>> 314cfa47f4e3219edd290f0a31748ab1c7a5bd9b
