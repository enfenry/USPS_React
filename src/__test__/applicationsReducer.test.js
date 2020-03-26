import applicationsReducer from '../reducers/applicationsReducer';
import { READ_APPLICATIONS_SUCCESSFUL, READ_APPLICATIONS_PENDING, READ_APPLICATIONS_FAILURE } from '../constants/actionTypes';
import expect from 'expect';

describe('applications reducer', () => {

    it('should return the initial state', () => {
        expect(applicationsReducer(undefined, {
            type: "DUMMY_TYPE"
        })).toMatchSnapshot();
    });

    it('should handle READ_APPLICATIONS_PENDING', () => {
        expect(applicationsReducer({}, {
            type: READ_APPLICATIONS_PENDING
        })).toMatchSnapshot();
    });

    it('should handle READ_APPLICATIONS_FAILURE', () => {
        expect(applicationsReducer({}, {
            type: READ_APPLICATIONS_FAILURE
        })).toMatchSnapshot();
    });

    it('should handle READ_APPLICATIONS_SUCCESFUL', () => {
        expect(applicationsReducer({}, {
            type: READ_APPLICATIONS_SUCCESSFUL,
            data: {
                value: [
                    "dummy data"
                ]
            }
        })).toMatchSnapshot();
    });
});