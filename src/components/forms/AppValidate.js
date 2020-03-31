import { PACKAGE_SUBMISSION } from '../../constants/applicationTypes';

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
  
    const isPackageSubmission = (parseInt(values.ss_applicationtype)) === PACKAGE_SUBMISSION;
  
    checkRequiredField('ss_name');
    checkRequiredField('ss_applicationtype');
    checkRequiredField('_ss_product_value');
    if (isPackageSubmission) {
      checkRequiredField('_ss_shippingspeed_value');
    }
    checkRequiredField('_ss_customer_value');
    checkRequiredField('_ss_destinationaddress_value');
  
    return errors;
  };

export default validate;