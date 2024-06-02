import {FormControl, FormGroup} from "@angular/forms";

export interface DemoForm {
  petType: FormControl<string>,
  cat?: FormGroup
}
