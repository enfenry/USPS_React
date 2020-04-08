import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const AppView = props => {
    const { handleHide, name, initialValues } = props;

    return (
        <div>
            <div>
                <span>Name: </span>
                <p>{name}</p>
            </div>
            <div>
                <span>Application Type: </span>
                <p>{initialValues['ss_applicationtype@OData.Community.Display.V1.FormattedValue']}</p>
            </div>
            <div>
                <span>Product: </span>
                <p>{initialValues['_ss_product_value@OData.Community.Display.V1.FormattedValue']}</p>
            </div>
            {initialValues['ss_applicationtype@OData.Community.Display.V1.FormattedValue'] === 'Package Submission' ?
                <div>
                    <span>Shipping Speed: </span>
                    <p>{initialValues['_ss_shippingspeed_value@OData.Community.Display.V1.FormattedValue']}</p>
                </div>
                : ""
            }
            <div>
                <span>Customer: </span>
                <p>{initialValues['_ss_customer_value@OData.Community.Display.V1.FormattedValue']}</p>
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

AppView.propTypes = {
    handleHide: PropTypes.func,
    name: PropTypes.string,
    initialValues: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AppView;