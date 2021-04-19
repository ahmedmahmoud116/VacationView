import { Injectable, Inject} from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Vacation } from '../Models/vacation';
import { Vacationview } from '../Models/vacationview';

@Injectable({
  providedIn: 'root'
})
export class ValidatorServiceService {
  static vacationType: Vacation = null;
  static vacationView: Vacationview = null;
  static editID: number = 0;
  static editValue: number;
  // constructor(@Inject('vacationType') vacationType: Vacation){
  //   ValidatorServiceService.vacationType = vacationType;
  // }

  static getValidatorErrorMessage(validatorName: string,
                                  vacationtype?: Vacation,
                                  vacationview?: Vacationview,
                                  editid?: number,
                                  editvalue?: number,
                                  validatorValue?: any) {
    if(vacationtype == null) vacationtype = new Vacation();
    if(vacationview == null) vacationview = new Vacationview();
    let config = {
      required: 'Required',
      invalidbalance: `Balance must be lower than ${vacationtype.balance}`,
      invaliddays: `days must be lower than ${+vacationview.balance - +vacationview.used + +1}`,
      invalideditdays:`days must be lower than ${+vacationview.balance - (+vacationview.used - +editvalue) + +1}`,
      invalidEmailAddress: 'Invalid email address',
      invalidNumber:'Invalid Number',
      minlength: `Minimum length ${validatorValue.requiredLength}`
    };
    ValidatorServiceService.vacationType = vacationtype;
    ValidatorServiceService.vacationView = vacationview;
    if(editid != null)
      ValidatorServiceService.editID = editid;
    ValidatorServiceService.editValue = editvalue;
    return config[validatorName];
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return { invalidEmailAddress: true };
    }
  }

  static positiveValidator(control) {
    // RFC 2822 compliant regex
    if (
      String(control.value).match(/^[1-9]+[0-9]*$/)
    ) {
      return null;
    } else {
      return { invalidNumber: true };
    }
  }

  static vacatationbalance(control) {
    if(ValidatorServiceService.vacationType !== null && control.value !== ''){
      // console.log("service: " + )
      if (
        control.value <= ValidatorServiceService.vacationType.balance
      ) {
        return null;
      } else {
        return { invalidbalance: true };
      }
    }
    else
      return null;
  }

  static vacatationdays(control) {
    let currval = ValidatorServiceService.editValue;
    if(ValidatorServiceService.vacationView !== null && control.value !== ''){
      if(ValidatorServiceService.editID == 0){
        console.log(+ValidatorServiceService.vacationView.balance - +ValidatorServiceService.vacationView.used);
        if (
          control.value <= (+ValidatorServiceService.vacationView.balance - +ValidatorServiceService.vacationView.used)
        ) {
          return null;
        } else {
          return { invaliddays: true };
        }
      }
      else{
        if (
          control.value <= (+ValidatorServiceService.vacationView.balance - (+ValidatorServiceService.vacationView.used - +currval))
        ) {
          return null;
        } else {
          return { invalideditdays: true };
        }

      }
    }
    else
      return null;
  }

  static isNumber(c: FormControl): ValidationErrors {
    const numValue = Number(c.value);
    // const currentYear = new Date().getFullYear();
    // const minYear = currentYear - 85;
    // const maxYear = currentYear - 18;
    const isValid = !isNaN(numValue);
    const message = {
      'Balance': {
        'message': 'The balance must be a number'
      }
    };
    return isValid ? null : message;
  }

  static countryCity(form: FormGroup): ValidationErrors {
    const countryControl = form.get('location.country');
    const cityControl = form.get('location.city');

    if (countryControl != null && cityControl != null) {
      const country = countryControl.value;
      const city = cityControl.value;
      let error = null;

      if (country === 'France' && city !== 'Paris') {
        error = 'If the country is France, the city must be Paris';
      }

      const message = {
        'countryCity': {
          'message': error
        }
      };

      return error ? message : null;
    }
  }

  static uniqueName(c: FormControl): Promise<ValidationErrors> {
    const message = {
      'uniqueName': {
        'message': 'The name is not unique'
      }
    };

    return new Promise(resolve => {
      setTimeout(() => {
        console.log(c.value);
        resolve(c.value === 'Ahmed Mahmoud' ? message : null);
      }, 1000);
    });
  }

  static telephoneNumber(c: FormControl): ValidationErrors {
    const isValidPhoneNumber = /^\d{3,3}-\d{3,3}-\d{3,3}$/.test(c.value);
    const message = {
      'telephoneNumber': {
        'message': 'The phone number must be valid (XXX-XXX-XXX, where X is a digit)'
      }
    };
    return isValidPhoneNumber ? null : message;
  }

  static telephoneNumbers(form: FormGroup): ValidationErrors {

    const message = {
      'telephoneNumbers': {
        'message': 'At least one telephone number must be entered'
      }
    };

    const phoneNumbers = <FormArray>form.get('phoneNumbers');
    const hasPhoneNumbers = phoneNumbers && Object.keys(phoneNumbers.controls).length > 0;

    return hasPhoneNumbers ? null : message;
  }
}
