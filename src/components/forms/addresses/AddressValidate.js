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

    checkRequiredField('ss_name');

    
};

export default validate;

