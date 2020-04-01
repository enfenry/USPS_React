import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const OrderView = props => {
    const { handleHide, initialValues } = props;

    return (
        <div>
            <div>
                <div>
                    <span>Order Name: </span>
                    <p>{initialValues.name}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Application Name: </span>
                    <p>{initialValues.ss_application}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Order number: </span>
                    <p>{initialValues.orderNumber || 'None'}</p>
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
    appTypeValue: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default connect()(OrderView);