import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from '../../services/auth.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
        ])
    });

    if (this.authService.idLoggetIn()){
      this.router.navigate(['admin'])
    }
  }

  submitLogin(){
    // this.authService.login(this.loginForm.value).subscribe({
    //   next: ()=> this.router.navigate(['admin']),
    //   error:((err)=> alert(err.message))
    // })

    this.authService.login().subscribe((d)=>{
      if (this.loginForm.value.email==d.email &&
          this.loginForm.value.password==d.password){
            this.authService.setToken('ycjfcjty6768fvgvhgrd6')
            this.router.navigate(['admin'])
          } else {
            alert('Ошибка входа')
          }
    })

    // this.authService.login(this.loginForm.value).subscribe(date=>{
    //   console.log(date)
    // })
  }

}
