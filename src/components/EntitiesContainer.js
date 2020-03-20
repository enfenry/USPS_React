"use strict"

import * as entityActions from '../actions/entityActions';
import { columnConfig } from '../columnConfig';
import EntitiesRender from './EntitiesRender';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const EntitiesContainer = (props) => {

    let entityColumnConfig = columnConfig[props.match.path];

    console.log(props);

    if (!props.entitiesData) {
        return (
            <div className="alert alert-danger" role="alert">
                No entity data!
            </div>
        );
    }

    let specificEntitiesData = props.entitiesData[props.match.path];

    if (!specificEntitiesData) {
        return (
            <div className="alert alert-danger" role="alert">
                Entity not found!
            </div>
        );
    } else if (specificEntitiesData.requestPending) {
        return (
            <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    } else if (specificEntitiesData.requestFailed) {
        return (
            <div className="alert alert-danger" role="alert">
                Error while loading entities!
            </div>
        );
    } else if (specificEntitiesData.requestSuccess) {
        return (
            <div className="m-5">
                <EntitiesRender
                    title={entityColumnConfig.title}
                    columns={entityColumnConfig.columns}
                    entities={specificEntitiesData.entities.value}
                    keyGetter={entityColumnConfig.keyGetter}
                    handleSelect={x => console.log("Select", x)}
                    handleUpdate={x => console.log("Update", x)}
                    handleDelete={x => {
                        props.actions.deleteEntities(entityColumnConfig.uri, entityColumnConfig.keyGetter(x))
                    }}
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

function mapStateToProps(state) {
    return {
        entitiesData: state.entitiesReducer.entitiesData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(entityActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EntitiesContainer);