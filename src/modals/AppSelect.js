import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types'

const AppSelect = props => {
    return (
        <div>
            <div>
                <div>
                    <span>Name: </span>
                    <p>{props.name}</p>
                </div>

            </div>
            <div>
                <div>
                    <span>Application Type: </span>
                    <p>{props.data.appTypeLabel}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Product: </span>
                    <p>{props.data._ss_product_value}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Shipping Speed: </span>
                    <p>{props.data._ss_shippingspeed_value}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Customer: </span>
                    <p>{props.data._ss_customer_value}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Destination Address: </span>
                    <p>{props.data._ss_destinationaddress_value}</p>
                </div>
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

