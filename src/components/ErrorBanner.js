"use strict"

import React, { useState } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ErrorBanner = (props) => {

    const [hidden, setHidden] = useState(true);

    return (
        hidden ?
            <div className="alert alert-danger" role="alert">
                <Button close onClick={() => setHidden(false)} />
                <div onClick={(event) => event.stopPropagation()}>
                    {props.children}
                </div >
            </div >
            : ''
    );
}

ErrorBanner.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default ErrorBanner;

