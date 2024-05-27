import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CustomValidators {
  static PasswordMatchValidator(source: FormGroup) {
      const control1 = source.controls['password'];
      const control2 = source.controls['confirmationPassword'];
    return  control1 && control2 && control1.value !== control2.value
        ? { 'mismatch': true }
        : null;
  }

  static WhitespaceInput(control: FormControl) {
    const isWhitespaceInput = (control.value || '').trim().length === 0;
    const isValid = !isWhitespaceInput;
    return isValid ? null : { 'whitespace': true };
  }

  static WhitespaceInputQuillEditor(control: FormControl) {
    if(control.value!=null) {
      let strippedValue = control.value.replace(/<[^>]*>/g, '');
      const isWhitespaceInput = (strippedValue || '').trim().length === 0;
      const isValid = !isWhitespaceInput;
      return isValid ? null : {'whitespace': true};
    }
    else {
      const isWhitespaceInput = (control.value || '').trim().length === 0;
      const isValid = !isWhitespaceInput;
      return isValid ? null : {'whitespace': true};
    }
  }

  static SummaryLengthValidator(control: FormControl): { [s: string]: boolean } | null {
    if (control.value && control.value.trim().length > 200) {
      return { 'maxlengthExceeded': true };
    }
    return null;
  }

  static dateValidator(control: AbstractControl){
    const start = control.get('startDateTime');
    const end = control.get('endDateTime');
    if (start.value !== null && end.value !== null) {
      if(start.value < Date.now()) {
        return {pastDate: true}
      }
      if(start.value > end.value){
        return {dateInvalid: true};
      }
    }
    else if(start.value !== null && end.value == null){
      return {missingEndDate: true};
    }
    else if(start.value == null && end.value !== null){
      return {missingStartDate: true}
    }
    return null;
  }
}

export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control.parent.errors?.['mismatch'] || control.errors?.['required']) && control.touched;
  }
}

export class ConfirmValidDateMatcherCalendarEvent implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control.parent.errors?.dateInvalid && control.touched) ||
      (control.touched && control.errors?.required) ||
      control.parent.errors?.missingStartDate ||
      (control.touched && control.parent.errors?.pastDate);
  }
}

export class MissingDateMatcherCalendarEvent implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return (control.touched &&
      (control.errors?.required || control.parent.errors?.missingEndDate)) ||
      control.parent.errors?.missingEndDate;
  }
}


