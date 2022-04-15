import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public settingForm: FormGroup

  constructor(
    private fb: FormBuilder,
  ) {
    this.settingForm = new FormGroup({
      min: new FormControl({value: 60, disabled: true}, Validators.required),
      rest: this.fb.array([
        this.fb.control({value: false, disabled: true})
      ]),
      colorTheme: new FormControl({value:'', disables: true}),
    })
   }

  ngOnInit(): void {
  }

}
