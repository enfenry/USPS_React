"use strict"

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as customerActions from '../actions/customerActions';
import CustomerRender from './CustomerRender';

const CustomerContainer = (props) => {

    useEffect(() => {
        const { actions } = props;
        actions.readBooks();
    }, [] );

   
    return(
        <div>
            <CustomerRender {...props} />
        </div>
    );
}

function mapStateToProps(state){
    return {
        bookData: state.bookReducer.bookData
    }
}

function mapDispatchToProps(dispatch){
    return { 
        actions: bindActionCreators(customerActions, dispatch)
    }
}

CustomerContainer.propTypes = {
    actions: PropTypes.object
};

export default connect( 
    mapStateToProps,
    mapDispatchToProps
    )(CustomerContainer);