import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const CustomerView = props => {
    const { handleHide, initialValues } = props;

    return (
        <div>
            <div>
                <span>First Name: </span>
                <p>{initialValues.firstname}</p>
            </div>
            <div>
                <span>Last Name: </span>
                <p>{initialValues.lastname}</p>
            </div>
            <div>
                <span>Email: </span>
                <p>{initialValues.emailaddress1 || 'None'}</p>
            </div>
            <div>
                <span>Address Name: </span>
                <p>{initialValues['_ss_contactcustomaddress_value@OData.Community.Display.V1.FormattedValue']}</p>
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

export default CustomerView;