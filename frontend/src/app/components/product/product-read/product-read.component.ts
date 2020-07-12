import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {

  products: Product[]

  displayedColumns = ['id', 'name', 'price']

  // Injeção de dependências
  constructor(private productService: ProductService) { }

  // ngOnInit -> quando o componente é inicializado
  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products;
      console.log(products);
      
    })
  }

}
