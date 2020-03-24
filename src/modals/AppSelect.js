import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types'

const AppSelect = props => {
    return (
        <div>
            <div>
                <p>
                    <span>Name: </span>
                    <div>{props.name}</div>
                </p>

            </div>
            <div>
                <p>
                    <span>Application Type: </span>
                    <div>{props.data.appTypeLabel}</div>
                </p>
            </div>
            <div>
                <p>
                    <span>Product: </span>
                    <div>{props.data._ss_product_value}</div>
                </p>
            </div>
            <div>
                <p>
                    <span>Shipping Speed: </span>
                    <div>{props.data._ss_shippingspeed_value}</div>
                </p>
            </div>
            <div>
                <p>
                    <span>Customer: </span>
                    <div>{props.data._ss_customer_value}</div>
                </p>
            </div>
            <div>
                <p>
                    <span>Destination Address: </span>
                    <div>{props.data._ss_destinationaddress_value}</div>
                </p>
            </div>

            <div className="control">
                <Button color="secondary" onClick={props.handleHide}>Cancel</Button>
            </div>
        </div>
    )
}


AppSelect.propTypes = {
    handleHide: PropTypes.func,
    name: PropTypes.string,
    data: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AppSelect;

