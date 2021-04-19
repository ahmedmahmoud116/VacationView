import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Vacation } from 'src/app/Models/vacation';
import { Vacationview } from 'src/app/Models/vacationview';
import { ValidatorServiceService } from '../../Services/validator-service.service';

@Component({
  selector: 'app-control-messages',
  templateUrl: './control-messages.component.html',
  styleUrls: ['./control-messages.component.css']
})
export class ControlMessagesComponent{
  _errorMessage: string;
  @Input() control: FormControl;
  @Input() vacationType: Vacation;
  @Input() vacationView: Vacationview;
  @Input() editID: number;
  @Input() editValue: number;

  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return ValidatorServiceService.getValidatorErrorMessage(
          propertyName,
          this.vacationType,
          this.vacationView,
          this.editID,
          this.editValue,
          this.control.errors[propertyName]
        );
      }
    }
    return null;
  }

}
