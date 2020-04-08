import {checkRequiredField} from '../formUtils';

const validate = (values) => {
    const errors = {};

    checkRequiredField('firstname',values,errors);
    checkRequiredField('lastname',values,errors);

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailaddress1)) {
        errors.emailaddress1 = 'Invalid email address'
    }
    checkRequiredField('emailaddress1',values,errors);

    return errors;
};

export default validate;