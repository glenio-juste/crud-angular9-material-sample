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

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', { 
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",      
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }
  
  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError(e => this.errorHandler(e))
    )
  }
  
  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  readById(id: number): Observable<Product> {    
    const url = `${this.baseUrl}/${id}`;   
    return this.http.get<Product>(url);
  }

  update(product: Product): Observable<Product> {    
    const url = `${this.baseUrl}/${product.id}`
    return this.http.put<Product>(url, product);
  }
  
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
