import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorServiceService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      required: 'Required',
      invalidCreditCard: 'Is invalid credit card number',
      invalidEmailAddress: 'Invalid email address',
      invalidNumber:'Invalid Number',
      minlength: `Minimum length ${validatorValue.requiredLength}`
    };

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
