import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pw-form-demo',
  templateUrl: './form-demo.component.html',
  styleUrls: ['./form-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormDemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
