import customersReducer from '../reducers/customersReducer';
import { READ_CUSTOMERS_SUCCESFUL, READ_CUSTOMERS_PENDING, READ_CUSTOMERS_FAILURE } from '../constants/actionTypes';
import expect from 'expect';

describe('customers reducer', () => {

    it('should return the initial state', () => {
        expect(customersReducer(undefined, {
            type: "DUMMY_TYPE"
        })).toMatchSnapshot();
    });

    it('should handle READ_CUSTOMERS_PENDING', () => {
        expect(customersReducer({}, {
            type: READ_CUSTOMERS_PENDING
        })).toMatchSnapshot();
    });

    it('should handle READ_CUSTOMERS_FAILURE', () => {
        expect(customersReducer({}, {
            type: READ_CUSTOMERS_FAILURE
        })).toMatchSnapshot();
    });

    it('should handle READ_CUSTOMERS_SUCCESFUL', () => {
        expect(customersReducer({}, {
            type: READ_CUSTOMERS_SUCCESFUL,
            data: {
                value: [
                    "dummy data"
                ]
            }
        })).toMatchSnapshot();
    });
});