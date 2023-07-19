import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  errors: Array<any> | null = []

  signinForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])')),
      Validators.minLength(8),
    ])
  })

  get username() { return this.signinForm.get('username'); }
  get password() { return this.signinForm.get('password'); }

  constructor(
    private userService: UserService, private router: Router) {

  }


  async ngOnInit() {
    this.userService.getCurrentUser().subscribe((data) => {
      if (data.currentUser) {
        this.router.navigate(['/'])
      }
    })
    console.log("Hello from signin")
  }

  onSignin(data: any) {
    if (this.username?.errors == null && this.password?.errors == null) {
      this.userService.signin(data).subscribe((data) => {
        console.log(data)
        if (data) {
          this.router.navigateByUrl("/")
        }
      }, (error) => {
        this.errors = null
        this.errors = error.error.errors;
        console.log(error.error.errors)
      })
    }

  }
}
