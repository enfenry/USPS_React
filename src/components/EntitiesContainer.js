"use strict"

import * as entityActions from '../actions/entityActions';
import { columnConfig } from '../columnConfig';
import EntitiesRender from './EntitiesRender';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const EntitiesContainer = (props) => {

    let entityColumnConfig = columnConfig[props.match.path];

    console.log(props);

    useEffect(() => {
        console.log("rerequest");
        props.actions.readEntities(entityColumnConfig.uri);
    }, [props.match.path] );

    if (!props.entitiesData) {
        return null;
    } else if (props.entitiesData.requestPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (props.entitiesData.requestFailed) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading entities!
            </div>
        );
    } else if (props.entitiesData.requestSuccess) {

        console.log(props.entitiesData.entities.value);

        return (
            <div className="m-5">
                <EntitiesRender
                    title={entityColumnConfig.title}
                    columns={entityColumnConfig.columns}
                    entities={props.entitiesData.entities.value}
                    keyGetter={entityColumnConfig.keyGetter}
                    handleSelect={x => console.log("Select", x)}
                    handleUpdate={x => console.log("Update", x)}
                    handleDelete={x => console.log("Delete", x)}
                    handleAdd={() => console.log("Add")}
                />
            </div>
        );

    } else {
        return null;
    }
}

EntitiesContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state){
    return {
        entitiesData: state.entitiesReducer.entitiesData
    }
}

function mapDispatchToProps(dispatch){
    return { 
        actions: bindActionCreators(entityActions, dispatch)
    }
}

export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(EntitiesContainer);