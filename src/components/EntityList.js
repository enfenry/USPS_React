"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';

const EntityList = ({ title, columns, entities, keyGetter, handleSelect, handleUpdate, handleDelete, handleAdd}) => {

    return(
        <div>
            <h1>{title}</h1>
            <table className="table">
                <thead>
                    <tr>
                        {columns.map(column => 
                            <th key={column.displayName} scope="col">{column.displayName}</th>
                        )}
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {entities.map(entity => 
                        <tr key={keyGetter(entity)}>
                            {columns.map(column => 
                                <td key={column.displayName}>{column.formatter(entity)}</td>
                            )}
                            <td align="right">
                                <button className="btn btn-success mr-1" onClick={() => handleSelect(entity)}>Select</button>
                                <button className="btn btn-secondary mr-1" onClick={() => handleUpdate(entity)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(entity)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Button color="primary" onClick={handleAdd}>Add</Button>
        </div>
    );
}

EntityList.propTypes = {
    title: PropTypes.string,
    columns: PropTypes.array,
    entities: PropTypes.array,
    keyGetter: PropTypes.func,
    handleSelect: PropTypes.func,
    handleUpdate: PropTypes.func,
    handleDelete: PropTypes.func,
    handleAdd: PropTypes.func,
};

/*schema: {
    title: string,
    columns: [{
        displayName: string, 
        formatter: entity => string
    }],
    entities: [{}],
    keyGetter: entity => key
}*/

export default EntityList;