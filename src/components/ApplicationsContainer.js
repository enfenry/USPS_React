"use strict"

import { adalApiFetch } from '../adalConfig.js';
import axios from 'axios';
import EntitiesRender from './EntitiesRender';
import React from 'react';

//this component cna be copy-pasted for any entity.
//just change the name (line 11) uri (line 20) and columns (line 57). also, add your new component to the header and router.

class ApplicationsContainer extends React.Component {

    constructor() {
        super();
        this.state = { requestPending: false, requestSuccess: false, requestFailed: false, data: null, error: null };
    }

    componentDidMount() {

        let uri = "https://sstack.crm.dynamics.com/api/data/v9.1/ss_applications";
        let config = {
            method: 'get',
            'OData-MaxVersion': 4.0,
            'OData-Version': 4.0,
            Accept: 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        };

        this.setState({ requestPending: true, requestSuccess: false, requestFailed: false, data: null, error: null });
        adalApiFetch(axios, uri, config)
            .then(res => {
                this.setState({ requestPending: false, requestSuccess: true, requestFailed: false, data: res.data, error: null });
            })
            .catch((error) => {
                this.setState({ requestPending: false, requestSuccess: false, requestFailed: true, data: null, error });
            });
    }

    render() {

        if (this.state.requestPending) {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        } else if (this.state.requestFailed) {
            return (
                <div className="alert alert-danger" role="alert">
                    Error while loading entities!
                </div>
            );
        } else if (this.state.requestSuccess) {

            let columns = [
                {
                    displayName: "Name",
                    formatter: x => x.ss_name
                },
                {
                    displayName: "ID",
                    formatter: x => x.ss_applicationid
                },
                {
                    displayName: "Type",
                    formatter: x => {
                        switch (x.ss_applicationtype) {
                            case 717800000:
                                return "Address Change";
                            case 717800001:
                                return "Mail Forwarding";
                            case 717800002:
                                return "Package Submission";
                            default:
                                return x.ss_applicationtype;
                        }
                    }
                },
                {
                    displayName: "Created On",
                    formatter: x => x.createdon
                }
            ];

            return (
                <div className="m-5">
                    <EntitiesRender
                        title="Applications"
                        columns={columns}
                        entities={this.state.data.value}
                        keyGetter={x => x.name}
                        handleSelect={x => console.log("Select", x)}
                        handleUpdate={x => console.log("Update", x)}
                        handleDelete={x => console.log("Delete", x)}
                        handleAdd={() => console.log("Add")}
                    />
                </div>
            );

        } else {
            return (
                <div className="alert alert-danger" role="alert">
                    Internal error
                </div>
            );
        }
    }
}

export default ApplicationsContainer;