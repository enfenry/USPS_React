"use strict"

import React from 'react';
import EntityList from './EntityList.js';

const Applications = () => {

        let title = "Applications";

        let columns = [
            {
                name: "name", 
                displayName: "Name", 
                formatter: x => x.name
            },
            {
                name: "date", 
                displayName: "Date", 
                formatter: x => x.date
            }
        ];

        let entities = [
            {
                name: "Application 0",
                date: "10/10/1010"
            },
            {
                name: "Application 1",
                date: "11/11/1111"
            }
        ];

        let keyGetter = x => x.name;
        let handleSelect = x => console.log("Select", x);
        let handleUpdate = x => console.log("Update", x);
        let handleDelete = x => console.log("Delete", x);
        let handleAdd = () => console.log("Add");

        return(
            <div className="m-5">
                <EntityList 
                    title={title}
                    columns={columns}
                    entities={entities}
                    keyGetter={keyGetter}
                    handleSelect={handleSelect}
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                    handleAdd={handleAdd}
                />
            </div>
        );
}

export default Applications;