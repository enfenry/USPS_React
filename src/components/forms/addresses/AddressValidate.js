import {checkRequiredField} from '../formUtils';

const validate = (values) => {
    const errors = {};

    checkRequiredField('ss_name',values,errors);
    return errors;
};

export default validate;

