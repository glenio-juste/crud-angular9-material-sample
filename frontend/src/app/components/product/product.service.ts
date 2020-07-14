import { map, catchError } from 'rxjs/operators';
import { Product } from './product.model';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';

@Injectable({   // @Injectable -> pode ser injetada em outras classes
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) { }

  /*   // Antes da preparação de msg de erro
    showMessage(msg: string): void {
      this.snackBar.open(msg, 'X', { // esse 'X' é pra fechar a msg manualmente no 'x'
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
        panelClass: ['msg-success']
      })
    } */

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', { // esse 'X' é pra fechar a msg manualmente no 'x'
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      // se for msg de erro, vai mostrar msg de erro senão, vai mostrar msg de sucesso
      // por causa de isError ser falso de padrão, vai continuar mandando a msg de sucesso
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  /*   // Como era antes do Observable
    create(product: Product){
      return this.http.post(this.baseUrl, product) // no post, o 1º parâmetro é a url e o 2º parâmetro é o parâmetro do método create (product)
    } */


  /*   // como era antes da mensagem de erro  
    // Passa o observable com o tipo (Product) e aí tem que passar no post também
    create(product: Product): Observable<Product> {
      return this.http.post<Product>(this.baseUrl, product); // no post, o 1º parâmetro é a url e o 2º parâmetro é o parâmetro do método create (product)
    } */


  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }


  // Observable vai ler um array de produtos
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  readById(id: number): Observable<Product> {
    // concatenando o id com a baseUrl 
    const url = `${this.baseUrl}/${id}`;
    // Depois de concatenar, colocando no retorno da função passando a url
    return this.http.get<Product>(url);
  }

  update(product: Product): Observable<Product> {
    // concatenando o product com a baseUrl 
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product);
  }

  // Os métodos delete e buscar por id são iguais execto que um é get e o outro é delete
  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url);
  }

  
  errorHandler(e: any): Observable<any> {
    console.log(e)
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }

}
