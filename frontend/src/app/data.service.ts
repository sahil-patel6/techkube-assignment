import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


interface Product {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3000/api/products", { withCredentials: true })
  }
}
