import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  errors: Array<any> | null = []

  signupForm = new FormGroup({
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

  get username() { return this.signupForm.get('username'); }
  get password() { return this.signupForm.get('password'); }

  constructor(
    private userService: UserService, private router: Router) {

  }


  async ngOnInit() {
    this.userService.getCurrentUser().subscribe((data) => {
      if (data.currentUser) {
        this.router.navigate(['/'])
      }
    })
    console.log("Hello from signup")
  }

  onSignup(data: any) {
    console.log(this.password?.errors)
    if (this.username?.errors == null && this.password?.errors == null) {
      this.userService.signup(data).subscribe((data) => {
        console.log(data, "DATA")
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
