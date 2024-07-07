import {FormControl, FormGroup} from "@angular/forms";

export type DemoForm = {
  petType: FormControl<string>,
  cat?: FormGroup
}
