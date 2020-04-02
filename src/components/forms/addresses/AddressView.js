import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const AddressView = props => {
    const { handleHide, initialValues } = props;

    return (
        <div>
            <div>
                <div>
                    <span>Name: </span>
                    <p>{initialValues.ss_name}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Line 1: </span>
                    <p>{initialValues.ss_line1}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Line 2: </span>
                    <p>{initialValues.ss_line2 || 'None'}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Line 3: </span>
                    <p>{initialValues.ss_line3 || 'None'}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>City: </span>
                    <p>{initialValues.ss_city}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>State: </span>
                    <p>{initialValues.ss_state}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Country: </span>
                    <p>{initialValues.ss_country}</p>
                </div>
            </div>
            <div>
                <div>
                    <span>Postal Code: </span>
                    <p>{initialValues.ss_postalcode}</p>
                </div>
            </div>
            <div className="control">
                <Button color="secondary" onClick={handleHide}>Cancel</Button>
            </div>
        </div>
    )
}

AddressView.propTypes = {
    handleHide: PropTypes.func,
    name: PropTypes.string,
    initialValues: PropTypes.object,
    appTypeValue: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AddressView;