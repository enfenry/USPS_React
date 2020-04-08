import {checkRequiredField} from '../formUtils';

const validate = (values) => {
    const errors = {};
  

    checkRequiredField('_ss_destinationaddress_value',values,errors);
  
    return errors;
  };

export default validate;