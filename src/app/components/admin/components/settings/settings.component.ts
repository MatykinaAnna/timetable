import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public settingForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.settingForm = new FormGroup({
      min: new FormControl({value: null, disabled: true}, Validators.required),
      start: new FormControl({value: null, disabled: true}, Validators.required),
      end: new FormControl({value: null, disabled: true}, Validators.required),
      rest: new FormGroup({
        mon: new FormControl({value: null, disabled: true}, Validators.required),
        tues: new FormControl({value: null, disabled: true}, Validators.required),
        wed: new FormControl({value: null, disabled: true}, Validators.required),
        thurs: new FormControl({value: null, disabled: true}, Validators.required),
        fri: new FormControl({value: null, disabled: true}, Validators.required),
        sat: new FormControl({value: null, disabled: true}, Validators.required),
        sun: new FormControl({value: null, disabled: true}, Validators.required),
      }),
      colorTheme: new FormControl({value: null, disabled: true}),
    })
   }

  ngOnInit(): void {
    this.adminService.getSetting().subscribe(data=>{
      console.log('data', data)
      this.settingForm.setValue({
        min: data.min,
        start: data.start,
        end: data.end,
        rest: {
          mon: data.rest.mon,
          fri: data.rest.fri,
          sat: data.rest.sat,
          sun: data.rest.sun,
          thurs: data.rest.thurs,
          tues: data.rest.tues,
          wed: data.rest.wed,
        },
        colorTheme: data.colorTheme
      })
    })
  }

  save(){
    if (this.settingForm.disabled){
      this.settingForm.enable(this.settingForm.value)
    } else {
      console.log(this.settingForm.value)
      this.adminService.updateSetting(this.settingForm.value)
        .subscribe((res)=>{
          console.log('res', res)
        })
    }
  }

}
