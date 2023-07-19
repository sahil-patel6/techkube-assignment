import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { DataService } from '../data.service';


interface Product {
  id: number;
  title: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: Product[] = [];
  currentUser = null

  isLoading: boolean = false;
  constructor(public userService: UserService, public dataService: DataService, public router: Router) {

  }
  
  async ngOnInit() {
    this.isLoading = true
    this.userService.getCurrentUser().subscribe((user) => {
      console.log(user);
      this.currentUser = user.currentUser;
      if (user.currentUser == null) {
        this.isLoading = false
      } else {
        this.dataService.getData().subscribe((data : Product[]) => {
          this.isLoading = false
          this.products = data;
          console.log(data)
        })
      }
    })
  }
}
