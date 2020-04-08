import { PACKAGE_SUBMISSION } from '../../../constants/applicationTypes';
import {checkRequiredField} from '../formUtils';

const validate = (values) => {
    const errors = {};
  
    const isPackageSubmission = (parseInt(values.ss_applicationtype)) === PACKAGE_SUBMISSION;
  
    checkRequiredField('ss_name',values,errors);
    checkRequiredField('ss_applicationtype',values,errors);
    checkRequiredField('_ss_product_value',values,errors);
    if (isPackageSubmission) {
      checkRequiredField('_ss_shippingspeed_value',values,errors);
    }
    checkRequiredField('_ss_customer_value',values,errors);
    checkRequiredField('_ss_destinationaddress_value',values,errors);
  
    return errors;
  };

export default validate;