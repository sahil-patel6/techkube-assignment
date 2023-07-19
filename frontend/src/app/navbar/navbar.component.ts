import { Component, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

type CurrentUser = {
  id: string;
  username: string;
} | null

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Input() currentUser: CurrentUser = null

  currentPath = ""

  constructor(public userService: UserService, public router: Router) {
  }
  ngOnInit() {
    this.currentPath = this.router.url;
    console.log(this.router.url);
  }
  logout() {

    this.userService.signout().subscribe((data) => {
      console.log(data)
      this.router.navigateByUrl("/signin")
    })

  }

}
