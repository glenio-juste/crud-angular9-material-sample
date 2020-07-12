import { Product } from './product.model';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({   // @Injectable -> pode ser injetada em outras classes
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', { // esse 'X' é pra fechar a msg manualmente no 'x'
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    })
  }

  /*   // Como era antes do Observable
    create(product: Product){
      return this.http.post(this.baseUrl, product) // no post, o 1º parâmetro é a url e o 2º parâmetro é o parâmetro do método create (product)
    } */


  // Passa o observable com o tipo (Product) e aí tem que passar no post também
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product) // no post, o 1º parâmetro é a url e o 2º parâmetro é o parâmetro do método create (product)
  }

  // Observable vai ler um array de produtos
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl)
  }


}
