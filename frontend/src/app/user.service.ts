import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface UserInput {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getCurrentUser(): Observable<any> {
    return this.http.get("http://localhost:3000/api/users/currentUser", { withCredentials: true })
  }
  public signup(data: UserInput): Observable<any> {
    return this.http.post("http://localhost:3000/api/users/signup", data, { withCredentials: true });
  }

  public signin(data: UserInput): Observable<any> {
    return this.http.post("http://localhost:3000/api/users/signin", data, { withCredentials: true });
  }

  public signout(): Observable<any> {
    return this.http.get("http://localhost:3000/api/users/signout", { withCredentials: true })
  }
}
