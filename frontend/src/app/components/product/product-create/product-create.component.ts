import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = { name: '', price: null }
  /* product: Product = { name: 'Produto de Teste', price: 125.85 } */ // Para teste na construção do formulário

  constructor(private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void { 

  }

/*   createProduct(): void {
                                          // subscribe vai ser notificado quando a resposta chegar
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado com sucesso!') // exibe a mensagem de sucesso
      this.router.navigate(['/products']) // retorna para a lista de produtos
    })

  } */

  createProduct(): void {
    this.productService.create(this.product).subscribe(() => {
      this.productService.showMessage('Produto criado!')
      this.router.navigate(['/products'])
    })

  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
