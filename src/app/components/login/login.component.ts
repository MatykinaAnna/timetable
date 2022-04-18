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
export class loginComponent implements OnInit {

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

    if (this.authService.isLoggetInAdmin()){
      this.router.navigate(['admin'])
    }
  }

  submitlogin(){
    // this.authService.login(this.loginForm.value).subscribe({
    //   next: ()=> this.router.navigate(['admin']),
    //   error:((err)=> alert(err.message))
    // })

    this.authService.login().subscribe((d)=>{
      console.log('login', d)
      let status: string = ''
      let id: string = ''
      for (let key in d){
        if (d[key].email == this.loginForm.value.email &&
            d[key].password == this.loginForm.value.password){
              status = d[key].status
              id = d[key].id
              break
            }
      }
      if (status == 'admin'){
        this.authService.setToken(id)
        this.router.navigate(['admin'])
      } else if (status == 'user'){
        this.authService.setToken(id)
        this.router.navigate(['user'])
      } else {
        alert('Ошибка входа')
      }
      
    })
  }

}
