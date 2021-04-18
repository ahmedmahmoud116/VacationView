import { Injectable, Inject} from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Vacation } from '../Models/vacation';
@Injectable({
  providedIn: 'root'
})
export class ValidatorrequestService {
  static vacationType: Vacation = null;

  // constructor(@Inject('vacationType') vacationType: Vacation){
  //   ValidatorServiceService.vacationType = vacationType;
  // }

  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      required: 'Required',
      invaliddays: `Days must be lower than Vacation balance`,
      invalidNumber:'Invalid Number'
    };
    // ValidatorrequestService.vacationType = vacationtype;

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
      control.value.match(/^[1-9]+[0-9]*$/)
    ) {
      return null;
    } else {
      return { invalidNumber: true };
    }
  }

  static vacatationdays(control) {
    if(ValidatorrequestService.vacationType !== null && control.value !== ''){
      // console.log("service: " + )
      if (
        control.value <= ValidatorrequestService.vacationType.balance
      ) {
        return null;
      } else {
        return { invalidbalance: true };
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

}
