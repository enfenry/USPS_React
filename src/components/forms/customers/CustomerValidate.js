const validate = (values) => {
    const errors = {};

    const checkRequiredField = (fieldName) => {
        const currentVal = values[fieldName];

        if (!(currentVal) || currentVal === null) {
            errors[fieldName] = 'Required';
        }
        else if (typeof currentVal === 'string') {

            if (currentVal.trim() === '') {
                errors[fieldName] = 'Cannot be empty';
            }
        }
    }

    checkRequiredField('firstname');
    checkRequiredField('lastname');

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailaddress1)) {
        errors.emailaddress1 = 'Invalid email address'
    }
    checkRequiredField('emailaddress1');


    return errors;
};

export default validate;