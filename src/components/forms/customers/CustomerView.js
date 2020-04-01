import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const CustomerView = props => {
    const { handleHide, initialValues } = props;

    return (
        <div>
            <div>
                <div>
                    <span>First Name: </span>
                    <p>{initialValues.firstname}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Last Name: </span>
                    <p>{initialValues.lastname}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Email: </span>
                    <p>{initialValues.emailaddress1 || 'None'}</p>
                </div>
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
    appTypeValue: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default CustomerView;