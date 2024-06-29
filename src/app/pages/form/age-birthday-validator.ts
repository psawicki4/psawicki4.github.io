import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import dayjs from "dayjs";

export function ageBirthdayValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {

    const age: number = form.get("age")?.value;
    const birthday: Date = form.get("birthday")?.value;

    if (age && birthday) {
      const isAgeValid = dayjs().diff(birthday, 'year') === age;

      return isAgeValid ? null : {invalidAge: true};
    }

    return null;
  }
}
