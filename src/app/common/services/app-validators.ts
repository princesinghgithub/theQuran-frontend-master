import { AbstractControl } from '@angular/forms';
//export var emailRegexp = /^[a-z0-9_.-]+\.?[a-z0-9_-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?[.][a-z]{2,61}(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/;
//export var emailRegexp = /^[a-z_A-Z\-0-9\.\*\#\$\!\~\%\^\&\-\+\?\|]+@+[a-zA-Z\-0-9]+(.com)$/;
export var emailRegexp =
  /[a-z_A-Z\0-9._%+-]+@[a-z_A-Z\0-9.-]+\.[a-z_A-Z]{1,8}$/;
export var passwordRegexp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])(?=.*[$@$!%_*#?&])[A-Za-z\d$@$!%_*#?&]{8,20}$/;
//export var nameRegexp = /^[A-Za-z]{1,100}$/;
export var nameRegexp = /^[A-Za-z\s.]{2,50}$/;

export function emailValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
  return null;
}

export function passwordValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  if (control.value && !passwordRegexp.test(control.value)) {
    return { invalidPassword: true };
  }
  return null;
}

export function name(control: AbstractControl): { [key: string]: any } | null {
  if (control.value && !nameRegexp.test(control.value)) {
    return { invalidName: true };
  }
  return null;
}

export function matchingPasswords(
  passwordKey: string,
  passwordConfirmationKey: string
) {
  return (control: AbstractControl) => {
    const input = control.get(passwordKey);
    const matchingInput = control.get(passwordConfirmationKey);
    if (input === null || matchingInput === null) {
      return null;
    }
    if (matchingInput?.errors && !matchingInput.errors.confirmedValidator) {
      return null;
    }
    if (input.value !== matchingInput.value) {
      matchingInput.setErrors({ confirmedValidator: true });
      return { confirmedValidator: true };
    } else {
      matchingInput.setErrors(null);
      return null;
    }
  };
}
